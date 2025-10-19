import { describe, it, expect, vi, beforeEach } from 'vitest';
import { registerController, loginController } from './auth-controller.js';
import { userService } from 'src/services/index.js';
import {
  login,
  register,
  Role,
  UserStatus,
} from 'booking-domain';
import { createHash, isValidPassword } from 'src/utils/auth.js';
import jwt from 'jsonwebtoken';
import type { Request, Response, NextFunction } from 'express';

vi.mock('src/services/index.js', () => ({
  userService: {
    findByEmail: vi.fn(),
    save: vi.fn(),
  },
}));

vi.mock('booking-domain', async () => {
  const actual = await vi.importActual('booking-domain');
  return {
    ...actual,
    login: vi.fn(),
    register: vi.fn(),
  };
});

vi.mock('src/utils/auth.js', () => ({
  createHash: vi.fn(),
  isValidPassword: vi.fn(),
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

      const hashedPassword = 'hashedPassword123';

      mockRequest.body = registerData;

      const { registerSchema } = await import(
        'src/validations/auth-validations.js'
      );
      vi.mocked(registerSchema.parse).mockReturnValue(registerData);
      vi.mocked(createHash).mockResolvedValue(hashedPassword);
      vi.mocked(register).mockResolvedValue(undefined);

      await registerController(
        mockRequest as Request,
        mockResponse as Response,
        mockNext
      );

      expect(registerSchema.parse).toHaveBeenCalledWith(registerData);
      expect(createHash).toHaveBeenCalledWith(registerData.password);
      expect(register).toHaveBeenCalledWith(
        { userService },
        {
          ...registerData,
          password: hashedPassword,
        }
      );
      expect(mockResponse.status).toHaveBeenCalledWith(201);
      expect(mockResponse.json).toHaveBeenCalledWith({
        message: 'User registered',
      });
      expect(mockNext).not.toHaveBeenCalled();
    });

    it('debe usar Role.USER por defecto si no se proporciona role', async () => {
      const registerData = {
        name: 'John Doe',
        email: 'john@example.com',
        phoneNumber: '+1234567890',
        password: 'password123',
      };

      const hashedPassword = 'hashedPassword123';

      mockRequest.body = registerData;

      const { registerSchema } = await import(
        'src/validations/auth-validations.js'
      );
      vi.mocked(registerSchema.parse).mockReturnValue(registerData);
      vi.mocked(createHash).mockResolvedValue(hashedPassword);
      vi.mocked(register).mockResolvedValue(undefined);

      await registerController(
        mockRequest as Request,
        mockResponse as Response,
        mockNext
      );

      expect(register).toHaveBeenCalledWith(
        { userService },
        {
          ...registerData,
          role: Role.USER,
          password: hashedPassword,
        }
      );
    });

    it('debe llamar a next con el error si la validación falla', async () => {
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

    it('debe llamar a next con el error si register falla', async () => {
      const registerData = {
        name: 'John Doe',
        email: 'john@example.com',
        phoneNumber: '+1234567890',
        password: 'password123',
      };

      const registerError = new Error('User already registered');
      mockRequest.body = registerData;

      const { registerSchema } = await import(
        'src/validations/auth-validations.js'
      );
      vi.mocked(registerSchema.parse).mockReturnValue(registerData);
      vi.mocked(createHash).mockResolvedValue('hashedPassword');
      vi.mocked(register).mockRejectedValue(registerError);

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
    it('debe hacer login exitosamente y retornar token', async () => {
      const loginData = {
        email: 'john@example.com',
        pass: 'password123',
      };

      const mockUser = {
        id: '123',
        name: 'John Doe',
        email: 'john@example.com',
        password: 'hashedPassword',
        role: Role.USER,
        phoneNumber: '+1234567890',
        status: UserStatus.ACTIVE,
        createdAt: expect.any(Date),
        updatedAt: expect.any(Date),
      };

      const mockToken = 'jwt-token-123';

      mockRequest.body = loginData;

      const { loginSchema } = await import(
        'src/validations/auth-validations.js'
      );
      vi.mocked(loginSchema.parse).mockReturnValue(loginData);
      vi.mocked(login).mockResolvedValue(mockUser);
      vi.mocked(isValidPassword).mockResolvedValue(true);
      vi.mocked(jwt.sign).mockReturnValue(mockToken as any);

      await loginController(
        mockRequest as Request,
        mockResponse as Response,
        mockNext
      );

      expect(loginSchema.parse).toHaveBeenCalledWith(loginData);
      expect(login).toHaveBeenCalledWith({ userService }, loginData);
      expect(isValidPassword).toHaveBeenCalledWith(mockUser, loginData.pass);
      expect(jwt.sign).toHaveBeenCalledWith(
        { email: mockUser.email, role: mockUser.role },
        expect.any(String)
      );
      expect(mockResponse.status).toHaveBeenCalledWith(201);
      expect(mockResponse.json).toHaveBeenCalledWith({
        token: mockToken,
        safeUser: {
          id: mockUser.id,
          name: mockUser.name,
          email: mockUser.email,
          role: mockUser.role,
          phoneNumber: mockUser.phoneNumber,
          status: mockUser.status,
          createdAt: mockUser.createdAt,
          updatedAt: mockUser.updatedAt,
        },
      });
      expect(mockNext).not.toHaveBeenCalled();
    });

    it('debe lanzar ValidationError si la contraseña es inválida', async () => {
      const loginData = {
        email: 'john@example.com',
        pass: 'wrongpassword',
      };

      const mockUser = {
        id: '123',
        name: 'John Doe',
        email: 'john@example.com',
        password: 'hashedPassword',
        role: Role.USER,
        phoneNumber: '+1234567890',
        status: UserStatus.ACTIVE,
        createdAt: expect.any(Date),
        updatedAt: expect.any(Date),
      };

      mockRequest.body = loginData;

      const { loginSchema } = await import(
        'src/validations/auth-validations.js'
      );
      vi.mocked(loginSchema.parse).mockReturnValue(loginData);
      vi.mocked(login).mockResolvedValue(mockUser);
      vi.mocked(isValidPassword).mockResolvedValue(false);

      await loginController(
        mockRequest as Request,
        mockResponse as Response,
        mockNext
      );

      expect(mockNext).toHaveBeenCalledWith(
        expect.objectContaining({
          message: 'Invalid credentials',
        })
      );
      expect(mockResponse.status).not.toHaveBeenCalled();
    });

    it('debe llamar a next con el error si la validación falla', async () => {
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

    it('debe llamar a next con el error si login falla', async () => {
      const loginData = {
        email: 'john@example.com',
        pass: 'password123',
      };

      const loginError = new Error('User not found');
      mockRequest.body = loginData;

      const { loginSchema } = await import(
        'src/validations/auth-validations.js'
      );
      vi.mocked(loginSchema.parse).mockReturnValue(loginData);
      vi.mocked(login).mockRejectedValue(loginError);

      await loginController(
        mockRequest as Request,
        mockResponse as Response,
        mockNext
      );

      expect(mockNext).toHaveBeenCalledWith(loginError);
      expect(mockResponse.status).not.toHaveBeenCalled();
    });
  });
});
