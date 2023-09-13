export interface IStorage {
  save(id: string, data: any): Promise<void>;
  get<T = any>(id: string): Promise<T>;
  delete(id: string): Promise<void>;
  clearAll(): Promise<void>;
}
