import type { Class, ClassService, Filters } from 'booking-domain';
import { PrismaClient } from 'src/generated/prisma/index.js';

function toDomainClass(prismaClass: any): Class {
  return {
    ...prismaClass,
    description: prismaClass.description ?? undefined,
    location: prismaClass.location ?? undefined,
    address: prismaClass.address ?? undefined,
  };
}

export class ClassServiceImplementation implements ClassService {
  prisma: PrismaClient;

  constructor(prisma: PrismaClient) {
    this.prisma = prisma;
  }

  async findAll() {
    return (await this.prisma.class.findMany()).map(toDomainClass);
  }

  async findAvailable() {
    return (
      await this.prisma.class.findMany({ where: { end: { gte: new Date() } } })
    ).map(toDomainClass);
  }

  async findById(id: string) {
    const classFound = await this.prisma.class.findUnique({ where: { id } });
    if (!classFound) return undefined;
    return toDomainClass(classFound);
  }

  async findByFilters(filters: Filters) {
    return (
      await this.prisma.class.findMany({
        where: {
          ...(filters.location && { location: filters.location }),
          ...(filters.title && {
            title: { contains: filters.title, mode: 'insensitive' },
          }),
          ...(filters.teacherId && { teacherId: filters.teacherId }),
          ...(filters.startDate && { start: filters.startDate }),
        },
      })
    ).map(toDomainClass);
  }

  async save(data: Class) {
    await this.prisma.class.create({ data });
  }

  async updateOne(id: string, data: Partial<Class>) {
    const classUpdated = await this.prisma.class.update({
      where: { id },
      data,
    });
    if (!classUpdated) return undefined;
    return toDomainClass(classUpdated);
  }

  async delete(id: string) {
    await this.prisma.class.delete({ where: { id } });
  }
}
