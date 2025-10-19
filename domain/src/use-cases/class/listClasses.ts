import type { ClassDeps } from './createClass.js';

export async function listAvailableClasses({ classService }: ClassDeps) {
  const classes = await classService.findAvailable();
  return classes;
}