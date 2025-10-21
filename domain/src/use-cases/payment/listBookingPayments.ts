import type { ListPaymentsDeps } from './listUserPayments.js';

interface ListBookingPaymentsPayload {
  bookingId: string;
}

export async function listBookingPayments(
  { paymentService }: ListPaymentsDeps,
  { bookingId }: ListBookingPaymentsPayload
) {
  const payments = await paymentService.findByBookingId(bookingId);
  return payments;
}
