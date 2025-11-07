import {
  domainUseCases,
  NotFoundError,
  ValidationError,
  type CreatePaymentDeps,
  type UpdatePaymentDeps,
} from 'booking-domain';
import {
  createPaymentSchema,
  updatePaymentSchema,
} from 'src/validations/payment-validations.js';
import type { NextFunction, Request, Response } from 'express';
import Stripe from 'stripe';

export const stripe = new Stripe(process.env.STRIPE_SECRET!);

export interface PaymentDeps extends CreatePaymentDeps, UpdatePaymentDeps {}

export const paymentController = (deps: PaymentDeps) => ({
  createCheckoutSession: async (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    try {
      const data = createPaymentSchema.parse(req.body);
      const userEmail = req.user.email;
      const session = await stripe.checkout.sessions.create({
        client_reference_id: data.userId,
        customer_email: userEmail,
        line_items: [
          {
            price_data: {
              product_data: {
                name: 'Yoga class reservation at Yoga Studio',
                unit_label: 'class',
              },
              currency: data.currency,
              unit_amount_decimal: String(data.amount * 100),
            },
            quantity: 1,
          },
        ],
        metadata: { bookingId: data.bookingId },
        mode: 'payment',
        success_url: data.successUrl,
        cancel_url: data.cancelUrl,
      });
      await domainUseCases.createPayment.useCase(deps, data);
      res.status(201).json(session);
    } catch (error) {
      next(error);
    }
  },

  createPayment: async (req: Request, res: Response, next: NextFunction) => {
    try {
      const data = createPaymentSchema.parse(req.body);
      await domainUseCases.createPayment.useCase(deps, data);
      res.status(201).json('Payment created');
    } catch (error) {
      next(error);
    }
  },
  updatePayment: async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { id } = req.params;
      if (!id) {
        throw new ValidationError('id is required');
      }
      const data = updatePaymentSchema.parse(req.body);
      const result = await domainUseCases.updatePayment.useCase(deps, {
        id,
        ...data,
      });
      res.status(200).json(result);
    } catch (error) {
      next(error);
    }
  },
  listUserPayments: async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { userId } = req.query;
      if (!userId) {
        throw new ValidationError('userId is required');
      }
      const result = await domainUseCases.listUserPayments.useCase(
        {
          paymentService: deps.paymentService,
        },
        {
          userId: String(userId),
        }
      );
      res.status(200).json(result);
    } catch (error) {
      next(error);
    }
  },
  findBookingPayment: async (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    try {
      const { bookingId } = req.params;
      if (!bookingId) {
        throw new ValidationError('bookingId is required');
      }
      const result = await domainUseCases.getBookingPayment.useCase(deps, {
        bookingId: String(bookingId),
      });
      if (!result) {
        throw new NotFoundError('Payment not found');
      }
      res.status(200).json(result);
    } catch (error) {
      next(error);
    }
  },
});
