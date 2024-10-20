import { NextFunction, Request, Response } from "express";
import { UploadedFile } from "express-fileupload";

import { ITokenPayload } from "../interfases/IToken";
import { IUser } from "../interfases/IUser";
import { userPresenter } from "../presenters/user.presenter";
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

  public async uploadAvatar(req: Request, res: Response, next: NextFunction) {
    try {
      const jwtPayload = req.res.locals.jwtPayload as ITokenPayload;
      const avatar = req.files.avatar as UploadedFile;
      const result = await userService.uploadAvatar(jwtPayload, avatar);
      const userRepresent = userPresenter.toPublicResDto(result);
      res.status(201).json(userRepresent);
    } catch (e) {
      next(e);
    }
  }
  public async deleteAvatar(req: Request, res: Response, next: NextFunction) {
    try {
      const jwtPayload = req.res.locals.jwtPayload as ITokenPayload;
      const result = await userService.deleteAvatar(jwtPayload);
      const userRepresent = userPresenter.toPublicResDto(result);
      res.status(201).json(userRepresent);
    } catch (e) {
      next(e);
    }
  }
}
export const userController = new UserController();
