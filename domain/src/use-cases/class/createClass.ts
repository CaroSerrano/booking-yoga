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
    description,
    location,
    address,
  } = payload;
  const startDate = new Date(start);
  const endDate = new Date(end);
  await classService.save({
    id: crypto.randomUUID(),
    title,
    teacher,
    start: startDate,
    end: endDate,
    totalSlots,
    ...generateTimestamps(),
    ...(description !== undefined && { description }),
    ...(location !== undefined && { location }),
    ...(address !== undefined && { address }),
  });
}
