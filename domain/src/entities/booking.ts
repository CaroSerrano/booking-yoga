import type { Entity } from '../utils/types/entity';

export const BookingStatus = {
  PENDING: 'PENDING',
  CONFIRMED: 'CONFIRMED',
  CANCELED: 'CANCELED',
  EXPIRED: 'EXPIRED'
} as const;

export type BookingStatus = (typeof BookingStatus)[keyof typeof BookingStatus];

export interface Booking extends Entity {
  userId: string;
  classId: string;
  price?: number;
  expiresAt: Date;
  status: BookingStatus;
  paymentId?: string;
}
