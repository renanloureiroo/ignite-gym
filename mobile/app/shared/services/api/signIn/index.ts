import { api } from "../api";

export interface ISignInWithEmailAndPasswordDTO {
  email: string;
  password: string;
}

export const signInWithEmailAndPassword = <T = any>(
  body: ISignInWithEmailAndPasswordDTO
) => {
  return api.instance.post<T>("/sessions", body);
};
