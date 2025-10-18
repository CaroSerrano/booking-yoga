import { UpdateDeps } from './updatePayment';

interface ListUserPaymentsPayload {
  userId: string;
}

export async function listUserPayments(
  { paymentService }: UpdateDeps,
  { userId }: ListUserPaymentsPayload
) {
  const payments = await paymentService.findByUserId(userId);
  return payments;
}
