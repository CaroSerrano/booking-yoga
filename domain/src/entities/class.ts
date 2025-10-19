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
  description: string |null;
  start: Date;
  end: Date;
  status: ClassStatus;
  location: string | null;
  address: string |null;
  totalSlots: number;
  availableSlots: number;
  bookingPrice: number | null;
}
