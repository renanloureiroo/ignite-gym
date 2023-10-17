export type HistoryDTO = {
  title: string;
  data: {
    id: number;
    user_id: number;
    group: string;
    name: string;
    created_at: string;
    hour: string;
  }[];
}[];
