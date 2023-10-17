export type HistoryItem = {
  id: number;
  user_id: number;
  group: string;
  name: string;
  created_at: string;
  hour: string;
};

export type HistoryDTO = {
  title: string;
  data: HistoryItem[];
}[];
