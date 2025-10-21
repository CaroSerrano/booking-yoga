import { PaymentStatus } from 'booking-domain';
import { z } from 'zod';

export const createPaymentSchema = z.object({
  bookingId: z.string().min(1, 'bookingId is required'),
  userId: z.string().min(1, 'userId is required'),
  amount: z.coerce.number().nonnegative(),
  currency: z.string().min(1, 'currency is required'),
});

export const updatePaymentSchema = z.object({
  status: z.enum(PaymentStatus),
});
