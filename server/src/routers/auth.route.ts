import * as authController from "@/controllers/auth.cont.js";
import { checkAuth } from "@/middlewares/auth.mid.js";
import { Router } from "express";

const router = Router();

router.post('/register', authController.registerController);
router.post('/login', authController.loginController);
router.post('/guest', authController.guestController);
router.post('/logout', checkAuth, authController.logoutController);
router.post('/refresh-token', checkAuth, authController.refreshTokenController);
router.post('/verify', checkAuth, authController.verifyController);

export default router;