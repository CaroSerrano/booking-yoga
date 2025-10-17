import { NotFoundError } from '../../utils/customErrors';
import { ClassDeps } from './createClass';

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
