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

export interface PaymentDeps extends CreatePaymentDeps, UpdatePaymentDeps {}

export const paymentController = (deps: PaymentDeps) => ({
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
      const result = await domainUseCases.listBookingPayments.useCase(deps, {
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
