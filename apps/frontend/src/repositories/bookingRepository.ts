import type { CreateBookingDTO, UpdateBookingDTO } from 'booking-backend';
import type { Booking, BookingFilters } from 'booking-domain';
import { bookingApi } from '../api/bookingApi';

export const BookingRepository = {
  update: (id: string, data: UpdateBookingDTO): Promise<Booking> =>
    bookingApi.update(id, data),
  create: (data: CreateBookingDTO): Promise<void> => bookingApi.create(data),
  listByFilters: (filters: BookingFilters): Promise<Booking[]> =>
    bookingApi.listByFilters(filters),
};
