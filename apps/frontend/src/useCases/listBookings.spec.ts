import { vi, describe, it, expect } from 'vitest';
import { listBookings } from '../useCases/listBookings';
import { BookingRepository } from '../repositories/bookingRepository';
import type { Booking, BookingFilters } from 'booking-domain';

vi.mock('../repositories/bookingRepository');

describe('listBookings', () => {
  it('retorna la lista de reservas', async () => {
    const fakeBookings = [
      {
        classId: '1',
        userId: '1',
      },
    ];
    vi.mocked(BookingRepository.listByFilters).mockResolvedValue(
      fakeBookings as Booking[]
    );
    const filters: BookingFilters = { classId: '1', userId: '1' };
    const result = await listBookings(filters);

    expect(result).toEqual(fakeBookings);
    expect(BookingRepository.listByFilters).toHaveBeenCalledWith(filters);
  });
});
