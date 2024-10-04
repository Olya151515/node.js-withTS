import { Router } from "express";

import { authController } from "../controllers/auth.controller";
import { ActionTokenEnum } from "../enums/action-token.type";
import { authMiddleware } from "../middlewares/auth.middleware";
import { commonMiddleware } from "../middlewares/common.middleware";
import { UserValidator } from "../validator_joi/user.validator";

const router = Router();
router.post(
  "/sign-up",
  commonMiddleware.isBodyValid(UserValidator.create),
  authController.signUp,
);
router.post(
  "/sign-in",
  commonMiddleware.isBodyValid(UserValidator.signIn),
  authController.signIn,
);
router.post(
  "/refresh",
  authMiddleware.checkRefreshToken,
  authController.refreshToken,
);
router.post("/logout", authMiddleware.checkAccessToken, authController.logout);
router.post(
  "/logout/all",
  authMiddleware.checkAccessToken,
  authController.logoutAll,
);
router.post("/forgot-password", authController.forgotPasswordSendEmail);
router.put(
  "/forgot-password",
  authMiddleware.checkActionToken(ActionTokenEnum.FORGOT_PASSWORD),
  authController.forgotPasswordSet,
);
router.post(
  "/verify",
  authMiddleware.checkActionToken(ActionTokenEnum.VERIFY_EMAIL),
  authController.verify,
);
export const authRouter = router;
