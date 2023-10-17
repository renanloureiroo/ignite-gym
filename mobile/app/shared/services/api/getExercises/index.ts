import { ExerciseDTO } from "app/dtos/ExerciseDTO";
import { api } from "../api";

export type Exercises = ExerciseDTO[];

export const getExercises = <T = Exercises>(group: string) => {
  const url = encodeURI(`/exercises/bygroup/${group.toLowerCase()}`);
  return api.instance.get<T>(url);
};
