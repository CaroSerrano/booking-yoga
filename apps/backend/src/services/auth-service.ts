import {
  NotFoundError,
  ValidationError,
  type AuthService,
  type LoginPayload,
  type RegisterPayload,
} from 'booking-domain';
import { createHash, isValidPassword } from 'src/utils/auth.js';
import type { PrismaClient } from 'src/generated/prisma/index.js';

export class AuthServiceImplementation implements AuthService {
  prisma: PrismaClient;

  constructor(prisma: PrismaClient) {
    this.prisma = prisma;
  }
  async register(data: RegisterPayload) {
    const existingUser = await this.prisma.user.findUnique({
      where: { email: data.email },
    });
    if (existingUser) throw new ValidationError('User already exists');

    const hashedPassword = await createHash(data.password);
    await this.prisma.user.create({
      data: { ...data, password: hashedPassword },
    });
  }

  async login(data: LoginPayload) {
    const foundUser = await this.prisma.user.findUnique({
      where: { email: data.email },
    });
    if (!foundUser) {
      throw new NotFoundError('User not found');
    }
    if (!(await isValidPassword(foundUser, data.pass))) {
      throw new ValidationError('Invalid credentials');
    }
    const { password: _, ...safeUser } = foundUser;
    return safeUser;
  }
}
