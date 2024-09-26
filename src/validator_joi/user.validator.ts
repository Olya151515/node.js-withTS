import Joi from "joi";

import { regexConstant } from "../constants/regex";

export class UserValidator {
  private static name = Joi.string().min(3).max(20).trim();
  private static age = Joi.number().min(18).max(120);
  private static email = Joi.string()
    .lowercase()
    .trim()
    .regex(regexConstant.EMAIL);
  private static password = Joi.string().trim().regex(regexConstant.PASSWORD);
  private static phone = Joi.string().trim().regex(regexConstant.PHONE);

  public static create = Joi.object({
    name: this.name.required(),
    age: this.age.required(),
    email: this.email.required(),
    password: this.password.required(),
    phone: this.phone,
  });

  public static update = Joi.object({
    name: this.name,
    age: this.age,
    phone: this.phone,
  });
  public static signIn = Joi.object({
    email: this.email.required(),
    password: this.password.required(),
  });
}

export const userValidator = new UserValidator();
