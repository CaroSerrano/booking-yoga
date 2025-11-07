import { PaymentStatus } from 'booking-domain';
import type Stripe from 'stripe';
import { z } from 'zod';

export const createPaymentSchema = z.object({
  bookingId: z.string().min(1, 'bookingId is required'),
  userId: z.string().min(1, 'userId is required'),
  amount: z.coerce.number().nonnegative(),
  currency: z.string().min(1, 'currency is required'),
  successUrl: z.url('success url is required'),
  cancelUrl: z.url('cancel url is required'),
});

export type CreatePaymentDTO = z.infer<typeof createPaymentSchema>;

export const updatePaymentSchema = z.object({
  status: z.enum(PaymentStatus),
});

export type UpdatePaymentDTO = z.infer<typeof updatePaymentSchema>;

export type CheckoutSession = Stripe.Checkout.Session;
