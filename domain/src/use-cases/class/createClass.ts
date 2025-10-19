import { ClassStatus } from '../../entities/class.js';
import type { ClassService } from '../../services/index.js';
import generateTimestamps from '../../utils/generateTimestamps.js';
import { validateRequiredFields } from '../../utils/validateRequiredFields.js';

export interface ClassDeps {
  classService: ClassService;
}

interface CreateClassPayload {
  title: string;
  teacherId: string;
  start: string;
  end: string;
  status: ClassStatus;
  description: string;
  location: string;
  bookingPrice: number;
  address: string;
  totalSlots: number;
}

export async function createClass(
  { classService }: ClassDeps,
  payload: CreateClassPayload
) {
  validateRequiredFields(payload, [
    'title',
    'teacherId',
    'start',
    'end',
    'totalSlots',
  ]);

  const {
    title,
    teacherId,
    start,
    end,
    totalSlots,
    status,
    description,
    location,
    bookingPrice,
    address,
  } = payload;
  const startDate = new Date(start);
  const endDate = new Date(end);
  const classStatus = status ? status : ClassStatus.SCHEDULE;
  await classService.save({
    id: crypto.randomUUID(),
    title,
    teacherId,
    start: startDate,
    end: endDate,
    totalSlots,
    bookingPrice,
    availableSlots: totalSlots,
    status: classStatus,
    ...generateTimestamps(),
    description,
    location,
    address,
  });
}
