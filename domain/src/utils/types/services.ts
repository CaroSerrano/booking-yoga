import type { Entity } from "./entity.js";

export interface Service<TEntity extends Entity>
  extends ServiceQuery<TEntity>,
    ServiceStorage<TEntity> {}

interface ServiceQuery<TEntity extends Entity> {
  findById: (id: string) => Promise<TEntity | undefined>;
  findAll: () => Promise<TEntity[]>;
}

interface ServiceStorage<TEntity extends Entity> {
  updateOne: (id: string, data: Partial<TEntity>) => Promise<TEntity | undefined>;
  save: (data: TEntity) => Promise<void>;
  delete: (id: string) => Promise<void>;
}