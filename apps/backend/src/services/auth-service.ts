import {
  NotFoundError,
  ValidationError,
  type AuthService,
  type LoginPayload,
  type RegisterPayload,
} from 'booking-domain';
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


    await this.prisma.user.create({
      data
    });
  }

  async login(data: LoginPayload) {
    const foundUser = await this.prisma.user.findUnique({
      where: { email: data.email },
    });
    if (!foundUser) {
      throw new NotFoundError('User not found');
    }
    const { password, ...safeUser } = foundUser;
    return safeUser;
  }
}
