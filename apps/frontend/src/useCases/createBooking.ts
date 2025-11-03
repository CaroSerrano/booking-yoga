import { BookingRepository } from '../repositories/bookingRepository';
import type { CreateBookingDTO } from 'booking-backend';

export async function createBooking(data: CreateBookingDTO): Promise<void> {
  return await BookingRepository.create(data);
}
