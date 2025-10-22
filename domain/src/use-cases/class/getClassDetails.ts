import type { ClassService } from '../../services/class-service.js';
import { NotFoundError } from '../../utils/customErrors.js';
interface GetClassDetailsPayload {
  id: string;
}

export interface GetClasDetailsDeps {
  classService: ClassService;
}
export async function getClassDetails(
  { classService }: GetClasDetailsDeps,
  { id }: GetClassDetailsPayload
) {
  const classFound = await classService.findById(id);
  if (!classFound) {
    throw new NotFoundError('Class not found');
  }
  return classFound;
}
