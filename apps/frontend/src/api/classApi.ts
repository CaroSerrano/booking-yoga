import type { ClassResponseDTO, CreateClassDTO } from 'booking-backend';
import type { EventInput } from '@fullcalendar/core';
import { toEventObjects } from '../../utils/classEventMapper';

const BASE_URL = `${process.env.API_URL}/class`;

export const classApi = {
  async fetchAll(): Promise<EventInput[]> {
    const res = await fetch(`${BASE_URL}/extended`, {
      credentials: 'include',
    });
    if (!res.ok) {
      const { message } = await res.json();
      throw new Error(message || 'Error fetching classes');
    }
    const data = await res.json();
    return toEventObjects(data);
  },

  async create(data: CreateClassDTO): Promise<void> {
    const res = await fetch(BASE_URL, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
      credentials: 'include',
    });

    if (!res.ok) {
      const { message } = await res.json();
      throw new Error(message || 'Error creating class');
    }
  },

  async update(id: string, data: FormData): Promise<ClassResponseDTO> {
    const res = await fetch(`${BASE_URL}/${id}`, {
      method: 'PATCH',
      body: data,
      credentials: 'include',
    });

    if (!res.ok) {
      const { message } = await res.json();
      throw new Error(message || 'Error updating class');
    }

    const classUpdated = await res.json();
    return classUpdated;
  },
};
