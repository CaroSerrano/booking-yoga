import { describe, it, expect, vi, beforeEach } from 'vitest';
import type { Request, Response, NextFunction } from 'express';
import { NotFoundError, ValidationError, type ClassDeps } from 'booking-domain';

vi.mock('booking-domain', async () => {
  const mockCreateClass = vi.fn();
  const mockGetClassDetails = vi.fn();
  const mockUpdateClass = vi.fn();
  const mockDeleteClass = vi.fn();
  const mockGetClasses = vi.fn();
  const mockListAvailableClasses = vi.fn();
  const mockGetUserById = vi.fn();
  const actual = await vi.importActual<typeof import('booking-domain')>(
    'booking-domain'
  );
  return {
    ...actual,
    domainUseCases: {
      createClass: { useCase: mockCreateClass },
      getClassDetails: { useCase: mockGetClassDetails },
      updateClass: { useCase: mockUpdateClass },
      getClasses: { useCase: mockGetClasses },
      listAvailableClasses: { useCase: mockListAvailableClasses },
      getUserById: {useCase: mockGetUserById}
    },
    ValidationError: class ValidationError extends Error {},
    __mocks__: {
      mockCreateClass,
      mockGetClassDetails,
      mockGetClasses,
      mockListAvailableClasses,
      mockUpdateClass,
    },
  };
});

vi.mock('src/validations/class-validations.js', () => ({
  createClassSchema: {
    parse: vi.fn(),
  },
  updateClassSchema: {
    parse: vi.fn(),
  },
}));

describe('classController', () => {
  let mockRequest: Partial<Request>;
  let mockResponse: Partial<Response>;
  let mockNext: NextFunction;
  let controller: any;
  let mocks: any;

  beforeEach(async () => {
    vi.clearAllMocks();

    const module = await import('./class-controller.js');
    const { classController } = module;

    const domainModule: any = await import('booking-domain');
    mocks = domainModule.__mocks__;

    const deps: ClassDeps = { classService: {} as any, userService: {} as any };
    controller = classController(deps);

    mockRequest = { body: {}, params: {}, query: {} };
    mockResponse = {
      status: vi.fn().mockReturnThis(),
      json: vi.fn().mockReturnThis(),
      end: vi.fn(),
    };
    mockNext = vi.fn();
  });

  describe('listAvailableClasses', () => {
    it('responde con 200 y la lista de las clases', async () => {
      const mockClasses = [{ id: '1', title: 'Hatha Yoga' }];
      mocks.mockListAvailableClasses.mockResolvedValue(mockClasses);

      await controller.listAvailableClasses(
        mockRequest as Request,
        mockResponse as Response,
        mockNext
      );

      expect(mockResponse.status).toHaveBeenCalledWith(200);
      expect(mockResponse.json).toHaveBeenCalledWith(mockClasses);
      expect(mockNext).not.toHaveBeenCalled();
    });
    it('llama a next en caso de error', async () => {
      const error = new Error('DB error');
      mocks.mockListAvailableClasses.mockRejectedValue(error);

      await controller.listAvailableClasses(
        mockRequest as Request,
        mockResponse as Response,
        mockNext
      );

      expect(mockNext).toHaveBeenCalledWith(error);
    });
  });

  describe('getClasses', () => {
    it('responde con 200 y las clases filtradas', async () => {
      const mockClasses = [{ id: '1', title: 'Hatha Yoga' }];
      const params = { title: 'Hatha Yoga' };
      mockRequest.query = params;
      mocks.mockGetClasses.mockResolvedValue(mockClasses);

      await controller.getClasses(
        mockRequest as Request,
        mockResponse as Response,
        mockNext
      );

      expect(mockResponse.status).toHaveBeenCalledWith(200);
      expect(mockResponse.json).toHaveBeenCalledWith(mockClasses);
      expect(mockNext).not.toHaveBeenCalled();
    });
    it('llama a next en caso de error', async () => {
      const error = new ValidationError('At least one filter is required');
      mocks.mockGetClasses.mockRejectedValue(error);

      await controller.getClasses(
        mockRequest as Request,
        mockResponse as Response,
        mockNext
      );

      expect(mockNext).toHaveBeenCalledWith(error);
    });
  });

  describe('createClase', () => {
    it('responde con 201 y crea una nueva clase', async () => {
      const createClassData = {
        title: 'Hatha Yoga',
        teacherId: '1',
        start: String(new Date('2025-05-02')),
        end: String(new Date('2025-05-02')),
        totalSlots: 12,
      };
      mockRequest.body = createClassData;
      const { createClassSchema } = await import(
        'src/validations/class-validations.js'
      );
      vi.mocked(createClassSchema.parse).mockReturnValue(createClassData);
      await controller.createClass(
        mockRequest as Request,
        mockResponse as Response,
        mockNext
      );
      expect(mockResponse.status).toHaveBeenCalledWith(201);
      expect(mockNext).not.toHaveBeenCalled();
    });
    it('llama a next en caso de error', async () => {
      const error = new NotFoundError('Teacher not found');
      mocks.mockCreateClass.mockRejectedValue(error);
      await controller.createClass(
        mockRequest as Request,
        mockResponse as Response,
        mockNext
      );
      expect(mockNext).toHaveBeenCalledWith(error);
    });
  });

  describe('updateClass', () => {
    it('responde con 200 y la clase actualizada', async () => {
      const updateClassData = {
        start: String(new Date('2025-05-08')),
        end: String(new Date('2025-05-08')),
      };
      mockRequest.body = updateClassData;
      mockRequest.params = { id: '1' };
      const { updateClassSchema } = await import(
        'src/validations/class-validations.js'
      );
      vi.mocked(updateClassSchema.parse).mockReturnValue(updateClassData);
      await controller.updateClass(
        mockRequest as Request,
        mockResponse as Response,
        mockNext
      );
      expect(mockResponse.status).toHaveBeenCalledWith(200);
      expect(mockNext).not.toHaveBeenCalled();
    });
    it('llama a next en caso de error', async () => {
      const error = new ValidationError('id is required');
      mocks.mockUpdateClass.mockRejectedValue(error);
      await controller.updateClass(
        mockRequest as Request,
        mockResponse as Response,
        mockNext
      );
      expect(mockNext).toHaveBeenCalledWith(error);
    });
  });

  describe('getClassDetails', async () => {
    it('Responde con 200 y la clase', async () => {
      const params = { id: '1' };
      mockRequest.params = params;
      await controller.getClassDetails(
        mockRequest as Request,
        mockResponse as Response,
        mockNext
      );
      expect(mockResponse.status).toHaveBeenCalledWith(200);

      expect(mockNext).not.toHaveBeenCalled();
    });
  });

});
