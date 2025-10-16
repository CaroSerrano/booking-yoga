import { ClassService } from '../../services';
import { ValidationError } from '../../utils/customErrors';
import generateTimestamps from '../../utils/generateTimestamps';

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
  {
    title,
    teacher,
    start,
    end,
    totalSlots,
    description,
    location,
    address,
  }: CreateClassPayload
) {
    if (!title) {
        throw new ValidationError('title is required')
    }
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
