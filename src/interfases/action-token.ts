import { ActionTokenEnum } from "../enums/action-token.type";

export interface ITokenAction {
  _id?: string;
  token: string;
  type: ActionTokenEnum;
  _userId: string;
}
