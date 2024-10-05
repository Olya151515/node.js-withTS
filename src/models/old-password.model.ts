import { model, Schema } from "mongoose";

import { IOldPasswords } from "../interfases/old-passwords";
import { User } from "./user.model";

const OldPasswordsSchema = new Schema(
  {
    password: { type: String, require: true },
    _userId: { type: Schema.Types.ObjectId, require: true, ref: User },
  },
  {
    timestamps: true,
    versionKey: false,
  },
);

export const oldPasswordsSchema = model<IOldPasswords>(
  "old-passwords",
  OldPasswordsSchema,
);
