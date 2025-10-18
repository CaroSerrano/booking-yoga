import { UpdateDeps } from './updatePayment';

interface ListBookingPaymentsPayload {
  bookingId: string;
}

export async function listBookingPayments(
  { paymentService }: UpdateDeps,
  { bookingId }: ListBookingPaymentsPayload
) {
  const payments = await paymentService.findByBookingId(bookingId);
  return payments;
}
