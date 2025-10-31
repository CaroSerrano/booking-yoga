import type { ExtendedClass } from 'booking-backend';
import type { EventInput } from '@fullcalendar/core';

export const toEventObjects = (classes: ExtendedClass[]): EventInput[] =>
  classes.map((c) => ({
    id: c.id,
    title: c.title,
    start: c.start,
    end: c.end,
    extendedProps: {
      teacherId: c.teacherId,
      status: c.status,
      totalSlots: c.totalSlots,
      availableSlots: c.availableSlots,
      description: c.description,
      location: c.location,
      bookingPrice: c.bookingPrice,
      address: c.address,
      bookings: c.bookings,
      teacher: c.teacher,
    },
  }));
