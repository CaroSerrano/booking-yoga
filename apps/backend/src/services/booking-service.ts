import { PrismaClient } from 'src/generated/prisma/index.js';
import type { Booking, BookingFilters, BookingService } from 'booking-domain';

function toDomainClass(prismaClass: any): Booking {
  return {
    ...prismaClass,
    expiresAt: prismaClass.expiresAt ?? undefined,
    createdAt: prismaClass.createdAt ?? undefined,
    updatedAt: prismaClass.updatedAt ?? undefined,
  };
}
export class BookingServiceImplementation implements BookingService {
  prisma: PrismaClient;

  constructor(prisma: PrismaClient) {
    this.prisma = prisma;
  }

  async findAll() {
    return (await this.prisma.booking.findMany()).map(toDomainClass);
  }

  async findById(id: string) {
    const booking = await this.prisma.booking.findUnique({ where: { id } });
    if (!booking) return undefined;
    return toDomainClass(booking);
  }

  async save(data: Booking) {
    const booking = await this.prisma.booking.create({ data });
    const expiresAt = new Date(booking.createdAt.getTime() + 15 * 60 * 1000);

    await this.prisma.booking.update({
      where: { id: booking.id },
      data: { expiresAt },
    });
  }

  async updateOne(id: string, data: Partial<Booking>) {
    const booking = await this.prisma.booking.update({
      where: { id },
      data,
    });
    if (!booking) return undefined;
    return toDomainClass(booking);
  }

  async delete(id: string) {
    this.prisma.booking.delete({ where: { id } });
  }

  async findByFilters(filters: BookingFilters) {
    return (
      await this.prisma.booking.findMany({
        where: {
          ...(filters.userId && { userId: filters.userId }),
          ...(filters.classId && { classId: filters.classId }),
        },
      })
    ).map(toDomainClass);
  }

  async findByUserAndClass(classId: string, userId: string) {
    const booking = await this.prisma.booking.findFirst({
      where: {
        classId,
        userId,
      },
    });
    if (!booking) return undefined;
    return toDomainClass(booking);
  }
}
