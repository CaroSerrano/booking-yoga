import { ClassStatus } from '../../entities/class.js';
import type { ClassService } from '../../services/class-service.js';
import { NotFoundError } from '../../utils/customErrors.js';
interface UpdatePayload {
  id: string;
  title?: string;
  description?: string;
  teacherId?: string;
  totalSlots?: number;
  start?: string;
  status?: ClassStatus;
  end?: string;
  location?: string;
  address?: string;
}

export interface UpdateClassDeps {
  classService: ClassService;
}

export async function updateClass(
  { classService }: UpdateClassDeps,
  payload: UpdatePayload
) {
  const { id, end, start, ...data } = payload;
  const classFound = await classService.findById(id);
  if (!classFound) {
    throw new NotFoundError('Class not found');
  }

  const updatedClass = await classService.updateOne(id, {
    ...data,
    ...(start !== undefined && { start: new Date(start) }),
    ...(end !== undefined && { end: new Date(end) }),
  });
  return updatedClass;
}
