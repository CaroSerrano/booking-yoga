import { describe, it, expect, vi, beforeEach } from 'vitest';
import { registerController, loginController } from './auth-controller.js';
import { authService } from 'src/services/index.js';
import { Role, UserStatus } from 'booking-domain';
import jwt from 'jsonwebtoken';
import type { Request, Response, NextFunction } from 'express';

// Mock de dependencias
vi.mock('src/services/index.js', () => ({
  authService: {
    register: vi.fn(),
    login: vi.fn(),
  },
}));

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

  beforeEach(() => {
    vi.clearAllMocks();

    mockRequest = {
      body: {},
    };

    mockResponse = {
      status: vi.fn().mockReturnThis(),
      json: vi.fn().mockReturnThis(),
    };

    mockNext = vi.fn();
  });

  describe('registerController', () => {
    it('debe registrar un usuario exitosamente', async () => {
      const registerData = {
        name: 'John Doe',
        email: 'john@example.com',
        phoneNumber: '+1234567890',
        password: 'password123',
        role: Role.USER,
      };

      mockRequest.body = registerData;

      const { registerSchema } = await import(
        'src/validations/auth-validations.js'
      );
      vi.mocked(registerSchema.parse).mockReturnValue(registerData);
      vi.mocked(authService.register).mockResolvedValue(undefined);

      await registerController(
        mockRequest as Request,
        mockResponse as Response,
        mockNext
      );

      expect(registerSchema.parse).toHaveBeenCalledWith(registerData);
      expect(authService.register).toHaveBeenCalledWith(registerData);
      expect(mockResponse.status).toHaveBeenCalledWith(201);
      expect(mockResponse.json).toHaveBeenCalledWith({
        message: 'User registered',
      });
      expect(mockNext).not.toHaveBeenCalled();
    });

    it('debe llamar a next con el error si la validación del schema falla', async () => {
      const validationError = new Error('Validation failed');
      mockRequest.body = { invalid: 'data' };

      const { registerSchema } = await import(
        'src/validations/auth-validations.js'
      );
      vi.mocked(registerSchema.parse).mockImplementation(() => {
        throw validationError;
      });

      await registerController(
        mockRequest as Request,
        mockResponse as Response,
        mockNext
      );

      expect(mockNext).toHaveBeenCalledWith(validationError);
      expect(mockResponse.status).not.toHaveBeenCalled();
    });

    it('debe llamar a next con el error si authService.register falla', async () => {
      const registerData = {
        name: 'John Doe',
        email: 'john@example.com',
        phoneNumber: '+1234567890',
        password: 'password123',
        role: Role.USER,
      };

      const registerError = new Error('User already registered');
      mockRequest.body = registerData;

      const { registerSchema } = await import(
        'src/validations/auth-validations.js'
      );
      vi.mocked(registerSchema.parse).mockReturnValue(registerData);
      vi.mocked(authService.register).mockRejectedValue(registerError);

      await registerController(
        mockRequest as Request,
        mockResponse as Response,
        mockNext
      );

      expect(mockNext).toHaveBeenCalledWith(registerError);
      expect(mockResponse.status).not.toHaveBeenCalled();
    });
  });

  describe('loginController', () => {
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

      const { loginSchema } = await import(
        'src/validations/auth-validations.js'
      );
      vi.mocked(loginSchema.parse).mockReturnValue(loginData);
      vi.mocked(authService.login).mockResolvedValue(mockUser);
      vi.mocked(jwt.sign).mockReturnValue(mockToken as any);

      await loginController(
        mockRequest as Request,
        mockResponse as Response,
        mockNext
      );

      expect(loginSchema.parse).toHaveBeenCalledWith(loginData);
      expect(authService.login).toHaveBeenCalledWith(loginData);
      expect(jwt.sign).toHaveBeenCalledWith(
        { email: mockUser.email, role: mockUser.role },
        expect.any(String)
      );
      expect(mockResponse.status).toHaveBeenCalledWith(201);
      expect(mockResponse.json).toHaveBeenCalledWith({
        token: mockToken,
        user: mockUser,
      });
      expect(mockNext).not.toHaveBeenCalled();
    });

    it('debe llamar a next con el error si la validación del schema falla', async () => {
      const validationError = new Error('Validation failed');
      mockRequest.body = { invalid: 'data' };

      const { loginSchema } = await import(
        'src/validations/auth-validations.js'
      );
      vi.mocked(loginSchema.parse).mockImplementation(() => {
        throw validationError;
      });

      await loginController(
        mockRequest as Request,
        mockResponse as Response,
        mockNext
      );

      expect(mockNext).toHaveBeenCalledWith(validationError);
      expect(mockResponse.status).not.toHaveBeenCalled();
    });

    it('debe llamar a next con el error si authService.login falla', async () => {
      const loginData = {
        email: 'john@example.com',
        pass: 'password123',
      };

      const loginError = new Error('Invalid credentials');
      mockRequest.body = loginData;

      const { loginSchema } = await import(
        'src/validations/auth-validations.js'
      );
      vi.mocked(loginSchema.parse).mockReturnValue(loginData);
      vi.mocked(authService.login).mockRejectedValue(loginError);

      await loginController(
        mockRequest as Request,
        mockResponse as Response,
        mockNext
      );

      expect(mockNext).toHaveBeenCalledWith(loginError);
      expect(mockResponse.status).not.toHaveBeenCalled();
    });

    it('debe generar un token JWT con email y role del usuario', async () => {
      const loginData = {
        email: 'admin@example.com',
        pass: 'password123',
      };

      const mockUser = {
        id: '456',
        name: 'Admin User',
        email: 'admin@example.com',
        role: 'ADMIN' as const,
        phoneNumber: '+9876543210',
        status: UserStatus.ACTIVE,
        createdAt: new Date(),
        updatedAt: new Date(),
      };

      const mockToken = 'admin-jwt-token';

      mockRequest.body = loginData;

      const { loginSchema } = await import(
        'src/validations/auth-validations.js'
      );
      vi.mocked(loginSchema.parse).mockReturnValue(loginData);
      vi.mocked(authService.login).mockResolvedValue(mockUser);
      vi.mocked(jwt.sign).mockReturnValue(mockToken as any);

      await loginController(
        mockRequest as Request,
        mockResponse as Response,
        mockNext
      );

      expect(jwt.sign).toHaveBeenCalledWith(
        { email: 'admin@example.com', role: 'ADMIN' },
        expect.any(String)
      );
      expect(mockResponse.json).toHaveBeenCalledWith({
        token: mockToken,
        user: mockUser,
      });
    });
  });
});
