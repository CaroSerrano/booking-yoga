import { describe, it, expect, vi, beforeEach } from 'vitest';
import type { Request, Response, NextFunction } from 'express';
import {
  BookingStatus,
  ValidationError,
  type BookingDeps,
} from 'booking-domain';

vi.mock('booking-domain', async () => {
  const mockCreateBooking = vi.fn();
  const mockListBookingByFilters = vi.fn();
  const mockUpdateBooking = vi.fn();
  const mockGetBookingById = vi.fn();

  const actual = await vi.importActual<typeof import('booking-domain')>(
    'booking-domain'
  );
  return {
    ...actual,
    domainUseCases: {
      createBooking: { useCase: mockCreateBooking },
      updateBooking: { useCase: mockUpdateBooking },
      getBookingById: { useCase: mockGetBookingById },
      listBookings: { useCase: mockListBookingByFilters },
    },
    ValidationError: class ValidationError extends Error {},
    __mocks__: {
      mockCreateBooking,
      mockGetBookingById,
      mockListBookingByFilters,
      mockUpdateBooking,
    },
  };
});

vi.mock('src/validations/booking-validations.js', () => ({
  createBookingSchema: {
    parse: vi.fn(),
  },
  updateBookingSchema: {
    parse: vi.fn(),
  },
}));

describe('Booking controller', () => {
  let mockRequest: Partial<Request>;
  let mockResponse: Partial<Response>;
  let mockNext: NextFunction;
  let controller: any;
  let mocks: any;

  beforeEach(async () => {
    vi.clearAllMocks();

    const module = await import('./booking-controller.js');
    const { bookingController } = module;

    const domainModule: any = await import('booking-domain');
    mocks = domainModule.__mocks__;

    const deps: BookingDeps = {
      classService: {} as any,
      bookingService: {} as any,
      userService: {} as any,
    };
    controller = bookingController(deps);

    mockRequest = { body: {}, params: {}, query: {} };
    mockResponse = {
      status: vi.fn().mockReturnThis(),
      json: vi.fn().mockReturnThis(),
      end: vi.fn(),
    };
    mockNext = vi.fn();
  });

  describe('createBooking', () => {
    it('responde con 201 y crea una reserva', async () => {
      const createBookingData = {
        userId: '1',
        classId: '1',
      };
      mockRequest.body = createBookingData;
      const { createBookingSchema } = await import(
        'src/validations/booking-validations.js'
      );
      vi.mocked(createBookingSchema.parse).mockReturnValue(createBookingData);
      await controller.createBooking(
        mockRequest as Request,
        mockResponse as Response,
        mockNext
      );
      expect(mockResponse.status).toHaveBeenCalledWith(201);
      expect(mockResponse.json).toHaveBeenCalledWith('Booking created');
      expect(mockNext).not.toHaveBeenCalled();
    });
    it('llama a next en caso de error', async () => {
      const error = new ValidationError('Invalid data');
      mocks.mockCreateBooking.mockRejectedValue(error);
      await controller.createBooking(
        mockRequest as Request,
        mockResponse as Response,
        mockNext
      );
      expect(mockNext).toHaveBeenCalledWith(error);
    });
  });

  describe('updateBooking', () => {
    it('responde con 200 si todo sale bien', async () => {
      const updateBookingData = {
        status: BookingStatus.CANCELLED,
      };
      mockRequest.body = updateBookingData;
      mockRequest.params = { id: '1' };
      const { updateBookingSchema } = await import(
        'src/validations/booking-validations.js'
      );
      vi.mocked(updateBookingSchema.parse).mockResolvedValue(updateBookingData);
      await controller.updateBooking(
        mockRequest as Request,
        mockResponse as Response,
        mockNext
      );
      expect(mockResponse.status).toHaveBeenCalledWith(200);
      expect(mockNext).not.toHaveBeenCalled();
    });
    it('llama a next en caso de error', async () => {
      const error = new ValidationError('id is required');
      mocks.mockUpdateBooking.mockRejectedValue(error);
      await controller.updateBooking(
        mockRequest as Request,
        mockResponse as Response,
        mockNext
      );
      expect(mockNext).toHaveBeenCalledWith(error);
    });
  });

  describe('listBookingsByFilters', () => {
    it('Responde con 200 y las reservas', async () => {
      const params = { userId: '1' };
      const mockBookings = [{ id: '1', userId: '1' }];
      mockRequest.query = params;
      mocks.mockListBookingByFilters.mockResolvedValue(mockBookings);
      await controller.listBookingByFilters(
        mockRequest as Request,
        mockResponse as Response,
        mockNext
      );
      expect(mockResponse.status).toHaveBeenCalledWith(200);
      expect(mockResponse.json).toHaveBeenCalledWith(mockBookings);
      expect(mockNext).not.toHaveBeenCalled();
    });
    it('llama a next en caso de error', async () => {
      const error = new ValidationError('At least one filter is required');
      mocks.mockListBookingByFilters.mockRejectedValue(error);
      await controller.listBookingByFilters(
        mockRequest as Request,
        mockResponse as Response,
        mockNext
      );
      expect(mockNext).toHaveBeenCalledWith(error);
    });
  });

  describe('getBookingById', () => {
    it('Responde con 200 si todo sale bien', async () => {
      const params = { id: '1' };
      mockRequest.params = params;
      await controller.getBookingById(
        mockRequest as Request,
        mockResponse as Response,
        mockNext
      );
      expect(mockResponse.status).toHaveBeenCalledWith(200);

      expect(mockNext).not.toHaveBeenCalled();
    });
    it('llama a next en caso de error', async () => {
      const error = new ValidationError('id is required');
      mocks.mockGetBookingById.mockRejectedValue(error);
      await controller.getBookingById(
        mockRequest as Request,
        mockResponse as Response,
        mockNext
      );
      expect(mockNext).toHaveBeenCalledWith(error);
    });
  });
});
