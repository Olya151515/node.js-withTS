import { ITokenAction } from "../interfases/action-token";
import { ActionToken } from "../models/action-token.model";

class ActionTokenRepository {
  public async create(dto: Partial<ITokenAction>): Promise<ITokenAction> {
    return await ActionToken.create(dto);
  }
}

export const actionTokenRepository = new ActionTokenRepository();
