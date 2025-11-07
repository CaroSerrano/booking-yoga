import type { NextFunction, Request, Response } from 'express';
import Stripe from 'stripe';
import { stripe, type PaymentDeps } from './payment-controller.js';
import { domainUseCases, PaymentStatus, ValidationError } from 'booking-domain';
import type { CheckoutSession } from 'src/validations/payment-validations.js';

const endpointSecret = process.env.STRIPE_WEBHOOK_SECRET;

export const webhookController = (deps: PaymentDeps) => ({
  webhook: async (req: Request, res: Response, next: NextFunction) => {
    try {
      let event: Stripe.Event;
      if (endpointSecret) {
        const sig = req.headers['stripe-signature']!;
        event = stripe.webhooks.constructEvent(req.body, sig, endpointSecret);

        if (event.type === 'checkout.session.completed') {
          const session = event.data.object as Stripe.Checkout.Session;
          handleCheckoutSessionCompleted(deps, session);
        }
        res.send();
      }
    } catch (error) {
      next(error);
    }
  },
});

async function handleCheckoutSessionCompleted(
  deps: PaymentDeps,
  session: CheckoutSession
) {
  const bookingId = session.metadata?.bookingId;
  if (!bookingId)
    throw new ValidationError('bookingId missing in session metadata');
  const payment = await domainUseCases.getBookingPayment.useCase(deps, {
    bookingId,
  });
  if (!payment) throw new ValidationError('Error geting payment');
  await domainUseCases.updatePayment.useCase(deps, {
    id: payment.id,
    status: PaymentStatus.COMPLETED,
  });
}
