import { NotFoundError } from '../../utils/customErrors.js';
import type { ClassDeps } from './createClass.js';

interface GetClassDetailsPayload {
  id: string;
}
export async function getClassDetails(
  { classService }: ClassDeps,
  { id }: GetClassDetailsPayload
) {
  const classFound = await classService.findById(id);
  if (!classFound) {
    throw new NotFoundError('Class not found');
  }
  return classFound;
}
