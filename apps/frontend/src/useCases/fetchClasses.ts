import { ClassRepository } from '../repositories/classRepository';
import type { EventInput } from '@fullcalendar/core';

export async function fetchClasses(): Promise<EventInput[]> {
  return await ClassRepository.fetchAll();
}
