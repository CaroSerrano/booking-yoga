import { BookingStatus } from '../../entities';
import { BookingService, ClassService, UserService } from '../../services';
import generateTimestamps from '../../utils/generateTimestamps';
import { validateRequiredFields } from '../../utils/validateRequiredFields';

interface CreateBookingDeps {
  bookingService: BookingService;
  classService: ClassService;
  userService: UserService;
}

interface CreateBookingPayload {
  classId: string;
  userId: string;
}

export async function createBooking(
  { bookingService, classService, userService }: CreateBookingDeps,
  payload: CreateBookingPayload
) {
  validateRequiredFields(payload, ['userId', 'classId']);
  const { createdAt, updatedAt } = generateTimestamps();
  const expiresAt = new Date(createdAt.getTime() + 15 * 60 * 1000);
  const { userId, classId } = payload;
  await bookingService.save({
    id: crypto.randomUUID(),
    classId,
    userId,
    status: BookingStatus.PENDING,
    expiresAt,
    createdAt,
    updatedAt,
  });
}
