import { faker } from '@faker-js/faker';
import generateTimestamps from '../../utils/generateTimestamps.js';
import { type Payment, PaymentStatus } from '../payment.js';

export function paymentMock(opts?: Partial<Payment>): Payment {
  return {
    id: faker.string.uuid(),
    bookingId: faker.string.uuid(),
    userId: faker.string.uuid(),
    amount: Number(faker.commerce.price()),
    currency: faker.finance.currencyCode(),
    status: PaymentStatus.PENDING,
    ...generateTimestamps(),
    ...opts,
  };
}
