import { HistoryDTO } from "app/dtos/HistoryDTO";
import { api } from "../api";

export const getHistory = <T = HistoryDTO>() => {
  return api.instance.get<T>("/history");
};
