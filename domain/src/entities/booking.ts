import type { Entity } from '../utils/types/entity';

export const bookingStatus = {
  PENDING: 'PENDING',
  CONFIRMED: 'CONFIRMED',
  CANCELED: 'CANCELED',
} as const;

export type BookingStatus = (typeof bookingStatus)[keyof typeof bookingStatus];

export interface Booking extends Entity {
  userId: string;
  classId: string;
  price?: number;
  expiresAt: Date;
  status: BookingStatus;
  paymentId?: string;
}
