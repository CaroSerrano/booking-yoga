import type { ClassDeps } from './createClass.js';

export async function listAvailableClasses({ classService }: ClassDeps) {
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
  { classService }: ClassDeps,
  filters: Filters
) {
  const activeFilters = Object.fromEntries(
    Object.entries(filters).filter(([_, v]) => v !== undefined && v !== null)
  );

  return classService.findByFilters(activeFilters);
}
