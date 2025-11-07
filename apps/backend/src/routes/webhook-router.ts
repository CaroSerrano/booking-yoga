import express from 'express';
import {
  paymentService,
  bookingService,
  classService,
  userService,
} from '../services/index.js';
import { webhookController } from '../controllers/webhook-controller.js';

const controller = webhookController({
  paymentService,
  bookingService,
  classService,
  userService,
});

const router = express.Router();

router.post(
  '/webhook',
  express.raw({ type: 'application/json' }),
  controller.webhook
);

export default router;
