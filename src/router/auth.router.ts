import { Router } from "express";

import { authController } from "../controllers/auth.controller";
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
  //commonMiddleware.isBodyValid(UserValidator.create),
  authController.signIn,
);
router.post(
  "/refresh",
  authMiddleware.checkRefreshToken,
  authController.refreshToken,
);
export const authRouter = router;
