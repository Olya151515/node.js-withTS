import * as jsonwebtoken from "jsonwebtoken";

import { configs } from "../configs/configs";
import { ActionTokenEnum } from "../enums/action-token.type";
import { TokenTypeEnum } from "../enums/token-type.enum";
import { ApiErrors } from "../errors/api.errors";
import { ITokenPair, ITokenPayload } from "../interfases/IToken";

class TokenService {
  public generateTokens(payload: ITokenPayload): ITokenPair {
    const accessToken = jsonwebtoken.sign(payload, configs.JWT_ACCESS_SECRET, {
      expiresIn: configs.JWT_ACCESS_EXPIRATION,
    });
    const refreshToken = jsonwebtoken.sign(
      payload,
      configs.JWT_REFRESH_SECRET,
      {
        expiresIn: configs.JWT_REFRESH_EXPIRATION,
      },
    );

    return { accessToken, refreshToken };
  }

  public verifyToken(
    token: string,
    type: TokenTypeEnum | ActionTokenEnum,
  ): ITokenPayload {
    try {
      let secret: string;
      switch (type) {
        case TokenTypeEnum.ACCESS:
          secret = configs.JWT_ACCESS_SECRET;
          break;

        case TokenTypeEnum.REFRESH:
          secret = configs.JWT_REFRESH_SECRET;
          break;
        case ActionTokenEnum.FORGOT_PASSWORD:
          secret = configs.ACTION_FORGOT_PASSWORD_SECRET;
          break;
        default:
          throw new ApiErrors("Invalid token", 401);
      }
      return jsonwebtoken.verify(token, secret) as ITokenPayload;
    } catch (e) {
      throw new ApiErrors(`Invalid token ${e.message}`, 401);
    }
  }
  public generateResetToken(
    payload: ITokenPayload,
    tokenType: ActionTokenEnum,
  ): string {
    let secret: string;
    let expiration: string;

    switch (tokenType) {
      case ActionTokenEnum.FORGOT_PASSWORD:
        secret = configs.ACTION_FORGOT_PASSWORD_SECRET;
        expiration = configs.ACTION_FORGOT_PASSWORD_EXPIRATION;
        break;
      default:
        throw new ApiErrors("Invalid token", 401);
    }

    return jsonwebtoken.sign(payload, secret, {
      expiresIn: expiration,
    });
  }
}

export const tokenService = new TokenService();
