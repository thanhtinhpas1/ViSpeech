import { Injectable } from "@nestjs/common";
import { Token } from "../models/token.model";
import { TokenDto } from "tokens/dtos/tokens.dto";

@Injectable()
export class TokenRepository {
  async createToken(transactionId: string, tokenDto: TokenDto) {
    const token = new Token(undefined);
    token.setData(tokenDto);
    token.createToken(transactionId);
    return token;
  }

  async createFreeToken(transactionId: string, tokenDto: TokenDto) {
    const token = new Token(undefined);
    token.setData(tokenDto);
    token.createFreeToken(transactionId);
    return token;
  }

  async createOrderedToken(transactionId: string, tokenDto: TokenDto) {
    const token = new Token(undefined);
    token.setData(tokenDto);
    token.createOrderedToken(transactionId);
    return token;
  }

  async updateToken(tokenDto: TokenDto) {
    const token = new Token(undefined);
    token.setData(tokenDto);
    token.updateToken();
    return token;
  }

  async deleteToken(transactionId: string, tokenId: string) {
    const token = new Token(tokenId);
    token.deleteToken(transactionId);
    return token;
  }

  async welcomeToken(tokenId: string) {
    const token = new Token(tokenId);
    token.welcomeToken();
    return token;
  }
}
