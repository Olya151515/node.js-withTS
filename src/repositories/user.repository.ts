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
    return await User.findById(userId).select("+password");
  };

  public getUserByEmail = async (email: string): Promise<IUser | null> => {
    return await User.findOne({ email }).select("+password");
  };

  public updateById = async (
    userId: string,
    userBody: Partial<IUser>,
  ): Promise<IUser> => {
    return await User.findByIdAndUpdate(userId, userBody, { new: true });
  };
  public deleteMe = async (userId: string): Promise<void> => {
    await User.deleteOne({ _id: userId });
  };
}

export const userRepository = new UserRepository();
