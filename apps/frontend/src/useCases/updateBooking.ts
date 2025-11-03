import type { Booking } from 'booking-domain';
import type { UpdateBookingDTO } from 'booking-backend';
import { BookingRepository } from '../repositories/bookingRepository';

export async function updateBooking(
  id: string,
  data: UpdateBookingDTO
): Promise<Booking> {
  return await BookingRepository.update(id, data);
}
