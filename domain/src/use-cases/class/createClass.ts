import { ClassStatus } from '../../entities/class.js';
import type { ClassService, UserService } from '../../services/index.js';
import { NotFoundError, ValidationError } from '../../utils/customErrors.js';
import generateTimestamps from '../../utils/generateTimestamps.js';
import { validateRequiredFields } from '../../utils/validateRequiredFields.js';

export interface ClassDeps {
  classService: ClassService;
  userService: UserService;
}

interface CreateClassPayload {
  title: string;
  teacherId: string;
  start: string;
  end: string;
  totalSlots: number;
  status?: ClassStatus;
  description?: string;
  location?: string;
  bookingPrice?: number;
  address?: string;
}

export async function createClass(
  { classService, userService }: ClassDeps,
  payload: CreateClassPayload
) {
  validateRequiredFields(payload, [
    'title',
    'teacherId',
    'start',
    'end',
    'totalSlots',
  ]);

  const { teacherId, start, end, totalSlots, status, ...data } = payload;
  const startDate = new Date(start);
  const endDate = new Date(end);
  if (endDate <= startDate) {
    throw new ValidationError('End date must be after start date');
  }
  const classStatus = status ?? ClassStatus.SCHEDULE;
  const teacherFound = await userService.findById(teacherId);
  if (!teacherFound) {
    throw new NotFoundError('Teacher not found');
  }
  await classService.save({
    id: crypto.randomUUID(),
    teacherId,
    start: startDate,
    end: endDate,
    totalSlots,
    availableSlots: totalSlots,
    status: classStatus,
    ...generateTimestamps(),
    ...data,
  });
}
