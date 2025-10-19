import type { UpdatePaymentDeps } from './updatePayment.js';

interface ListBookingPaymentsPayload {
  bookingId: string;
}

export async function listBookingPayments(
  { paymentService }: UpdatePaymentDeps,
  { bookingId }: ListBookingPaymentsPayload
) {
  const payment = await paymentService.findByBookingId(bookingId);
  return payment;
}
