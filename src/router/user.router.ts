import { Router } from "express";
import { rateLimit } from "express-rate-limit";

import { userController } from "../controllers/user.controller";
import { authMiddleware } from "../middlewares/auth.middleware";
import { commonMiddleware } from "../middlewares/common.middleware";
import { UserValidator } from "../validator_joi/user.validator";

const router = Router();

router.get(
  "/",
  commonMiddleware.isQueryValid(UserValidator.listQuery),
  userController.getList,
);

router.get(
  "/me",
  rateLimit({ windowMs: 2 * 60 * 1000, limit: 5 }),
  authMiddleware.checkAccessToken,
  userController.getMe,
);
router.put(
  "/me",
  authMiddleware.checkAccessToken,
  commonMiddleware.isBodyValid(UserValidator.update),
  userController.updateMe,
);
router.delete("/me", authMiddleware.checkAccessToken, userController.deleteMe);
router.get(
  "/:userId",
  commonMiddleware.isIdValid("userId"),
  userController.getUserById,
);

export const userRouter = router;
