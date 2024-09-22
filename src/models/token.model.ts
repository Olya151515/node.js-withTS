import { model, Schema } from "mongoose";

import { IToken } from "../interfases/IToken";
import { User } from "./user.model";

const TokenSchema = new Schema(
  {
    accessToken: { type: String, require: true },
    refreshToken: { type: String, require: true },
    _userId: { type: Schema.Types.ObjectId, require: true, ref: User },
  },
  {
    timestamps: true,
    versionKey: false,
  },
);

export const Token = model<IToken>("tokens", TokenSchema);
