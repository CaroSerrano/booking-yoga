import express from 'express';
import type { Express } from 'express';
import authRouter from './auth-router.js';
import userRouter from './user-router.js';
import classRouter from './class-router.js';
import bookingRouter from './booking-router.js';
import paymentRouter from './payment-router.js';
import { authMiddleware } from 'src/middlewares/auth.middleware.js';

const apiRouter = (app: Express) => {
  const router = express.Router();
  router.use('/api/auth', authRouter);
  router.use('/api/user', authMiddleware, userRouter);
  router.use('/api/class', authMiddleware, classRouter);
  router.use('/api/booking', authMiddleware, bookingRouter);
  router.use('/api/payment', authMiddleware, paymentRouter);
  app.use(router);
};

export default apiRouter;
