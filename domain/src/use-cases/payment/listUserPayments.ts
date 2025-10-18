import { UpdatePaymentDeps } from './updatePayment';

interface ListUserPaymentsPayload {
  userId: string;
}

export async function listUserPayments(
  { paymentService }: UpdatePaymentDeps,
  { userId }: ListUserPaymentsPayload
) {
  const payments = await paymentService.findByUserId(userId);
  return payments;
}
