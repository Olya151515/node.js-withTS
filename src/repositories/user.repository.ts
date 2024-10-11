import { FilterQuery, SortOrder } from "mongoose";

import { UserListOrderByEnum } from "../enums/user-list-order-by.enum";
import { ApiErrors } from "../errors/api.errors";
import { IUser, IUserQueryList } from "../interfases/IUser";
import { Token } from "../models/token.model";
import { User } from "../models/user.model";

class UserRepository {
  public getList = async (
    query: IUserQueryList,
  ): Promise<[IUser[], number]> => {
    const filterObj: FilterQuery<IUser> = {}; //isVerified: true
    if (query.search) {
      filterObj.name = { $regex: query.search, $options: "i" }; //options - skip register
    }
    const sortObj: { [key: string]: SortOrder } = {};
    switch (query.orderBy) {
      case UserListOrderByEnum.NAME:
        sortObj.name = query.order;
        break;
      case UserListOrderByEnum.AGE:
        sortObj.age = query.order;
        break;
      case UserListOrderByEnum.CREATED:
        sortObj.cretedAt = query.order;
        break;
      default:
        throw new ApiErrors("Invalid orderBy", 500);
    }

    const skip = query.limit * (query.page - 1);
    return await Promise.all([
      User.find(filterObj).sort(sortObj).limit(query.limit).skip(skip),
      User.countDocuments(filterObj),
    ]);
  };
  public createUser = async (dto: Partial<IUser>): Promise<IUser> => {
    return await User.create(dto);
  };
  public getUserById = async (userId: string): Promise<IUser | null> => {
    return await User.findById(userId).select("+password");
  };
  public findWithOutActivity = async (date: Date): Promise<IUser[]> => {
    return await User.aggregate([
      {
        $lookup: {
          from: Token.collection.name,
          let: { userId: "$_id" },
          pipeline: [
            { $match: { $expr: { $eq: ["$_userId", "$$userId"] } } },
            { $match: { createdAt: { $gt: date } } },
          ],
          as: "tokens",
        },
      },
      { $match: { tokens: { $size: 0 } } },
    ]);
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
