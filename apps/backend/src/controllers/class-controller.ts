import {
  domainUseCases,
  NotFoundError,
  ValidationError,
  type ClassDeps,
  type UserService,
} from 'booking-domain';
import type { NextFunction, Request, Response } from 'express';
import {
  createClassSchema,
  updateClassSchema,
} from 'src/validations/class-validations.js';

export interface ClassControllerDeps extends ClassDeps {
  userService: UserService;
}

export const classController = (deps: ClassControllerDeps) => ({
  createClass: async (req: Request, res: Response, next: NextFunction) => {
    try {
      const data = createClassSchema.parse(req.body);
      const teacherFound = await domainUseCases.getUserById.useCase(
        { userService: deps.userService },
        { id: data.teacherId }
      );
      if (!teacherFound) {
        throw new NotFoundError('Teacher not found');
      }
      await domainUseCases.createClass.useCase(deps, data);
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
      const cleanedData = Object.fromEntries(
        Object.entries(data).filter(([_, v]) => v !== undefined)
      );
      const result = await domainUseCases.updateClass.useCase(deps, {
        id,
        ...cleanedData,
      });
      res.status(200).json(result);
    } catch (error) {
      next(error);
    }
  },

  deleteClass: async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { id } = req.params;
      if (!id) {
        throw new ValidationError('id is required');
      }
      await domainUseCases.deleteClass.useCase(deps, { id });
      res.status(204).end();
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
      const cleanedFilters = Object.fromEntries(
        Object.entries(filters).filter(([_, v]) => v !== undefined)
      );

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
