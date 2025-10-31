import type { User, UserService } from 'booking-domain';
import { PrismaClient } from 'src/generated/prisma/index.js';

export class UserServiceImplementation implements UserService {
  prisma: PrismaClient;

  constructor(prisma: PrismaClient) {
    this.prisma = prisma;
  }

  async findAll() {
    return this.prisma.user.findMany();
  }

  async findActive() {
    return this.prisma.user.findMany({ where: { status: 'ACTIVE' } });
  }

  async findStudents() {
    return this.prisma.user.findMany({ where: { role: 'USER' } });
  }

  async findTeachers() {
    return this.prisma.user.findMany({ where: { role: 'ADMIN' } });
  }

  async findById(id: string) {
    const user = await this.prisma.user.findUnique({
      where: { id },
    });
    return user ?? undefined;
  }

  async findByEmail(email: string) {
    const user = await this.prisma.user.findUnique({ where: { email } });
    return user ?? undefined;
  }

  async save(data: User) {
    await this.prisma.user.create({ data });
  }

  async updateOne(id: string, data: Partial<User>) {
    const user = await this.prisma.user.update({ where: { id }, data });
    return user ?? undefined;
  }

  async delete(id: string) {
    this.prisma.user.delete({ where: { id } });
  }
}
