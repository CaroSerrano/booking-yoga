import type { PaymentService } from '../../services/payment-service.js';

export interface ListPaymentsDeps {
  paymentService: PaymentService;
}
interface ListUserPaymentsPayload {
  userId: string;
}

export async function listUserPayments(
  { paymentService }: ListPaymentsDeps,
  { userId }: ListUserPaymentsPayload
) {
  const payments = await paymentService.findByUserId(userId);
  return payments;
}
