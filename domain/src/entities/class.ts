import type { Entity } from '../utils/types/entity';

export interface Class extends Entity {
  title: string;
  teacher: string;
  description?: string;
  start: Date;
  end: Date;
  location?: string;
  address?: string;
  totalSlots: number;
}
