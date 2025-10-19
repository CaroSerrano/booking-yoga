import type { Payment } from '../../entities/payment.js';
import type { PaymentService } from '../payment-service.js';

export class MockedPaymentService implements PaymentService {
  payments: Payment[] = [];

  constructor(payments: Payment[]) {
    this.payments = payments;
  }

  updateOne = async (id: string, data: Partial<Payment>) => {
    const index = this.payments.findIndex((p) => p.id === id);
    if (index === -1) return undefined;

    this.payments[index] = { ...this.payments[index], ...data } as Payment;
    return this.payments[index];
  };
  findAll = async () => {
    return this.payments;
  };
  findById = async (id: string) => {
    return this.payments.find((p) => p.id == id);
  };
  findByBookingId = async (bookingId: string) => {
    return this.payments.filter((p) => p.bookingId == bookingId);
  };
  findByUserId = async (userId: string) => {
    return this.payments.filter((b) => b.userId == userId);
  };
  save = async (data: Payment) => {
    this.payments.push(data);
  };
  delete = async (id: string) => {
    this.payments = this.payments.filter((p) => p.id !== id);
  };
}
