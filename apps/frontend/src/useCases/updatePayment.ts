import type { Payment } from 'booking-domain';
import { PaymentRepository } from '../repositories/paymentRepository';
import type { UpdatePaymentDTO } from 'booking-backend';

export async function updatePayment(
  id: string,
  data: UpdatePaymentDTO
): Promise<Payment> {
  return await PaymentRepository.update(id, data);
}
