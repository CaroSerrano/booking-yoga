import type { ClassDeps } from '../../../dist/index.js';
import { NotFoundError } from '../../utils/customErrors.js';

interface DeleteClassPayload {
  id: string;
}

export async function deleteClass(
  { classService }: ClassDeps,
  { id }: DeleteClassPayload
) {
  const classFound = await classService.findById(id);
  if (!classFound) {
    throw new NotFoundError('class not found');
  }
  await classService.delete(id);
}
