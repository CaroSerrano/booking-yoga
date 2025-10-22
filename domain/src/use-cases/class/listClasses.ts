import type { ClassService } from '../../services/class-service.js';

export interface GetClassesDeps {
  classService: ClassService;
}

export async function listAvailableClasses({ classService }: GetClassesDeps) {
  const classes = await classService.findAvailable();
  return classes;
}

export interface Filters {
  location?: string;
  title?: string;
  teacherId?: string;
  startDate?: Date;
}

export async function getClasses(
  { classService }: GetClassesDeps,
  filters: Filters
) {
  return classService.findByFilters(filters);
}
