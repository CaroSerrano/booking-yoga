import type { Booking } from '../../entities/booking.js';
import type { BookingService } from '../booking-service.js';

export class MockedBookingService implements BookingService {
  bookings: Booking[] = [];

  constructor(bookings: Booking[]) {
    this.bookings = bookings;
  }

  updateOne = async (id: string, data: Partial<Booking>) => {
    const index = this.bookings.findIndex((b) => b.id === id);
    if (index === -1) return undefined;

    this.bookings[index] = { ...this.bookings[index], ...data };
    return this.bookings[index];
  };
  findAll = async () => {
    return this.bookings;
  };
  findById = async (id: string) => {
    return this.bookings.find((b) => b.id == id);
  };
  findByClassId = async (classId: string) => {
    return this.bookings.filter((b) => b.classId == classId);
  };
  findByUserId = async (userId: string) => {
    return this.bookings.filter((b) => b.userId == userId);
  };
  save = async (data: Booking) => {
    this.bookings.push(data);
  };
  delete = async (id: string) => {
    this.bookings = this.bookings.filter((b) => b.id !== id);
  };
}
