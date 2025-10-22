import type { ListPaymentsDeps } from './listUserPayments.js';

interface ListBookingPaymentsPayload {
  bookingId: string;
}

export async function getBookingPayment(
  { paymentService }: ListPaymentsDeps,
  { bookingId }: ListBookingPaymentsPayload
) {
  const payment = await paymentService.findByBookingId(bookingId);
  return payment;
}
