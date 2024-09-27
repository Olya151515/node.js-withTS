import { ITokenAction } from "../interfases/action-token";
import { ActionToken } from "../models/action-token.model";

class ActionTokenRepository {
  public async create(dto: Partial<ITokenAction>): Promise<ITokenAction> {
    return await ActionToken.create(dto);
  }
  public async getByToken(token: string): Promise<ITokenAction | null> {
    return await ActionToken.findOne({ token });
  }
  public async deleteManyByParams(
    params: Partial<ITokenAction>,
  ): Promise<void> {
    await ActionToken.deleteMany(params);
  }
}

export const actionTokenRepository = new ActionTokenRepository();
