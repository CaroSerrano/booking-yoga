import type { Entity } from '../utils/types/entity.js';

export const BookingStatus = {
  PENDING: 'PENDING',
  CONFIRMED: 'CONFIRMED',
  CANCELLED: 'CANCELLED',
  EXPIRED: 'EXPIRED'
} as const;

export type BookingStatus = (typeof BookingStatus)[keyof typeof BookingStatus];

export interface Booking extends Entity {
  userId: string;
  classId: string;
  expiresAt?: Date;
  status: BookingStatus;
}
