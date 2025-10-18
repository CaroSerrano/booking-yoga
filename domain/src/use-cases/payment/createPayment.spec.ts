import { describe, test, expect } from 'vitest';
import { MockedPaymentService } from '../../services/mocks/mock-payment-service';
import { PaymentStatus } from '../../entities';
import { createPayment } from './createPayment';
import { MockedUserService } from '../../services/mocks/mock-user-service';
import { userMock } from '../../entities/mocks/user-mock';

describe('Create payment', () => {
  test('should create a payment with all required fields', async () => {
    const paymentService = new MockedPaymentService([]);
    const userService = new MockedUserService([userMock({ id: '1' })]);

    const result = await createPayment(
      { paymentService, userService },
      {
        userId: '1',
        bookingId: '1',
        amount: 80,
        currency: 'USD',
      }
    );

    expect(result).toBeUndefined();
    expect(paymentService.payments).toHaveLength(1);
    expect(paymentService.payments[0]).toStrictEqual({
      id: expect.any(String),
      userId: '1',
      bookingId: '1',
      amount: 80,
      currency: 'USD',
      status: PaymentStatus.PENDING,
      createdAt: expect.any(Date),
      updatedAt: expect.any(Date),
    });
  });

  test('if a required field is missing, an error with an appropiate message is expected', async () => {
    const paymentService = new MockedPaymentService([]);
    const userService = new MockedUserService([]);
    await expect(() =>
      createPayment(
        { paymentService, userService },
        // @ts-expect-error - Testing validation with missing required field
        {
          userId: '1',
          amount: 80,
          currency: 'USD',
        }
      )
    ).rejects.toThrow('bookingId is required');
  });

  test('if userId does not exist, an error with an appropiate message is expected', async () => {
    const paymentService = new MockedPaymentService([]);
    const userService = new MockedUserService([]);

    await expect(() =>
      createPayment(
        { paymentService, userService },
        {
          userId: '1',
          bookingId: '1',
          amount: 80,
          currency: 'USD',
        }
      )
    ).rejects.toThrow('User not found');
  });
});
