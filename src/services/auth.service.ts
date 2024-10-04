import { ActionTokenEnum } from "../enums/action-token.type";
import { EmailTypeEnum } from "../enums/email-type.enum";
import { ApiErrors } from "../errors/api.errors";
import { ITokenPair, ITokenPayload } from "../interfases/IToken";
import {
  IResetPassSend,
  IResetPassSet,
  ISignIn,
  IUser,
} from "../interfases/IUser";
import { actionTokenRepository } from "../repositories/action-token.repository";
import { tokenRepository } from "../repositories/token.repository";
import { userRepository } from "../repositories/user.repository";
import { emailService } from "./email.service";
import { passwordService } from "./password.service";
import { tokenService } from "./token.service";

class AuthService {
  public signUp = async (
    dto: Partial<IUser>,
  ): Promise<{ user: IUser; tokens: ITokenPair }> => {
    await this.isEmailExist(dto.email);
    const password = await passwordService.hashPassword(dto.password);
    const user = await userRepository.createUser({ ...dto, password });
    const tokens = tokenService.generateTokens({
      userId: user._id,
      role: user.role,
    });
    await tokenRepository.create({ ...tokens, _userId: user._id });
    await emailService.sendEmail(user.email, EmailTypeEnum.WELCOME, {
      name: user.name,
    });
    return { user, tokens };
  };
  public signIn = async (
    dto: ISignIn,
  ): Promise<{ user: IUser; tokens: ITokenPair }> => {
    const user = await userRepository.getUserByEmail(dto.email);

    if (!user) {
      throw new ApiErrors("user not found", 404);
    }

    const passwordCorrect = await passwordService.comparePassword(
      dto.password,
      user.password,
    );

    if (!passwordCorrect) {
      throw new ApiErrors("Invalid credentials", 401);
    }

    const tokens = tokenService.generateTokens({
      userId: user._id,
      role: user.role,
    });

    await tokenRepository.create({ ...tokens, _userId: user._id });
    return { user, tokens };
  };
  public isEmailExist = async (email: string): Promise<void> => {
    const user = await userRepository.getUserByEmail(email);
    if (user) {
      throw new ApiErrors("Email exist", 409);
    }
  };

  public refresh = async (
    refreshToken: string,
    payload: ITokenPayload,
  ): Promise<ITokenPair> => {
    await tokenRepository.deleteOneByParams({ refreshToken });
    const tokens = tokenService.generateTokens({
      userId: payload.userId,
      role: payload.role,
    });

    await tokenRepository.create({ ...tokens, _userId: payload.userId });
    return tokens;
  };
  public logout = async (
    jwtPayload: ITokenPayload,
    tokenId: string,
  ): Promise<void> => {
    const user = await userRepository.getUserById(jwtPayload.userId);
    await tokenRepository.deleteOneByParams({ _id: tokenId });
    await emailService.sendEmail(user.email, EmailTypeEnum.LOGOUT, {
      name: user.name,
    });
  };
  public logoutAll = async (jwtPayload: ITokenPayload): Promise<void> => {
    const user = await userRepository.getUserById(jwtPayload.userId);
    await tokenRepository.deleteManyByParams({ _userId: jwtPayload.userId });
    await emailService.sendEmail(user.email, EmailTypeEnum.LOGOUT, {
      name: user.name,
    });
  };

  public async forgotPasswordSendEmail(dto: IResetPassSend): Promise<void> {
    console.log(dto);
    const user = await userRepository.getUserByEmail(dto.email);
    if (!user) {
      throw new ApiErrors("User not found", 404);
    }

    const token = tokenService.generateResetToken(
      { userId: user._id, role: user.role },
      ActionTokenEnum.FORGOT_PASSWORD,
    );

    await actionTokenRepository.create({
      token,
      type: ActionTokenEnum.FORGOT_PASSWORD,
      _userId: user._id,
    });

    await emailService.sendEmail(user.email, EmailTypeEnum.FORGOT_PASSWORD, {
      name: user.name,
      email: user.email,
      actionToken: token,
    });
  }
  public async forgotPasswordSet(
    dto: IResetPassSet,
    jwtPayload: ITokenPayload,
  ): Promise<void> {
    const password = await passwordService.hashPassword(dto.password);
    await userRepository.updateById(jwtPayload.userId, { password });

    await actionTokenRepository.deleteManyByParams({
      _userId: jwtPayload.userId,
      type: ActionTokenEnum.FORGOT_PASSWORD,
    });

    await tokenRepository.deleteManyByParams({ _userId: jwtPayload.userId }); //logout
  }
}

export const authService = new AuthService();
