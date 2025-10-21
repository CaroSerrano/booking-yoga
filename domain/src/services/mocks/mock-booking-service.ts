import type { Booking } from '../../entities/booking.js';
import type { BookingFilters } from '../../use-cases/booking/listBookingByFilter.js';
import type { BookingService } from '../booking-service.js';

export class MockedBookingService implements BookingService {
  bookings: Booking[] = [];

  constructor(bookings: Booking[]) {
    this.bookings = bookings;
  }

  updateOne = async (id: string, data: Partial<Booking>) => {
    const index = this.bookings.findIndex((b) => b.id === id);
    if (index === -1) return undefined;

    this.bookings[index] = { ...this.bookings[index], ...data } as Booking;
    return this.bookings[index];
  };
  findAll = async () => {
    return this.bookings;
  };
  findByFilters = async (filters: BookingFilters) => {
    return this.bookings.filter((b) => {
      let match = true;

      if (filters.userId) match &&= b.userId === filters.userId;

      if (filters.classId) match &&= b.classId === filters.classId;

      return match;
    });
  };
  findById = async (id: string) => {
    return this.bookings.find((b) => b.id == id);
  };
  findByUserAndClass = async (classId: string, userId: string) => {
    return this.bookings.find(
      (b) => b.classId === classId && b.userId === userId
    );
  };
  save = async (data: Booking) => {
    this.bookings.push(data);
  };
  delete = async (id: string) => {
    this.bookings = this.bookings.filter((b) => b.id !== id);
  };
}
