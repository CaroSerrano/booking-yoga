import express from 'express';
import type { Express } from 'express';
import authRouter from './auth-router.js';

const apiRouter = (app: Express) => {
  const router = express.Router();
  router.use('/api/auth', authRouter);
  app.use(router);
};

export default apiRouter;
