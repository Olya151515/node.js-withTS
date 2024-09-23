import { IToken } from "../interfases/IToken";
import { Token } from "../models/token.model";

class TokenRepository {
  public async create(dto: Partial<IToken>): Promise<IToken> {
    return await Token.create(dto);
  }
  public async findByParams(params: Partial<IToken>): Promise<IToken | null> {
    return await Token.findOne(params);
  }
}

export const tokenRepository = new TokenRepository();
