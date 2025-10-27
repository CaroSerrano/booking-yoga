import express from 'express';
import { authController } from 'src/controllers/auth-controller.js';
import { userService } from 'src/services/index.js';
import { BcryptPasswordHasher } from 'src/utils/auth.js';

const hasher = new BcryptPasswordHasher();
const controller = authController({ userService, hasher });

const router = express.Router();
router.post('/register', controller.register);
router.post('/login', controller.login);
router.post('/logout', controller.logout);

export default router;
