import { userController } from 'src/controllers/user-controller.js';
import { userService } from 'src/services/index.js';
import express from 'express';

const controller = userController({ userService });
const router = express.Router();

router.get('/', controller.listAllUsers);
router.get('/active', controller.listActiveUsers);
router.get('/students', controller.listStudents);
router.patch('/:id', controller.updateUser);
router.delete('/:id', controller.deleteUser);

export default router;
