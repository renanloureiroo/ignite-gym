import { api } from "../api";

interface ICreateUserDTO {
  name: string;
  email: string;
  password: string;
}

export const createUser = <T = any>(body: ICreateUserDTO) => {
  return api.instance.post<T>("/users", body);
};
