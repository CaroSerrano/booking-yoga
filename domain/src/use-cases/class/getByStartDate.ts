import { ValidationError } from '../../utils/customErrors.js';
import type { ClassDeps } from './createClass.js';

interface GetByStartDatePayload {
  start: string;
}

export async function getClassByStartDate(
  { classService }: ClassDeps,
  { start }: GetByStartDatePayload
) {
  const isoRegex = /^\d{4}-\d{2}-\d{2}$/;
  if (!isoRegex.test(start)) {
    throw new ValidationError('Invalid date format (expected YYYY-MM-DD)');
  }
  const startDate = new Date(start);
  if (isNaN(startDate.getTime())) {
    throw new ValidationError('Invalid date value');
  }
  const classes = await classService.findByStartDate(startDate);
  return classes;
}
