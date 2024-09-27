import { ApiErrors } from "../errors/api.errors";
import { ITokenPayload } from "../interfases/IToken";
import { IUser } from "../interfases/IUser";
import { userRepository } from "../repositories/user.repository";

class UserService {
  public getList = async (): Promise<IUser[]> => {
    return await userRepository.getList();
  };
  public getUserById = async (userId: string): Promise<IUser> => {
    const user = await userRepository.getUserById(userId);
    if (!user) {
      throw new ApiErrors("Not found user", 400);
    }
    return user;
  };
  public getMe = async (jwtPayload: ITokenPayload): Promise<IUser> => {
    const user = await userRepository.getUserById(jwtPayload.userId);
    if (!user) {
      throw new ApiErrors("Not found user", 400);
    }
    return user;
  };
  public updateMe = async (
    jwtPayload: ITokenPayload,
    userBody: Partial<IUser>,
  ): Promise<IUser> => {
    return await userRepository.updateById(jwtPayload.userId, userBody);
  };
  public deleteMe = async (jwtPayload: ITokenPayload): Promise<void> => {
    await userRepository.deleteMe(jwtPayload.userId);
  };
}

export const userService = new UserService();
