import Joi from "joi";

import { regexConstant } from "../constants/regex";
import { OrderEnum } from "../enums/order.enum";
import { UserListOrderByEnum } from "../enums/user-list-order-by.enum";

export class UserValidator {
  private static userName = Joi.string().min(3).max(20).trim();
  private static age = Joi.number().min(18).max(120);
  private static email = Joi.string()
    .lowercase()
    .trim()
    .regex(regexConstant.EMAIL);
  private static password = Joi.string().trim().regex(regexConstant.PASSWORD);
  private static phone = Joi.string().trim().regex(regexConstant.PHONE);

  public static create = Joi.object({
    userName: this.userName.required(),
    age: this.age.required(),
    email: this.email.required(),
    password: this.password.required(),
    phone: this.phone,
  });

  public static update = Joi.object({
    userName: this.userName,
    age: this.age,
    phone: this.phone,
  });
  public static signIn = Joi.object({
    email: this.email.required(),
    password: this.password.required(),
  });
  public static changePassword = Joi.object({
    oldPassword: this.password.required(),
    newPassword: this.password.required(),
  });
  public static listQuery = Joi.object({
    limit: Joi.number().min(1).max(100).default(10),
    page: Joi.number().min(1).default(1),
    search: Joi.string().trim().lowercase(),
    order: Joi.string()
      .valid(...Object.values(OrderEnum))
      .default(OrderEnum.ASC),
    orderBy: Joi.string()
      .valid(...Object.values(UserListOrderByEnum))
      .default(UserListOrderByEnum.CREATED),
  });
}

export const userValidator = new UserValidator();
