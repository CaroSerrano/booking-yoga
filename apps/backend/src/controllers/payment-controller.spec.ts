import { describe, it, expect, vi, beforeEach } from 'vitest';
import type { Request, Response, NextFunction } from 'express';
import type { PaymentDeps } from './payment-controller.js';
import { PaymentStatus, ValidationError } from 'booking-domain';

vi.mock('booking-domain', async () => {
  const mockCreatePayment = vi.fn();
  const mockUpdatePayment = vi.fn();
  const mockListUserPayments = vi.fn();
  const mockGetBookingPayment = vi.fn();

  const actual = await vi.importActual<typeof import('booking-domain')>(
    'booking-domain'
  );
  return {
    ...actual,
    domainUseCases: {
      createPayment: { useCase: mockCreatePayment },
      updatePayment: { useCase: mockUpdatePayment },
      listUserPayments: { useCase: mockListUserPayments },
      listBookingPayments: { useCase: mockGetBookingPayment },
    },
    ValidationError: class ValidationError extends Error {},
    __mocks__: {
      mockCreatePayment,
      mockGetBookingPayment,
      mockListUserPayments,
      mockUpdatePayment,
    },
  };
});

vi.mock('src/validations/payment-validations.js', () => ({
  createPaymentSchema: {
    parse: vi.fn(),
  },
  updatePaymentSchema: {
    parse: vi.fn(),
  },
}));

describe('payment controller', () => {
  let mockRequest: Partial<Request>;
  let mockResponse: Partial<Response>;
  let mockNext: NextFunction;
  let controller: any;
  let mocks: any;

  beforeEach(async () => {
    vi.clearAllMocks();

    const module = await import('./payment-controller.js');
    const { paymentController } = module;

    const domainModule: any = await import('booking-domain');
    mocks = domainModule.__mocks__;

    const deps: PaymentDeps = {
      classService: {} as any,
      paymentService: {} as any,
      userService: {} as any,
      bookingService: {} as any,
    };
    controller = paymentController(deps);

    mockRequest = { body: {}, params: {}, query: {} };
    mockResponse = {
      status: vi.fn().mockReturnThis(),
      json: vi.fn().mockReturnThis(),
      end: vi.fn(),
    };
    mockNext = vi.fn();
  });

  describe('createPayment', () => {
    it('responde con 201 si puede crear el pago', async () => {
      const createPaymentData = {
        userId: '1',
        bookingId: '1',
        amount: 50,
        currency: 'usd',
        successUrl: 'http://localhost:3000/success',
        cancelUrl: 'http://localhost:3000/cancel',
      };
      mockRequest.body = createPaymentData;
      const { createPaymentSchema } = await import(
        'src/validations/payment-validations.js'
      );
      vi.mocked(createPaymentSchema.parse).mockReturnValue(createPaymentData);
      await controller.createPayment(
        mockRequest as Request,
        mockResponse as Response,
        mockNext
      );
      expect(mockResponse.status).toHaveBeenCalledWith(201);
      expect(mockNext).not.toHaveBeenCalled();
    });
    it('llama a next en caso de error', async () => {
      const error = new ValidationError('Invalid data');
      mocks.mockCreatePayment.mockRejectedValue(error);
      await controller.createPayment(
        mockRequest as Request,
        mockResponse as Response,
        mockNext
      );
      expect(mockNext).toHaveBeenCalledWith(error);
    });
  });

  describe('updatePayment', () => {
    it('responde con 200 y el pago actualizado', async () => {
      const updatePaymentData = {
        status: PaymentStatus.COMPLETED,
      };
      mockRequest.body = updatePaymentData;
      mockRequest.params = { id: '1' };
      const { updatePaymentSchema } = await import(
        'src/validations/payment-validations.js'
      );
      vi.mocked(updatePaymentSchema.parse).mockReturnValue(updatePaymentData);
      await controller.updatePayment(
        mockRequest as Request,
        mockResponse as Response,
        mockNext
      );
      expect(mockResponse.status).toHaveBeenCalledWith(200);
      expect(mockNext).not.toHaveBeenCalled();
    });
    it('llama a next en caso de error', async () => {
      const error = new ValidationError('id is required');
      mocks.mockUpdatePayment.mockRejectedValue(error);
      await controller.updatePayment(
        mockRequest as Request,
        mockResponse as Response,
        mockNext
      );
      expect(mockNext).toHaveBeenCalledWith(error);
    });
  });

  describe('getUserPayments', () => {
    it('responde con 200 y los pagos del usuario', async () => {
      const mockPayment = [{ id: '1', userId: '1' }];
      const params = { userId: '1' };
      mockRequest.query = params;
      mocks.mockListUserPayments.mockResolvedValue(mockPayment);
      await controller.listUserPayments(
        mockRequest as Request,
        mockResponse as Response,
        mockNext
      );
      expect(mockResponse.status).toHaveBeenCalledWith(200);
      expect(mockResponse.json).toHaveBeenCalledWith(mockPayment);
      expect(mockNext).not.toHaveBeenCalled();
    });
    it('llama a next en caso de error', async () => {
      const error = new ValidationError('userId is required');
      mocks.mockListUserPayments.mockRejectedValue(error);
      await controller.listUserPayments(
        mockRequest as Request,
        mockResponse as Response,
        mockNext
      );
      expect(mockNext).toHaveBeenCalledWith(error);
    });
  });

  describe('findBookingPayment', () => {
    it('responde con 200 y el pago encontrado', async () => {
      const params = { bookingId: '1' };
      const mockPayment = { id: '1', bookingId: '1' };
      mockRequest.params = params;
      mocks.mockGetBookingPayment.mockResolvedValue(mockPayment);
      await controller.findBookingPayment(
        mockRequest as Request,
        mockResponse as Response,
        mockNext
      );
      expect(mockResponse.status).toHaveBeenCalledWith(200);
      expect(mockResponse.json).toHaveBeenCalledWith(mockPayment);
      expect(mockNext).not.toHaveBeenCalled();
    });
    it('llama a next en caso de error', async () => {
      const error = new ValidationError('bookingId is required');
      mocks.mockGetBookingPayment.mockRejectedValue(error);
      await controller.findBookingPayment(
        mockRequest as Request,
        mockResponse as Response,
        mockNext
      );
      expect(mockNext).toHaveBeenCalledWith(error);
    });
  });
});
