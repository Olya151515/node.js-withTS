import {
  IListResponse,
  IUser,
  IUserQueryList,
  IUserResponse,
} from "../interfases/IUser";

class UserPresenter {
  public toPublicResponseDto(entity: IUser): IUserResponse {
    return {
      _id: entity._id,
      name: entity.name,
      email: entity.email,
      age: entity.age,
      role: entity.role,
      isDeleted: entity.isDeleted,
      isVerified: entity.isVerified,
      createdAt: entity.createdAt,
    };
  }
  public toListResDto(
    entities: IUser[],
    total: number,
    query: IUserQueryList,
  ): IListResponse {
    return {
      data: entities.map(this.toPublicResponseDto),
      total,
      ...query,
    };
  }
}
export const userPresenter = new UserPresenter();
