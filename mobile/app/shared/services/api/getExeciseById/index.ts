import { ExerciseDTO } from "app/dtos/ExerciseDTO";
import { api } from "../api";

export const getExerciseById = <T = ExerciseDTO>(id: number) => {
  const url = encodeURI(`/exercises/${id}`);
  return api.instance.get<T>(url);
};
