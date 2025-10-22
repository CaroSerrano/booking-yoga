import {
  dataCleaner,
  domainUseCases,
  ValidationError,
  type ClassDeps,
} from 'booking-domain';
import type { NextFunction, Request, Response } from 'express';
import {
  createClassSchema,
  updateClassSchema,
} from 'src/validations/class-validations.js';

export const classController = (deps: ClassDeps) => ({
  createClass: async (req: Request, res: Response, next: NextFunction) => {
    try {
      const data = createClassSchema.parse(req.body);
      const cleanedData = dataCleaner(data);
      await domainUseCases.createClass.useCase(deps, cleanedData);
      res.status(201).json('Class created');
    } catch (error) {
      next(error);
    }
  },
  
  getClassDetails: async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { id } = req.params;
      if (!id) {
        throw new ValidationError('id is required');
      }
      const result = await domainUseCases.getClassDetails.useCase(deps, { id });
      res.status(200).json(result);
    } catch (error) {
      next(error);
    }
  },

  updateClass: async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { id } = req.params;
      if (!id) {
        throw new ValidationError('id is required');
      }
      const data = updateClassSchema.parse(req.body);
      const cleanedData = dataCleaner(data)
      const result = await domainUseCases.updateClass.useCase(deps, {
        id,
        ...cleanedData,
      });
      res.status(200).json(result);
    } catch (error) {
      next(error);
    }
  },

  getClasses: async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { location, title, teacherId, startDate } = req.query;

      if (!location && !title && !teacherId && !startDate) {
        throw new ValidationError('At least one filter is required');
      }

      const filters = {
        location: location ? String(location) : undefined,
        title: title ? String(title) : undefined,
        teacherId: teacherId ? String(teacherId) : undefined,
        startDate: startDate ? new Date(String(startDate)) : undefined,
      };
      const cleanedFilters = dataCleaner(filters);

      const result = await domainUseCases.getClasses.useCase(
        deps,
        cleanedFilters
      );

      res.status(200).json(result);
    } catch (error) {
      next(error);
    }
  },

  listAvailableClasses: async (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    try {
      const result = await domainUseCases.listAvailableClasses.useCase(deps);
      res.status(200).json(result);
    } catch (error) {
      next(error);
    }
  },
});
