import { vi, describe, it, expect } from 'vitest';
import { BookingRepository } from '../repositories/bookingRepository';
import type { UpdateBookingDTO } from 'booking-backend';
import { updateBooking } from './updateBooking';

vi.mock('../repositories/bookingRepository');

describe('updateBooking', () => {
  it('actualiza una reserva usando el repositorio', async () => {
    vi.mocked(BookingRepository.update).mockResolvedValue({
      id: '1',
      status: 'CONFIRMED',
      classId: '1',
      userId: '1',
    });
    await updateBooking('1', {
      status: 'CONFIRMED',
    } as UpdateBookingDTO);

    expect(BookingRepository.update).toHaveBeenCalledWith('1', {
      status: 'CONFIRMED',
    });
  });
});
