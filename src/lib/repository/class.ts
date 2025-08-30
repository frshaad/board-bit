import { ulid } from 'ulid';
import { type z } from 'zod';
import { type StorageDriver } from '@/types/storage-driver';
import { type BaseEntity } from '../schema/base';
import { nowISO } from '../utils';

export class Repository<T extends BaseEntity, S extends z.ZodTypeAny<T>> {
  constructor(
    private schema: S,
    private driver: StorageDriver<T>,
  ) {}

  async getAll(): Promise<T[]> {
    return this.driver.getAll();
  }

  async getById(id: string): Promise<T | undefined> {
    return this.driver.getById(id);
  }

  async create(data: Partial<T>): Promise<T> {
    const id = data.id ?? ulid();
    const entity = {
      ...data,
      id,
      createdAt: nowISO(),
      updatedAt: nowISO(),
      version: 0,
    };

    const parsed = this.schema.parse(entity);
    await this.driver.set(parsed.id, parsed);
    return parsed;
  }

  async update(id: string, patch: Partial<T>): Promise<T> {
    const existingEntity = await this.driver.getById(id);
    if (!existingEntity) {
      throw new Error(`Entity with id ${id} not found`);
    }

    const updated = {
      ...existingEntity,
      ...patch,
      updatedAt: nowISO(),
      version: existingEntity.version + 1,
    };

    const parsed = this.schema.parse(updated);
    await this.driver.set(id, parsed);
    return parsed;
  }

  async upsert(id: string, data: Partial<T>): Promise<T> {
    const existingEntity = await this.driver.getById(id);
    return existingEntity
      ? this.update(id, data)
      : this.create({ ...data, id });
  }

  async delete(id: string): Promise<void> {
    await this.driver.delete(id);
  }

  async clear(): Promise<void> {
    await this.driver.clear();
  }
}
