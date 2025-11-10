import type {
  CheckoutSession,
  CreatePaymentDTO,
  UpdatePaymentDTO,
} from 'booking-backend';
import type { Payment } from 'booking-domain';
import { paymentApi } from '../api/paymentApi';

export const PaymentRepository = {
  createCheckoutSession: (data: CreatePaymentDTO): Promise<CheckoutSession> =>
    paymentApi.createCheckoutSession(data),
  update: (id: string, data: UpdatePaymentDTO): Promise<Payment> =>
    paymentApi.update(id, data),
  findByBooking: (bookingId: string): Promise<Payment> =>
    paymentApi.findByBookingId(bookingId),
  listUserPayments: (userId: string): Promise<Payment[]> =>
    paymentApi.getUserPayments(userId),
};
