import { PrismaClient } from 'src/generated/prisma/index.js';
import type { Booking, BookingService } from 'booking-domain';

export class BookingServiceImplementation implements BookingService {
  prisma: PrismaClient;

  constructor(prisma: PrismaClient) {
    this.prisma = prisma;
  }

  async findAll() {
    return this.prisma.booking.findMany();
  }

  async findById(id: string) {
    const classFound = await this.prisma.booking.findUnique({ where: { id } });
    return classFound ?? undefined;
  }

  async save(data: Booking) {
    await this.prisma.booking.create({ data });
  }

  async updateOne(id: string, data: Partial<Booking>) {
    const booking = await this.prisma.booking.update({
      where: { id },
      data,
    });
    return booking ?? undefined;
  }

  async delete(id: string) {
    this.prisma.booking.delete({ where: { id } });
  }

  async findByClassId(classId: string) {
    return this.prisma.booking.findMany({ where: { classId } });
  }

  async findByUserId(userId: string) {
    return this.prisma.booking.findMany({ where: { userId } });
  }

  async findByUserAndClass(classId: string, userId: string) {
    const booking = await this.prisma.booking.findFirst({
      where: {
        classId,
        userId,
      },
    });
    return booking ?? undefined;
  }
}
