import {
  domainUseCases,
  ValidationError,
  type BookingDeps,
} from 'booking-domain';
import {
  createBookingSchema,
  updateBookingSchema,
} from 'src/validations/booking-validations.js';
import type { Request, Response, NextFunction } from 'express';
import { dataCleaner } from 'booking-domain';

export const bookingController = (deps: BookingDeps) => ({
  createBooking: async (req: Request, res: Response, next: NextFunction) => {
    try {
      const data = createBookingSchema.parse(req.body);
      await domainUseCases.createBooking.useCase(deps, data);
      res.status(201).json('Booking created');
    } catch (error) {
      next(error);
    }
  },
  updateBooking: async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { id } = req.params;
      if (!id) {
        throw new ValidationError('id is required');
      }
      const data = updateBookingSchema.parse(req.body);
      const cleanedData = dataCleaner(data);
      const result = await domainUseCases.updateBooking.useCase(
        {
          bookingService: deps.bookingService,
          classService: deps.classService,
        },
        { id, ...cleanedData }
      );
      res.status(200).json(result);
    } catch (error) {
      next(error);
    }
  },

  listBookingByFilters: async (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    try {
      const { userId, classId } = req.query;
      if (!userId && !classId) {
        throw new ValidationError('At least one filter is required');
      }
      const filters = {
        userId: userId ? String(userId) : undefined,
        classId: classId ? String(classId) : undefined,
      };
      const cleanedFilters = dataCleaner(filters);
      const result = await domainUseCases.listBookings.useCase(
        deps,
        cleanedFilters
      );
      res.status(200).json(result);
    } catch (error) {
      next(error);
    }
  },

  getBookingById: async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { id } = req.params;
      if (!id) {
        throw new ValidationError('id is required');
      }
      const result = await domainUseCases.getBookingById.useCase(
        { bookingService: deps.bookingService },
        { id }
      );
      res.status(200).json(result);
    } catch (error) {
      next(error);
    }
  },
});
