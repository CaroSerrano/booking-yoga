import type { Class, ClassService, Filters } from 'booking-domain';
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

  async findByFilters(filters: Filters) {
    return this.prisma.class.findMany({
      where: {
        ...(filters.location && { location: filters.location }),
        ...(filters.title && {
          title: { contains: filters.title, mode: 'insensitive' },
        }),
        ...(filters.teacherId && { teacherId: filters.teacherId }),
        ...(filters.startDate && { start: filters.startDate }),
      },
    });
  }

  async save(data: Class) {
    await this.prisma.class.create({ data });
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
