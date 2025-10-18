import { Entity } from '../utils/types/entity';

export const PaymentStatus = {
  PENDING: 'PENDING',
  COMPLETED: 'COMPLETED',
  FAILED: 'FAILED',
} as const;

export type PaymentStatus = (typeof PaymentStatus)[keyof typeof PaymentStatus];

export interface Payment extends Entity {
  userId: string;
  bookingId: string;
  amount: number;
  currency: string;
  status: PaymentStatus;
}
