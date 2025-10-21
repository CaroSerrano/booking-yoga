import { BookingStatus } from '../../entities/booking.js';
import type { BookingService, ClassService, UserService } from '../../services/index.js';
import { NotFoundError, ValidationError } from '../../utils/customErrors.js';
import generateTimestamps from '../../utils/generateTimestamps.js';
import { validateRequiredFields } from '../../utils/validateRequiredFields.js';
export interface BookingDeps {
  bookingService: BookingService;
  classService: ClassService;
  userService: UserService;
}

interface CreateBookingPayload {
  classId: string;
  userId: string;
}

export async function createBooking(
  { bookingService, classService, userService }: BookingDeps,
  payload: CreateBookingPayload
) {
  validateRequiredFields(payload, ['userId', 'classId']);
  const { userId, classId } = payload;
  const userFound = await userService.findById(userId);
  if (!userFound) {
    throw new NotFoundError('User not found');
  }
  const classFound = await classService.findById(classId);
  if (!classFound) {
    throw new NotFoundError('Class not found');
  }
  const bookingFound = await bookingService.findByUserAndClass(classId, userId);
  if (bookingFound) {
    throw new ValidationError('User already book the class');
  }
  if(classFound.availableSlots <= 0) {
    throw new Error('The class has no available slots')
  }
  const { createdAt, updatedAt } = generateTimestamps();
  const expiresAt = new Date(createdAt.getTime() + 15 * 60 * 1000);

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
