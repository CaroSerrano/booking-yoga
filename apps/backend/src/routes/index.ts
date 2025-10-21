import express from 'express';
import type { Express } from 'express';
import authRouter from './auth-router.js';
import userRouter from './user-router.js';
import classRouter from './class-router.js';
import bookingRouter from './booking-router.js';
import paymentRouter from './payment-router.js';

const apiRouter = (app: Express) => {
  const router = express.Router();
  router.use('/api/auth', authRouter);
  router.use('/api/user', userRouter);
  router.use('/api/class', classRouter);
  router.use('/api/booking', bookingRouter);
  router.use('/api/payment', paymentRouter);
  app.use(router);
};

export default apiRouter;
