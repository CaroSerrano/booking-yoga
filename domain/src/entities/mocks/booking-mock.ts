import { faker } from '@faker-js/faker';
import generateTimestamps from '../../utils/generateTimestamps';
import { Booking, BookingStatus } from '../booking';

export function bookingMock(opts?: Partial<Booking>): Booking {
  const { createdAt, updatedAt } = generateTimestamps();
  const expiresAt = new Date(createdAt.getTime() + 15 * 60 * 1000);
  return {
    id: faker.string.uuid(),
    userId: faker.string.uuid(),
    classId: faker.string.uuid(),
    price: Number(faker.commerce.price()),
    expiresAt,
    status: BookingStatus.PENDING,
    createdAt,
    updatedAt,
    ...opts,
  };
}
