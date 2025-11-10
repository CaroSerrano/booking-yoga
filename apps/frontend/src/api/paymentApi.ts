import type {
  CheckoutSession,
  CreatePaymentDTO,
  UpdatePaymentDTO,
} from 'booking-backend';
import type { Payment } from 'booking-domain';

const BASE_URL = `${process.env.API_URL}/payment`;

export const paymentApi = {
  async createCheckoutSession(
    payment: CreatePaymentDTO
  ): Promise<CheckoutSession> {
    const res = await fetch(`${BASE_URL}/create-checkout-session`, {
      credentials: 'include',
      method: 'POST',
      body: JSON.stringify(payment),
      headers: { 'Content-Type': 'application/json' },
    });
    if (!res.ok) {
      const { message } = await res.json();
      throw new Error(message || 'Error creating checkout session');
    }
    const data = await res.json();
    return data;
  },

  async update(id: string, data: UpdatePaymentDTO): Promise<Payment> {
    const res = await fetch(`${BASE_URL}/${id}`, {
      credentials: 'include',
      method: 'PATCH',
      body: JSON.stringify(data),
      headers: { 'Content-Type': 'application/json' },
    });
    if (!res.ok) {
      const { message } = await res.json();
      throw new Error(message || 'Error updating payment');
    }
    const payment = await res.json();
    return payment;
  },

  async findByBookingId(bookingId: string): Promise<Payment> {
    const res = await fetch(`${BASE_URL}/${bookingId}`, {
      credentials: 'include',
    });
    if (!res.ok) {
      const { message } = await res.json();
      throw new Error(message || 'Error geting payment');
    }
    const data = await res.json();
    return data;
  },

  async getUserPayments(userId: string): Promise<Payment[]> {
    const res = await fetch(`${BASE_URL}?userId=${userId}`, {
      credentials: 'include',
    });
    if (!res.ok) {
      const { message } = await res.json();
      throw new Error(message || 'Error geting payments');
    }
    const data = await res.json();
    return data;
  },
};
