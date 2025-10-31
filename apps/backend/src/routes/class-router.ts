import { classController } from 'src/controllers/class-controller.js';
import { classService, userService } from 'src/services/index.js';
import express from 'express';

const controller = classController({ classService, userService });
const router = express.Router();
router.get('/', controller.getClasses);
router.get('/available', controller.listAvailableClasses);
router.get('/extended', controller.getAllWithBookings);
router.get('/:id', controller.getClassDetails);
router.post('/', controller.createClass);
router.patch('/:id', controller.updateClass);

export default router;
