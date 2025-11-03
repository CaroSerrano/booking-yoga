import { classApi } from '../api/classApi';
import type { ClassResponseDTO, CreateClassDTO } from 'booking-backend';
import type { EventInput } from '@fullcalendar/core';

export const ClassRepository = {
  fetchAll: (): Promise<EventInput[]> => classApi.fetchAll(),
  create: (data: CreateClassDTO): Promise<void> => classApi.create(data),
  update: (id: string, data: FormData): Promise<ClassResponseDTO> =>
    classApi.update(id, data),
};
