import express from 'express';
import { bookingController } from '../controllers/booking-controller.js';
import {
  bookingService,
  classService,
  userService,
} from '../services/index.js';

const controller = bookingController({
  bookingService,
  classService,
  userService,
});
const router = express.Router();
router.get('/', controller.listBookingByFilters);
router.get('/:id', controller.getBookingById);
router.post('/', controller.createBooking);
router.patch('/:id', controller.updateBooking);

export default router;
