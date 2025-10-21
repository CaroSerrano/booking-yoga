import { domainUseCases, ValidationError, type UserDeps } from 'booking-domain';
import type { NextFunction, Request, Response } from 'express';
import { updateUserSchema } from 'src/validations/user-validations.js';

export const userController = (deps: UserDeps) => ({
  listActiveUsers: async (req: Request, res: Response, next: NextFunction) => {
    try {
      const result = await domainUseCases.listActiveUsers.useCase(deps);
      res.status(200).json(result);
    } catch (error) {
      next(error);
    }
  },

  listAllUsers: async (req: Request, res: Response, next: NextFunction) => {
    try {
      const result = await domainUseCases.listAllUsers.useCase(deps);
      res.status(200).json(result);
    } catch (error) {
      next(error);
    }
  },
  listStudents: async (req: Request, res: Response, next: NextFunction) => {
    try {
      const result = await domainUseCases.listStudents.useCase(deps);
      res.status(200).json(result);
    } catch (error) {
      next(error);
    }
  },

  updateUser: async (req: Request, res: Response, next: NextFunction) => {
    try {
      if (!req.body) {
        throw new ValidationError('Missing data');
      }
      const { id } = req.params;
      if (!id) {
        throw new ValidationError('id is required');
      }

      const parsedData = updateUserSchema.parse(req.body);

      const dataToUpdate = { ...parsedData };

      const cleanedData = Object.fromEntries(
        Object.entries(dataToUpdate).filter(([_, v]) => v !== undefined)
      );

      const result = await domainUseCases.updateUser.useCase(deps, {
        id,
        ...cleanedData,
      });
      res.status(200).json(result);
    } catch (error) {
      next(error);
    }
  },

  deleteUser: async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { id } = req.params;
      if (!id) {
        throw new ValidationError('id is required');
      }
      await domainUseCases.deleteUser.useCase(deps, { id });
      res.status(204).end();
    } catch (error) {
      next(error);
    }
  },
});
