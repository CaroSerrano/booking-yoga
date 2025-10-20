import { PrismaClient } from 'src/generated/prisma/index.js';
import type { PaymentService, Payment } from 'booking-domain';

export class PaymentServiceImplementation implements PaymentService {
  prisma: PrismaClient;

  constructor(prisma: PrismaClient) {
    this.prisma = prisma;
  }

  async findAll() {
    return this.prisma.payment.findMany();
  }

  async findById(id: string) {
    const payment = await this.prisma.payment.findUnique({ where: { id } });
    return payment ?? undefined;
  }

  async save(data: Payment) {
    await this.prisma.payment.create({ data });
  }

  async updateOne(id: string, data: Partial<Payment>) {
    const payment = await this.prisma.payment.update({
      where: { id },
      data,
    });
    return payment ?? undefined;
  }

  async delete(id: string) {
    this.prisma.payment.delete({ where: { id } });
  }

  async findByBookingId(bookingId: string) {
    const payment = await this.prisma.payment.findUnique({
      where: { bookingId },
    });

    return payment ?? undefined;
  }

  async findByUserId(userId: string) {
    return this.prisma.payment.findMany({ where: { userId } });
  }
}
