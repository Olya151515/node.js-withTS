import { IUser } from "../interfases/IUser";
import { User } from "../models/user.model";

class UserRepository {
  public getList = async (): Promise<IUser[]> => {
    return await User.find({});
  };
  public createUser = async (dto: Partial<IUser>): Promise<IUser> => {
    return await User.create(dto);
  };
  public getUserById = async (userId: string): Promise<IUser | null> => {
    return await User.findById(userId);
  };
  public updateUserById = async (
    userId: string,
    userBody: Partial<IUser>,
  ): Promise<IUser> => {
    return await User.findByIdAndUpdate(userId, userBody, { new: true });
  };
  public deleteUserById = async (userId: string): Promise<void> => {
    await User.deleteOne({ _id: userId });
  };
}

export const userRepository = new UserRepository();
