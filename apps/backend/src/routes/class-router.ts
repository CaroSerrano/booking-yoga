import { classController } from 'src/controllers/class-controller.js';
import { classService } from 'src/services/index.js';
import express from 'express';

const controller = classController({ classService });
const router = express.Router();
router.get('/', controller.getClasses);
router.get('/available', controller.listAvailableClasses);
router.get('/:id', controller.getClassDetails);
router.post('/', controller.createClass);
router.patch('/:id', controller.updateClass);
router.delete('/:id', controller.deleteClass);

export default router