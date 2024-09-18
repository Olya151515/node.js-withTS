import { ApiErrors } from "../errors/api.errors";
import { IUser } from "../interfases/IUser";
import { userRepository } from "../repositories/user.repository";

class UserService {
  public getList = async (): Promise<IUser[]> => {
    return await userRepository.getList();
  };
  public createUser = async (dto: Partial<IUser>): Promise<IUser> => {
    const pattern = /^[^ ]+@[^ ]+\.[a-z]{2,3}$/;
    if (
      dto.name.length < 3 ||
      dto.name.length > 10 ||
      !dto.email.match(pattern) ||
      dto.password.length < 10 ||
      dto.password.length > 20
    ) {
      throw new ApiErrors("Not valid data", 400);
    }

    return await userRepository.createUser(dto);
  };
  public getUserById = async (userId: number): Promise<IUser> => {
    const user = await userRepository.getUserById(userId);
    if (!user) {
      throw new ApiErrors("Not found user", 404);
    }
    return user;
  };
  public updateUserById = async (
    userId: number,
    userBody: Partial<IUser>,
  ): Promise<IUser[]> => {
    const pattern = /^[^ ]+@[^ ]+\.[a-z]{2,3}$/;
    if (
      userBody.name.length < 3 ||
      userBody.name.length > 10 ||
      !userBody.email.match(pattern) ||
      userBody.password.length < 10 ||
      userBody.password.length > 20
    ) {
      throw new ApiErrors("Not valid data", 400);
    }
    return await userRepository.updateUserById(userId, userBody);
  };
  public deleteUserById = async (userId: number): Promise<IUser[]> => {
    return await userRepository.deleteUserById(userId);
  };
}

export const userService = new UserService();
