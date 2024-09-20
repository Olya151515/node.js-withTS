import { ApiErrors } from "../errors/api.errors";
import { IUser } from "../interfases/IUser";
import { userRepository } from "../repositories/user.repository";

class UserService {
  public getList = async (): Promise<IUser[]> => {
    return await userRepository.getList();
  };
  public createUser = async (dto: Partial<IUser>): Promise<IUser> => {
    await this.isEmailExist(dto.email);
    return await userRepository.createUser(dto);
  };
  public getUserById = async (userId: string): Promise<IUser> => {
    const user = await userRepository.getUserById(userId);
    if (!user) {
      throw new ApiErrors("Not found user", 400);
    }
    return user;
  };
  public updateUserById = async (
    userId: string,
    userBody: Partial<IUser>,
  ): Promise<IUser> => {
    return await userRepository.updateUserById(userId, userBody);
  };
  public deleteUserById = async (userId: string): Promise<void> => {
    await userRepository.deleteUserById(userId);
  };

  public isEmailExist = async (email: string): Promise<void> => {
    const user = await userRepository.getUserByEmail(email);
    if (user) {
      throw new ApiErrors("Email exist", 409);
    }
  };
}

export const userService = new UserService();
