import { Router } from "express";

import { userController } from "../controllers/user.controller";
import { commonMiddleware } from "../middlewares/common.middleware";
import { UserValidator } from "../validator_joi/user.validator";

const router = Router();

router.get("/", userController.getList);
router.post(
  "/",
  commonMiddleware.isBodyValid(UserValidator.create),
  userController.createUser,
);

router.get(
  "/:userId",
  commonMiddleware.isIdValid("userId"),
  userController.getUserById,
);
router.put(
  "/:userId",
  commonMiddleware.isIdValid("userId"),
  commonMiddleware.isBodyValid(UserValidator.update),
  userController.updateUserById,
);
router.delete(
  "/:userId",
  commonMiddleware.isIdValid("userId"),
  userController.deleteUserById,
);

export const userRouter = router;
