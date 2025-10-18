import { PaymentStatus } from '../../entities';
import { PaymentService } from '../../services';
import generateTimestamps from '../../utils/generateTimestamps';

interface CreatePaymentDeps {
  paymentService: PaymentService;
}

interface CreatePaymentPayload {
  bookingId: string;
  userId: string;
  amount: number;
  currency: string;
}

export async function createPayment(
  { paymentService }: CreatePaymentDeps,
  { bookingId, userId, amount, currency }: CreatePaymentPayload
) {
  await paymentService.save({
    id: crypto.randomUUID(),
    bookingId,
    userId,
    amount,
    currency,
    status: PaymentStatus.PENDING,
    ...generateTimestamps(),
  });
}
