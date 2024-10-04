import { NextFunction, Request, Response } from "express";

import { ITokenPayload } from "../interfases/IToken";
import {
  IResetPassSend,
  IResetPassSet,
  ISignIn,
  IUser,
} from "../interfases/IUser";
import { authService } from "../services/auth.service";

class AuthController {
  public async signUp(req: Request, res: Response, next: NextFunction) {
    try {
      const dto = req.body as IUser;
      const result = await authService.signUp(dto);
      //console.log(result);
      res.status(200).json(result);
    } catch (e) {
      next(e);
    }
  }
  public async signIn(req: Request, res: Response, next: NextFunction) {
    try {
      const dto = req.body as ISignIn;
      const result = await authService.signIn(dto);
      res.status(200).json(result);
    } catch (e) {
      next(e);
    }
  }

  public async refreshToken(req: Request, res: Response, next: NextFunction) {
    try {
      const token = req.res.locals.refreshToken as string;
      const jwtPayload = req.res.locals.jwtPayload as ITokenPayload;
      const result = await authService.refresh(token, jwtPayload);
      res.status(201).json(result);
    } catch (e) {
      next(e);
    }
  }

  public async logout(req: Request, res: Response, next: NextFunction) {
    try {
      const tokenId = req.res.locals.tokenId as string;
      const jwtPayload = req.res.locals.jwtPayload as ITokenPayload;
      await authService.logout(jwtPayload, tokenId);
      res.sendStatus(201);
    } catch (e) {
      next(e);
    }
  }

  public async logoutAll(req: Request, res: Response, next: NextFunction) {
    try {
      const jwtPayload = req.res.locals.jwtPayload as ITokenPayload;
      await authService.logoutAll(jwtPayload);
      res.sendStatus(201);
    } catch (e) {
      next(e);
    }
  }
  public async forgotPasswordSendEmail(
    req: Request,
    res: Response,
    next: NextFunction,
  ) {
    try {
      const dto = req.body as IResetPassSend;
      await authService.forgotPasswordSendEmail(dto);
      res.sendStatus(204);
    } catch (e) {
      next(e);
    }
  }
  public async forgotPasswordSet(
    req: Request,
    res: Response,
    next: NextFunction,
  ) {
    try {
      const dto = req.body as IResetPassSet;
      console.log(dto);
      const jwtPayload = req.res.locals.jwtPayload as ITokenPayload;
      await authService.forgotPasswordSet(dto, jwtPayload);
      res.sendStatus(204);
    } catch (e) {
      next(e);
    }
  }
}

export const authController = new AuthController();
