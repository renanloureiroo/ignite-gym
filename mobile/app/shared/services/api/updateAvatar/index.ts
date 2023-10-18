import { UserDTO } from "@dtos/*";
import { api } from "../api";
import { AxiosProgressEvent } from "axios";

export const updateAvatar = <T = UserDTO>(body: FormData) => {
  return api.instance.patch<T>("/users/avatar", body, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
};
