import { api } from "../api";

interface IRegisterExerciseDTO {
  exercise_id: number;
}

export const postExerciseComplete = <T = any>(body: IRegisterExerciseDTO) => {
  return api.instance.post<T>("/history", body);
};
