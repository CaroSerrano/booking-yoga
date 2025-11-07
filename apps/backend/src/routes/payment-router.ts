import express from 'express';
import { paymentController } from 'src/controllers/payment-controller.js';
import {
  paymentService,
  userService,
  bookingService,
  classService,
} from 'src/services/index.js';

const controller = paymentController({
  paymentService,
  userService,
  bookingService,
  classService,
});

const router = express.Router();

router.get('/', controller.listUserPayments);
router.get('/bookingId', controller.findBookingPayment);
router.post('/', controller.createPayment);
router.patch('/:id', controller.updatePayment);
router.post('/create-checkout-session', controller.createCheckoutSession);

export default router;
