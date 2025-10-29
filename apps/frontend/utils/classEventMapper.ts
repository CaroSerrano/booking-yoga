import type { ClassResponseDTO } from 'booking-backend';
import type { EventInput } from '@fullcalendar/core';

export const toEventObjects = (classes: ClassResponseDTO[]): EventInput[] =>
  classes.map((c) => ({
    id: c.id,
    title: c.title,
    start: c.start,
    end: c.end,
    extendedProps: {
      teacherId: c.teacherId,
      status: c.status,
      totalSlots: c.totalSlots,
      description: c.description,
      location: c.location,
      bookingPrice: c.bookingPrice,
      address: c.address,
    },
  }));
