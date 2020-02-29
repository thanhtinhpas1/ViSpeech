import { Injectable } from "@nestjs/common";
import { Token } from "../models/token.model";
import { TokenDto } from "tokens/dtos/tokens.dto";

@Injectable()
export class TokenRepository {
  async createToken(tokenDto) {
    const token = new Token(undefined);
    token.setData(tokenDto);
    token.createToken();
    return token;
  }

  async createUserToken(transactionId: string, tokenDto: TokenDto) {
    const token = new Token(undefined);
    token.setData(tokenDto);
    token.createUserToken(transactionId);
    return token;
  }

  async updateToken(tokenDto) {
    const token = new Token(tokenDto.id);
    token.setData(tokenDto);
    token.updateToken();
    return token;
  }

  async deleteToken(tokenId) {
    const token = new Token(tokenId);
    token.deleteToken();
    return token;
  }

  async welcomeToken(tokenId) {
    const token = new Token(tokenId);
    token.welcomeToken();
    return token;
  }
}
