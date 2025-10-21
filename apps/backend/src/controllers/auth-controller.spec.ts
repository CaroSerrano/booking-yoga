import { describe, it, expect, vi, beforeEach } from 'vitest';
import { Role, UserStatus, type AuthDeps, type UserDeps } from 'booking-domain';
import type { Request, Response, NextFunction } from 'express';
import { registerSchema } from 'src/validations/auth-validations.js';

vi.mock('booking-domain', async () => {
  const mockRegister = vi.fn();
  const mockLogin = vi.fn();
  const actual = await vi.importActual<typeof import('booking-domain')>(
    'booking-domain'
  );
  return {
    ...actual,
    domainUseCases: {
      register: { useCase: mockRegister },
      login: { useCase: mockLogin },
    },
    __mocks__: {
      mockRegister,
      mockLogin,
    },
  };
});

vi.mock('jsonwebtoken', () => ({
  default: {
    sign: vi.fn(),
  },
}));

vi.mock('src/validations/auth-validations.js', () => ({
  loginSchema: {
    parse: vi.fn(),
  },
  registerSchema: {
    parse: vi.fn(),
  },
}));

describe('Auth Controllers', () => {
  let mockRequest: Partial<Request>;
  let mockResponse: Partial<Response>;
  let mockNext: NextFunction;
  let controller: any;
  let mocks: any;
  let jwt: any;

  beforeEach(async () => {
    vi.clearAllMocks();

    const module = await import('./auth-controller.js');
    const { authController } = module;

    const domainModule: any = await import('booking-domain');
    mocks = domainModule.__mocks__;

    jwt = (await import('jsonwebtoken')).default;

    const deps: AuthDeps = { userService: {} as any, hasher: {} as any };
    controller = authController(deps);

    mockRequest = {
      body: {},
    };

    mockResponse = {
      status: vi.fn().mockReturnThis(),
      json: vi.fn().mockReturnThis(),
    };

    mockNext = vi.fn();
  });

  describe('register', () => {
    it('debe registrar un usuario exitosamente', async () => {
      const registerData = {
        name: 'John Doe',
        email: 'john@example.com',
        phoneNumber: '+1234567890',
        password: 'password123',
        role: Role.USER,
      };

      mockRequest.body = registerData;
      await controller.register(
        mockRequest as Request,
        mockResponse as Response,
        mockNext
      );

      expect(registerSchema.parse).toHaveBeenCalledWith(registerData);
      expect(mockResponse.status).toHaveBeenCalledWith(201);
      expect(mockResponse.json).toHaveBeenCalledWith({
        message: 'User registered',
      });
      expect(mockNext).not.toHaveBeenCalled();
    });

    it('debe llamar a next con el error si la validación del schema falla', async () => {
      const validationError = new Error('Validation failed');
      mocks.mockRegister.mockRejectedValue(validationError);

      await controller.register(
        mockRequest as Request,
        mockResponse as Response,
        mockNext
      );

      expect(mockNext).toHaveBeenCalledWith(validationError);
      expect(mockResponse.status).not.toHaveBeenCalled();
    });
  });

  describe('Login', () => {
    it('debe hacer login exitosamente y retornar token y usuario', async () => {
      const loginData = {
        email: 'john@example.com',
        pass: 'password123',
      };

      const mockUser = {
        id: '123',
        name: 'John Doe',
        email: 'john@example.com',
        role: 'USER' as const,
        phoneNumber: '+1234567890',
        status: UserStatus.ACTIVE,
        createdAt: new Date(),
        updatedAt: new Date(),
      };

      const mockToken = 'jwt-token-123';

      mockRequest.body = loginData;
      jwt.sign.mockReturnValue(mockToken);
      mocks.mockLogin.mockResolvedValue(mockUser);
      await controller.login(
        mockRequest as Request,
        mockResponse as Response,
        mockNext
      );
      expect(jwt.sign).toHaveBeenCalledWith(
        { email: 'john@example.com', role: 'USER' },
        expect.any(String)
      );
      expect(mockResponse.status).toHaveBeenCalledWith(200);
      expect(mockResponse.json).toHaveBeenCalledWith({
        token: mockToken,
        user: mockUser,
      });
      expect(mockNext).not.toHaveBeenCalled();
    });

    it('debe llamar a next con el error si la validación del schema falla', async () => {
      const validationError = new Error('Validation failed');
      mocks.mockLogin.mockRejectedValue(validationError);

      await controller.login(
        mockRequest as Request,
        mockResponse as Response,
        mockNext
      );

      expect(mockNext).toHaveBeenCalledWith(validationError);
      expect(mockResponse.status).not.toHaveBeenCalled();
    });
  });
});
