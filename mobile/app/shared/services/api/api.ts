import { config } from "@shared/config";
import { AppError } from "@shared/utils/AppError";
import axios, { AxiosError, AxiosInstance } from "axios";
import { storage } from "../storage";
import { storageKeys } from "../storage/storageConfig";
type Credentials = { token: string; refreshToken: string };

type SignOut = () => void;

type PromiseType = {
  onSuccess: (token: string) => void;
  onFailure: (error: AxiosError) => void;
};

type ApiInstanceProps = AxiosInstance & {
  registerInterceptTokenManager: (signOut: SignOut) => () => void;
};

class Api {
  private failedQueue: Array<PromiseType> = [];
  private isRefreshing = false;
  readonly instance: ApiInstanceProps;

  constructor() {
    this.instance = axios.create({
      baseURL: config.baseURL,
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
    }) as ApiInstanceProps;

    this.instance.registerInterceptTokenManager = (signOut) => {
      const interceptTokenManager = this.instance.interceptors.response.use(
        (response) => response,
        async (requestError: AxiosError<{ message?: string }>) => {
          if (requestError?.response?.status === 401) {
            if (
              requestError.response.data?.message === "token.expired" ||
              requestError.response.data?.message === "token.invalid"
            ) {
              const { refreshToken } = await storage.get<Credentials>(
                storageKeys.CREDENTIALS_STORAGE
              );

              if (!refreshToken) {
                signOut();
                return Promise.reject(requestError);
              }

              const originalRequestConfig = requestError.config;
              if (this.isRefreshing) {
                return new Promise((resolve, reject) => {
                  this.failedQueue.push({
                    onSuccess: (token: string) => {
                      originalRequestConfig!.headers.Authorization = `Bearer ${token}`;
                      resolve(this.instance(originalRequestConfig!));
                    },
                    onFailure: (error: AxiosError) => {
                      reject(error);
                    },
                  });
                });
              }

              this.isRefreshing = true;

              return new Promise(async (resolve, reject) => {
                try {
                  const { data } = await this.instance.post<{
                    refresh_token: string;
                    token: string;
                  }>("/sessions/refresh-token", {
                    refresh_token: refreshToken,
                  });

                  await storage.save(storageKeys.CREDENTIALS_STORAGE, {
                    token: data.token,
                    refreshToken: data.refresh_token,
                  });

                  if (originalRequestConfig?.data) {
                    originalRequestConfig.data = JSON.parse(
                      originalRequestConfig.data
                    );
                  }

                  originalRequestConfig!.headers.Authorization = `Bearer ${data.token}`;
                  this.instance.defaults.headers.common[
                    "Authorization"
                  ] = `Bearer ${data.token}`;

                  this.failedQueue.forEach((request) => {
                    request.onSuccess(data.token);
                  });

                  resolve(this.instance(originalRequestConfig!));
                } catch (error) {
                  this.failedQueue.forEach((request) =>
                    request.onFailure(error as AxiosError)
                  );

                  signOut();
                  reject(error);
                } finally {
                  this.isRefreshing = false;
                  this.failedQueue = [];
                }
              });
            }

            signOut();
          }

          // Validated if handler error
          if (requestError.response && requestError.response.data) {
            return Promise.reject(
              new AppError(requestError.response.data.message as string)
            );
          }

          return Promise.reject(Promise.reject(requestError));
        }
      );

      return () => {
        this.instance.interceptors.response.eject(interceptTokenManager);
      };
    };

    storage
      .get<Credentials>(storageKeys.CREDENTIALS_STORAGE)
      .then(
        (credentials) =>
          (this.instance.defaults.headers.common[
            "Authorization"
          ] = `Bearer ${credentials?.token}`)
      );
  }

  /**
   * updateAccessTokenAndRefreshToken
   */
  public async updateAccessTokenAndRefreshToken(
    token: string,
    refreshToken: string
  ) {
    this.instance.defaults.headers.common["Authorization"] = `Bearer ${token}`;

    await storage.save(storageKeys.CREDENTIALS_STORAGE, {
      token,
      refreshToken,
    });
  }

  public clearAuthorizationHeader() {
    this.instance.defaults.headers.common["Authorization"] = undefined;
  }
}

export const api = new Api();
