import { PaymentRepository } from '../repositories/paymentRepository';
import type { CheckoutSession, CreatePaymentDTO } from 'booking-backend';

export async function createCheckoutSession(
  data: CreatePaymentDTO
): Promise<CheckoutSession> {
  return await PaymentRepository.createCheckoutSession(data);
}
