import { ClassStatus } from '../../entities';
import { ClassService } from '../../services';
import generateTimestamps from '../../utils/generateTimestamps';
import { validateRequiredFields } from '../../utils/validateRequiredFields';

export interface ClassDeps {
  classService: ClassService;
}

interface CreateClassPayload {
  title: string;
  teacher: string;
  start: string;
  end: string;
  status?: ClassStatus;
  description?: string;
  location?: string;
  address?: string;
  totalSlots: number;
}

export async function createClass(
  { classService }: ClassDeps,
  payload: CreateClassPayload
) {
  validateRequiredFields(payload, [
    'title',
    'teacher',
    'start',
    'end',
    'totalSlots',
  ]);

  const {
    title,
    teacher,
    start,
    end,
    totalSlots,
    status,
    description,
    location,
    address,
  } = payload;
  const startDate = new Date(start);
  const endDate = new Date(end);
  const classStatus = status ? status : ClassStatus.SCHEDULE;
  await classService.save({
    id: crypto.randomUUID(),
    title,
    teacher,
    start: startDate,
    end: endDate,
    totalSlots,
    status: classStatus,
    ...generateTimestamps(),
    ...(description !== undefined && { description }),
    ...(location !== undefined && { location }),
    ...(address !== undefined && { address }),
  });
}
