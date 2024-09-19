import { NextFunction, Request, Response } from "express";

import { IUser } from "../interfases/IUser";
import { userService } from "../services/user.service";

class UserController {
  public getList = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const result = await userService.getList();
      res.json(result);
    } catch (e) {
      next(e);
    }
  };
  public createUser = async (
    req: Request,
    res: Response,
    next: NextFunction,
  ) => {
    try {
      const dto = req.body as IUser;
      const result = await userService.createUser(dto);
      res.status(200).json(result);
    } catch (e) {
      next(e);
    }
  };
  public getUserById = async (
    req: Request,
    res: Response,
    next: NextFunction,
  ) => {
    try {
      const userId = req.params.userId;
      const result = await userService.getUserById(userId);
      res.json(result);
    } catch (e) {
      next(e);
    }
  };
  public updateUserById = async (
    req: Request,
    res: Response,
    next: NextFunction,
  ) => {
    try {
      const userId = req.params.userId;
      const dto = req.body as IUser;
      const result = await userService.updateUserById(userId, dto);
      res.json(result);
    } catch (e) {
      next(e);
    }
  };
  public deleteUserById = async (
    req: Request,
    res: Response,
    next: NextFunction,
  ) => {
    try {
      const userId = req.params.userId;
      await userService.deleteUserById(userId);
      res.sendStatus(204);
    } catch (e) {
      next(e);
    }
  };
}
export const userController = new UserController();
