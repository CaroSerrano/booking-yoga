import { faker } from '@faker-js/faker';
import generateTimestamps from '../../utils/generateTimestamps';
import { Payment, PaymentStatus } from '../payment';

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
