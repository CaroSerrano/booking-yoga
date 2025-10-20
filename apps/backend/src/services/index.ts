import prisma from '../client.js';

import { UserServiceImplementation } from './user-service.js';
import { ClassServiceImplementation } from './class-service.js';
import { BookingServiceImplementation } from './booking-service.js';
import { PaymentServiceImplementation } from './payment-service.js';
import { AuthServiceImplementation } from './auth-service.js';

export const userService = new UserServiceImplementation(prisma);
export const classService = new ClassServiceImplementation(prisma);
export const bookingService = new BookingServiceImplementation(prisma);
export const paymentService = new PaymentServiceImplementation(prisma);
export const authService = new AuthServiceImplementation(prisma);
