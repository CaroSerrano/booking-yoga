import { UpdatePaymentDeps } from './updatePayment';

interface ListBookingPaymentsPayload {
  bookingId: string;
}

export async function listBookingPayments(
  { paymentService }: UpdatePaymentDeps,
  { bookingId }: ListBookingPaymentsPayload
) {
  const payments = await paymentService.findByBookingId(bookingId);
  return payments;
}
