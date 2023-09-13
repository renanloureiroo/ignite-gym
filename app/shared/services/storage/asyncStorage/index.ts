import AsyncStorage from "@react-native-async-storage/async-storage";
import { IStorage } from "../Storage";

export class StorageAsyncStorage implements IStorage {
  async save(id: string, data: any): Promise<void> {
    return AsyncStorage.setItem(id, JSON.stringify(data));
  }
  async get<T = any>(id: string): Promise<T> {
    return AsyncStorage.getItem(id).then((data) =>
      data ? JSON.parse(data) : null
    );
  }
  async delete(id: string): Promise<void> {
    return AsyncStorage.removeItem(id);
  }
  async clearAll(): Promise<void> {
    return AsyncStorage.clear();
  }
}
