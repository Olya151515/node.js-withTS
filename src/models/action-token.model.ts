import { model, Schema } from "mongoose";

import { ActionTokenEnum } from "../enums/action-token.type";
import { ITokenAction } from "../interfases/action-token";
import { User } from "./user.model";

const ActionTokenModel = new Schema(
  {
    token: { type: String, require: true },
    type: { type: String, require: true, enum: ActionTokenEnum },
    _userId: { type: Schema.Types.ObjectId, require: true, ref: User },
  },
  {
    timestamps: true,
    versionKey: false,
  },
);

export const ActionToken = model<ITokenAction>(
  "actionTokens",
  ActionTokenModel,
);
