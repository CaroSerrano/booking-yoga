import { vi, describe, it, expect } from 'vitest';
import { createCheckoutSession } from '../useCases/createCheckoutSession';
import { PaymentRepository } from '../repositories/paymentRepository';
import type { CreatePaymentDTO } from 'booking-backend';

vi.mock('../repositories/paymentRepository');

describe('createCheckoutSession', () => {
  it('crea una sesión de Stripe usando el repositorio', async () => {
    await createCheckoutSession({
      bookingId: '1',
      userId: '1',
      amount: 20,
      currency: 'usd',
      successUrl: '',
      cancelUrl: '',
    } satisfies CreatePaymentDTO);

    expect(PaymentRepository.createCheckoutSession).toHaveBeenCalledWith({
      bookingId: '1',
      userId: '1',
      amount: 20,
      currency: 'usd',
      successUrl: '',
      cancelUrl: '',
    });
  });
});
