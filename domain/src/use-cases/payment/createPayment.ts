import { PaymentStatus } from '../../entities';
import { PaymentService } from '../../services';
import generateTimestamps from '../../utils/generateTimestamps';
import { validateRequiredFields } from '../../utils/validateRequiredFields';

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
  payload: CreatePaymentPayload
) {
  validateRequiredFields(payload, [
    'userId',
    'bookingId',
    'amount',
    'currency',
  ]);
  const { userId, bookingId, amount, currency } = payload;
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
