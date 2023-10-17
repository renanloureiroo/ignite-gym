import { UserDTO } from "@dtos/";
import { api } from "@shared/services/api/api";
import { signInWithEmailAndPassword } from "@shared/services/api/signIn";
import { storage } from "@shared/services/storage";
import { storageKeys } from "@shared/services/storage/storageConfig";
import React, {
  FC,
  ReactNode,
  createContext,
  useCallback,
  useEffect,
  useState,
} from "react";

interface AuthContextProviderProps {
  children: ReactNode;
}

type AuthContextType = {
  heydrated: boolean;
  user: UserDTO;
  signIn: (email: string, password: string) => Promise<void>;
  signOut: () => Promise<void>;
};

export const AuthContext = createContext<AuthContextType>(
  {} as AuthContextType
);

export const AuthContextProvider: FC<AuthContextProviderProps> = ({
  children,
}) => {
  const [heydrated, setHydrated] = useState<boolean>(false);
  const [user, setUser] = useState<UserDTO>({} as UserDTO);

  const signIn = useCallback(async (email: string, password: string) => {
    try {
      const { data } = await signInWithEmailAndPassword<{
        token: string;
        refresh_token: string;
        user: UserDTO;
      }>({
        email,
        password,
      });

      if (data) {
        setUser(data.user);
        await storage.save(storageKeys.USER_STORAGE, data.user);
        await api.updateAccessTokenAndRefreshToken(
          data.token,
          data.refresh_token
        );
      }
    } catch (error) {
      throw error;
    }
  }, []);

  const signOut = useCallback(async () => {
    try {
      await storage.delete(storageKeys.USER_STORAGE);
      await storage.delete(storageKeys.CREDENTIALS_STORAGE);
      api.clearAuthorizationHeader();
      setUser({} as UserDTO);
    } catch (error) {}
  }, []);

  const heydrateApplication = async () => {
    try {
      const userData = await storage.get<UserDTO>(storageKeys.USER_STORAGE);

      if (userData) {
        setUser(userData);
      }
    } catch (error) {
    } finally {
      setHydrated(true);
    }
  };
  useEffect(() => {
    heydrateApplication();
  }, []);

  return (
    <AuthContext.Provider value={{ user, signIn, signOut, heydrated }}>
      {children}
    </AuthContext.Provider>
  );
};