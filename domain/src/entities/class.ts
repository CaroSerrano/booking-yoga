import type { Entity } from '../utils/types/entity';

export const ClassStatus = {
  SCHEDULE: 'SCHEDULE',
  CANCELLED: 'CANCELLED',
  COMPLETED: 'COMPLETED',
} as const;

export type ClassStatus = (typeof ClassStatus)[keyof typeof ClassStatus];
export interface Class extends Entity {
  title: string;
  teacher: string;
  description?: string;
  start: Date;
  end: Date;
  status: ClassStatus;
  location?: string;
  address?: string;
  totalSlots: number;
}
