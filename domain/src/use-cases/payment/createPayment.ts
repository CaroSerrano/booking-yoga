import { PaymentStatus } from '../../entities';
import { BookingService, PaymentService, UserService } from '../../services';
import { NotFoundError } from '../../utils/customErrors';
import generateTimestamps from '../../utils/generateTimestamps';
import { validateRequiredFields } from '../../utils/validateRequiredFields';

interface CreatePaymentDeps {
  paymentService: PaymentService;
  userService: UserService;
  bookingService: BookingService;
}

interface CreatePaymentPayload {
  bookingId: string;
  userId: string;
  amount: number;
  currency: string;
}

export async function createPayment(
  { paymentService, userService, bookingService }: CreatePaymentDeps,
  payload: CreatePaymentPayload
) {
  validateRequiredFields(payload, [
    'userId',
    'bookingId',
    'amount',
    'currency',
  ]);
  const { userId, bookingId, amount, currency } = payload;

  const userFound = await userService.findById(userId);
  if (!userFound) {
    throw new NotFoundError('User not found');
  }

  const bookingFound = await bookingService.findById(bookingId);
  if (!bookingFound) {
    throw new NotFoundError('Booking not found');
  }
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
