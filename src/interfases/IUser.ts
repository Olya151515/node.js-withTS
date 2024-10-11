import { OrderEnum } from "../enums/order.enum";
import { RoleEnum } from "../enums/role.enum";
import { UserListOrderByEnum } from "../enums/user-list-order-by.enum";
import { PickRequired } from "../types/pick-required.type";

export interface IUser {
  _id?: string;
  name: string;
  email: string;
  password: string;
  age: number;
  phone?: string;
  role: RoleEnum;
  avatar?: string;
  isVerified: boolean;
  isDeleted: boolean;
  createdAt?: Date;
  updatedAt?: Date;
}

export type ISignIn = Pick<IUser, "email" | "password">;
export type IResetPassSend = { email: string };
export type IResetPassSet = { password: string; token: string };
export type IChangePassword = { oldPassword: string; newPassword: string };

export interface IUserQueryList {
  limit?: number;
  page?: number;
  search?: string;
  order?: OrderEnum;
  orderBy?: UserListOrderByEnum;
}

export type IUserResponse = Pick<
  IUser,
  "name" | "email" | "age" | "role" | "avatar" | "isDeleted" | "isVerified"
> &
  PickRequired<IUser, "_id" | "createdAt">;

export interface IListResponse {
  data: IUserResponse[];
  total: number;
}
