import { describe, it, expect, vi, beforeEach } from 'vitest';
import type { Request, Response, NextFunction } from 'express';
import { UserStatus, ValidationError, type UserDeps } from 'booking-domain';

vi.mock('booking-domain', async () => {
  const mockListAllUsers = vi.fn();
  const mockListActiveUsers = vi.fn();
  const mockListStudents = vi.fn();
  const mockUpdateUser = vi.fn();
  const mockDeleteUser = vi.fn();
  const actual = await vi.importActual<typeof import('booking-domain')>(
    'booking-domain'
  );
  return {
    ...actual,
    domainUseCases: {
      listAllUsers: { useCase: mockListAllUsers },
      listActiveUsers: { useCase: mockListActiveUsers },
      listStudents: { useCase: mockListStudents },
      updateUser: { useCase: mockUpdateUser },
      deleteUser: { useCase: mockDeleteUser },
    },
    ValidationError: class ValidationError extends Error {},
    __mocks__: {
      mockListAllUsers,
      mockListActiveUsers,
      mockListStudents,
      mockUpdateUser,
      mockDeleteUser,
    },
  };
});

vi.mock('src/validations/user-validations.js', () => ({
  updateUserSchema: {
    parse: vi.fn(),
  },
}));

describe('userController', () => {
  let mockRequest: Partial<Request>;
  let mockResponse: Partial<Response>;
  let mockNext: NextFunction;
  let controller: any;
  let mocks: any;

  beforeEach(async () => {
    vi.clearAllMocks();

    const module = await import('./user-controller.js');
    const { userController } = module;

    const domainModule: any = await import('booking-domain');
    mocks = domainModule.__mocks__;

    const deps: UserDeps = { userService: {} as any };
    controller = userController(deps);

    mockRequest = { body: {}, params: {} };
    mockResponse = {
      status: vi.fn().mockReturnThis(),
      json: vi.fn().mockReturnThis(),
      end: vi.fn(),
    };
    mockNext = vi.fn();
  });

  describe('listAllUsers', () => {
    it('responde con 200 y la lista de usuarios', async () => {
      const mockUsers = [{ id: 1, name: 'Alice' }];
      mocks.mockListAllUsers.mockResolvedValue(mockUsers);

      await controller.listAllUsers(
        mockRequest as Request,
        mockResponse as Response,
        mockNext
      );

      expect(mockResponse.status).toHaveBeenCalledWith(200);
      expect(mockResponse.json).toHaveBeenCalledWith(mockUsers);
      expect(mockNext).not.toHaveBeenCalled();
    });

    it('llama a next en caso de error', async () => {
      const error = new Error('DB error');
      mocks.mockListAllUsers.mockRejectedValue(error);

      await controller.listAllUsers(
        mockRequest as Request,
        mockResponse as Response,
        mockNext
      );

      expect(mockNext).toHaveBeenCalledWith(error);
    });
  });

  describe('listActiveUsers', () => {
    it('responde con 200 y la lista de usuarios', async () => {
      const mockUsers = [{ id: 1, name: 'Alice' }];
      mocks.mockListActiveUsers.mockResolvedValue(mockUsers);

      await controller.listActiveUsers(
        mockRequest as Request,
        mockResponse as Response,
        mockNext
      );

      expect(mockResponse.status).toHaveBeenCalledWith(200);
      expect(mockResponse.json).toHaveBeenCalledWith(mockUsers);
      expect(mockNext).not.toHaveBeenCalled();
    });

    it('llama a next en caso de error', async () => {
      const error = new Error('DB error');
      mocks.mockListActiveUsers.mockRejectedValue(error);

      await controller.listActiveUsers(
        mockRequest as Request,
        mockResponse as Response,
        mockNext
      );

      expect(mockNext).toHaveBeenCalledWith(error);
    });
  });

  describe('listStudents', () => {
    it('responde con 200 y la lista de usuarios', async () => {
      const mockUsers = [{ id: 1, name: 'Alice' }];
      mocks.mockListStudents.mockResolvedValue(mockUsers);

      await controller.listStudents(
        mockRequest as Request,
        mockResponse as Response,
        mockNext
      );

      expect(mockResponse.status).toHaveBeenCalledWith(200);
      expect(mockResponse.json).toHaveBeenCalledWith(mockUsers);
      expect(mockNext).not.toHaveBeenCalled();
    });

    it('llama a next en caso de error', async () => {
      const error = new Error('DB error');
      mocks.mockListStudents.mockRejectedValue(error);

      await controller.listStudents(
        mockRequest as Request,
        mockResponse as Response,
        mockNext
      );

      expect(mockNext).toHaveBeenCalledWith(error);
    });
  });

  describe('updateUser', () => {
    it('debe actualizar un usuario correctamente y responder con codigo 200 ', async () => {
      const updateData = { name: 'Alice' };
      const params = { id: '1' };
      mockRequest.params = params;
      mockRequest.body = updateData;
      const mockUser = {
        id: '1',
        name: 'Alice',
        email: 'alice@example.com',
        role: 'USER' as const,
        phoneNumber: '+1234567890',
        status: UserStatus.ACTIVE,
        createdAt: new Date(),
        updatedAt: new Date(),
      };
      mocks.mockUpdateUser.mockResolvedValue(mockUser);

      await controller.updateUser(
        mockRequest as Request,
        mockResponse as Response,
        mockNext
      );

      expect(mockResponse.status).toHaveBeenCalledWith(200);
      expect(mockResponse.json).toHaveBeenCalledWith(mockUser);
      expect(mockNext).not.toHaveBeenCalled();
    });

    it('llama a next en caso de error', async () => {
      const error = new ValidationError('id is required');
      mocks.mockUpdateUser.mockRejectedValue(error);

      await controller.updateUser(
        mockRequest as Request,
        mockResponse as Response,
        mockNext
      );

      expect(mockNext).toHaveBeenCalledWith(error);
    });
  });

  describe('deleteUser', () => {
    it('debe eliminar un usuario y responder con codigo 204', async () => {
      const params = { id: '1' };
      mockRequest.params = params;
      await controller.deleteUser(
        mockRequest as Request,
        mockResponse as Response,
        mockNext
      );
      expect(mockResponse.status).toHaveBeenCalledWith(204);
      expect(mockNext).not.toHaveBeenCalled();
    });

    it('llama a next en caso de error', async () => {
      const error = new ValidationError('id is required');
      mocks.mockDeleteUser.mockRejectedValue(error);

      await controller.deleteUser(
        mockRequest as Request,
        mockResponse as Response,
        mockNext
      );

      expect(mockNext).toHaveBeenCalledWith(error);
    });
  });
});
