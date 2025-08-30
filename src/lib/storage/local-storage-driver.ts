import type { StorageDriver } from '@/types/storage-driver';

class LocalStorageDriver<T extends { id: string }> implements StorageDriver<T> {
  constructor(private readonly namespace: string) {}

  private read(): Record<string, T> {
    const raw = localStorage.getItem(this.namespace);
    if (!raw) return {};
    try {
      return JSON.parse(raw) as Record<string, T>;
    } catch {
      return {};
    }
  }

  private write(data: Record<string, T>): void {
    localStorage.setItem(this.namespace, JSON.stringify(data));
  }

  async getAll(): Promise<T[]> {
    const items = this.read();
    return Object.values(items);
  }

  async getById(id: string): Promise<T | undefined> {
    const items = this.read();
    return items[id];
  }

  async set(id: string, value: T): Promise<void> {
    const items = this.read();
    items[id] = value;
    this.write(items);
  }
  async delete(id: string): Promise<void> {
    const items = this.read();
    if (id in items) {
      delete items[id];
      this.write(items);
    }
  }

  async clear(): Promise<void> {
    this.write({});
  }
}

export function localStorageDriver<T extends { id: string }>(
  namespace: string,
): StorageDriver<T> {
  return new LocalStorageDriver<T>(namespace);
}
