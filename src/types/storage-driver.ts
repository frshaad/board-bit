export interface StorageDriver<T> {
  getAll(): Promise<T[]>;
  getById(id: string): Promise<T | undefined>;
  set(id: string, value: T): Promise<void>;
  delete(id: string): Promise<void>;
  clear(): Promise<void>;
}
