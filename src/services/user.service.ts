import { UploadedFile } from "express-fileupload";

import { FileItemTypeEnum } from "../enums/file.item-type";
import { ApiErrors } from "../errors/api.errors";
import { ITokenPayload } from "../interfases/IToken";
import { IUser } from "../interfases/IUser";
import { userRepository } from "../repositories/user.repository";
import { s3Service } from "./s3.service";

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
  public uploadAvatar = async (
    jwtPayload: ITokenPayload,
    fileAvatar: UploadedFile,
  ): Promise<IUser> => {
    const user = await userRepository.getUserById(jwtPayload.userId);
    const avatar = await s3Service.uploadFile(
      fileAvatar,
      FileItemTypeEnum.USER,
      user._id,
    );
    const updatedUser = await userRepository.updateById(jwtPayload.userId, {
      avatar,
    });
    if (user.avatar) {
      await s3Service.deleteFile(user.avatar);
    }
    return updatedUser;
  };
  public deleteAvatar = async (jwtPayload: ITokenPayload): Promise<IUser> => {
    const user = await userRepository.getUserById(jwtPayload.userId);

    if (user.avatar) {
      await s3Service.deleteFile(user.avatar);
    }
    return await userRepository.updateById(user._id, { avatar: null });
  };
}

export const userService = new UserService();
