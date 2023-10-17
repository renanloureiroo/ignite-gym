import { api } from "../api";

type Group = string;

type Groups = Array<Group>;

export const getGroups = <T = Groups>() => {
  return api.instance.get<T>("/groups");
};
