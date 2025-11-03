import { vi, describe, it, expect } from 'vitest';
import { createBooking } from '../useCases/createBooking';
import { BookingRepository } from '../repositories/bookingRepository';
import type { CreateBookingDTO } from 'booking-backend';

vi.mock('../repositories/bookingRepository');

describe('createBooking', () => {
  it('crea una reserva usando el repositorio', async () => {
    vi.mocked(BookingRepository.create).mockResolvedValue();
    await createBooking({
      classId: '1',
      userId: '1',
    } as CreateBookingDTO);

    expect(BookingRepository.create).toHaveBeenCalledWith({
      classId: '1',
      userId: '1',
    });
  });
});
