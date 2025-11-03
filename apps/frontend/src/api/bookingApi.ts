import type { CreateBookingDTO, UpdateBookingDTO } from 'booking-backend';
import type { Booking, BookingFilters } from 'booking-domain';

const BASE_URL = 'http://localhost:3000/api/booking';

export const bookingApi = {
  async update(id: string, data: UpdateBookingDTO): Promise<Booking> {
    const res = await fetch(`${BASE_URL}/${id}`, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
      credentials: 'include',
    });
    if (!res.ok) {
      const { message } = await res.json();
      throw new Error(message || 'Error updating booking');
    }
    const booking = await res.json();
    return booking;
  },

  async create(data: CreateBookingDTO): Promise<void> {
    const res = await fetch(BASE_URL, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
      credentials: 'include',
    });

    if (!res.ok) {
      const { message } = await res.json();
      throw new Error(message || 'Error creating booking');
    }
  },

  async listByFilters(filters: BookingFilters): Promise<Booking[]> {
    const { classId, userId } = filters;
    const res = await fetch(`${BASE_URL}?userId=${userId}&classId=${classId}`, {
      credentials: 'include',
    });
    if (!res.ok) {
      const { message } = await res.json();
      throw new Error(message || 'Error geting bookings');
    }
    const bookings = await res.json();
    return bookings;
  },
};
