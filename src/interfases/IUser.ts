import { RoleEnum } from "../enums/role.enum";

export interface IUser {
  _id?: string;
  name: string;
  email: string;
  password: string;
  age: number;
  phone?: string;
  role: RoleEnum;
  isVerified: boolean;
  isDeleted: boolean;
  created?: Date;
  updated?: Date;
}

export type ISignIn = Pick<IUser, "email" | "password">;
export type IResetPassSend = { email: string };
export type IResetPassSet = { password: string; token: string };
export type IChangePassword = { oldPassword: string; newPassword: string };
