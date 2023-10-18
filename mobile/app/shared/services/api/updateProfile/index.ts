import { UserDTO } from "@dtos/*";
import { api } from "../api";

export interface IUpdateProfileDTO {
  name: string;
  password?: string;
  old_password?: string;
}

export const updateProfile = <T = any>(body: IUpdateProfileDTO) => {
  return api.instance.put<T>("/users", body);
};
