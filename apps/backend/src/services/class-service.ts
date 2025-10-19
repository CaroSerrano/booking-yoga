import type { Class, ClassService } from 'booking-domain';
import { PrismaClient } from 'src/generated/prisma/index.js';

export class ClassServiceImplementation implements ClassService {
  prisma: PrismaClient;

  constructor(prisma: PrismaClient) {
    this.prisma = prisma;
  }

  async findAll() {
    return this.prisma.class.findMany();
  }

  async findAvailable() {
    return this.prisma.class.findMany({ where: { end: { gte: new Date() } } });
  }

  async findById(id: string) {
    const classFound = await this.prisma.class.findUnique({ where: { id } });
    return classFound ?? undefined;
  }

  async findByStartDate(date: Date) {
    const startOfDay = new Date(date);
    startOfDay.setHours(0, 0, 0, 0);

    const endOfDay = new Date(date);
    endOfDay.setHours(23, 59, 59, 999);
    const classFound = this.prisma.class.findMany({
      where: {
        start: {
          gte: startOfDay,
          lte: endOfDay,
        },
      },
      orderBy: { start: 'asc' },
    });
    return classFound ?? undefined;
  }

  async findByLocation(location: string) {
    return this.prisma.class.findMany({ where: { location } });
  }

  async findByTitle(title: string) {
    return this.prisma.class.findMany({ where: { title } });
  }

  async findByTeacher(teacherId: string) {
    return this.prisma.class.findMany({ where: { teacherId } });
  }

  async save(data: Class) {
    this.prisma.class.create({ data });
  }

  async updateOne(id: string, data: Partial<Class>) {
    const classUpdated = await this.prisma.class.update({
      where: { id },
      data,
    });
    return classUpdated ?? undefined;
  }

  async delete(id: string) {
    this.prisma.class.delete({ where: { id } });
  }
}
