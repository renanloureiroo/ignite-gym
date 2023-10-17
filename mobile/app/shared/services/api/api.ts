import { config } from "@shared/config";
import { AppError } from "@shared/utils/AppError";
import axios, { AxiosInstance } from "axios";
import { storage } from "../storage";
import { storageKeys } from "../storage/storageConfig";

class Api {
  readonly instance: AxiosInstance;

  constructor() {
    this.instance = axios.create({
      baseURL: config.baseURL,
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
    });

    this.instance.interceptors.response.use(
      (response) => response,
      (error) => {
        if (error.response && error.response.data) {
          return Promise.reject(new AppError(error.response.data.message));
        }

        return Promise.reject(Promise.reject(error));
      }
    );

    storage
      .get<{ token: string; refreshToken: string }>(
        storageKeys.CREDENTIALS_STORAGE
      )
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
