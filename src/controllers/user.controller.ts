import { NextFunction, Request, Response } from "express";

import { ITokenPayload } from "../interfases/IToken";
import { IUser, IUserQueryList } from "../interfases/IUser";
import { userService } from "../services/user.service";

class UserController {
  public getList = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const query = req.query as unknown as IUserQueryList;
      console.log(query);
      const result = await userService.getList(query);
      res.json(result);
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
  public updateMe = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const jwtPayload = req.res.locals.jwtPayload as ITokenPayload;
      const dto = req.body as IUser;
      const result = await userService.updateMe(jwtPayload, dto);
      res.json(result);
    } catch (e) {
      next(e);
    }
  };
  public deleteMe = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const jwtPayload = req.res.locals.jwtPayload as ITokenPayload;
      await userService.deleteMe(jwtPayload);
      res.sendStatus(204);
    } catch (e) {
      next(e);
    }
  };
  public getMe = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const jwtPayload = req.res.locals.jwtPayload as ITokenPayload;
      const result = await userService.getMe(jwtPayload);
      res.json(result);
    } catch (e) {
      next(e);
    }
  };
}
export const userController = new UserController();
