import { ClassDeps } from './createClass';

export async function listAvailableClasses({ classService }: ClassDeps) {
  const classes = await classService.findAvailable();
  return classes;
}
