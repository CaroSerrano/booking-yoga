import { vi, describe, it, expect } from 'vitest';
import { updatePayment } from '../useCases/updatePayment';
import { PaymentRepository } from '../repositories/paymentRepository';

vi.mock('../repositories/paymentRepository');

describe('updatePayment', () => {
  it('actualiza el estado del pago usando el repositorio', async () => {
    vi.mocked(PaymentRepository.update).mockResolvedValue({
      id: '1',
      status: 'COMPLETED',
      bookingId: '',
      userId: '10',
      amount: 10,
      currency: 'usd',
    });
    const res = await updatePayment('1', { status: 'COMPLETED' });
    expect(res).toEqual({
      id: '1',
      status: 'COMPLETED',
      bookingId: '',
      userId: '10',
      amount: 10,
      currency: 'usd',
    });

    expect(PaymentRepository.update).toHaveBeenCalledWith('1', {
      status: 'COMPLETED',
    });
  });
});
