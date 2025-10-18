import type { Payment } from '../entities/payment.js';
import type { Service } from '../utils/types/services.js';

export interface PaymentService extends Service<Payment> {
  findByBookingId: (bookingId: string) => Promise<Payment[]>;
  findByUserId: (userId: string) => Promise<Payment[]>;
}
