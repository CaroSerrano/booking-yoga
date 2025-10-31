import { classApi } from '../api/classApi';
import type { CreateClassDTO } from 'booking-backend';
import type { EventInput } from '@fullcalendar/core';

export const ClassRepository = {
  fetchAll: (): Promise<EventInput[]> => classApi.fetchAll(),
  create: (data: CreateClassDTO): Promise<void> => classApi.create(data),
};
