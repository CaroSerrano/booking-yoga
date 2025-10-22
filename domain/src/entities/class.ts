import type { Entity } from '../utils/types/entity.js';

export const ClassStatus = {
  SCHEDULE: 'SCHEDULE',
  CANCELLED: 'CANCELLED',
  COMPLETED: 'COMPLETED',
} as const;

export type ClassStatus = (typeof ClassStatus)[keyof typeof ClassStatus];
export interface Class extends Entity {
  title: string;
  teacherId: string;
  start: Date;
  end: Date;
  status: ClassStatus;
  totalSlots: number;
  availableSlots: number;
  description?: string;
  location?: string;
  address?: string;
  bookingPrice?: number;
}
