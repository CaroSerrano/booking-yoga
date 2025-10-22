import { NotFoundError } from '../../utils/customErrors.js';
import type { ClassService } from '../../services/class-service.js';

interface DeleteClassPayload {
  id: string;
}

export interface DeleteClassDeps {
  classService: ClassService
}

export async function deleteClass(
  { classService }: DeleteClassDeps,
  { id }: DeleteClassPayload
) {
  const classFound = await classService.findById(id);
  if (!classFound) {
    throw new NotFoundError('Class not found');
  }
  await classService.delete(id);
}
