import { ApiErrors } from "../errors/api.errors";
import { ITokenPair, ITokenPayload } from "../interfases/IToken";
import { ISignIn, IUser } from "../interfases/IUser";
import { tokenRepository } from "../repositories/token.repository";
import { userRepository } from "../repositories/user.repository";
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
    await tokenRepository.deleteByParams({ refreshToken });
    const tokens = tokenService.generateTokens({
      userId: payload.userId,
      role: payload.role,
    });

    await tokenRepository.create({ ...tokens, _userId: payload.userId });
    return tokens;
  };
}

export const authService = new AuthService();
