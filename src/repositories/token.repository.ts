import { IToken } from "../interfases/IToken";
import { Token } from "../models/token.model";

class AuthRepository {
  public create = async (dto: Partial<IToken>): Promise<IToken> => {
    return await Token.create(dto);
  };
}

export const authRepository = new AuthRepository();
