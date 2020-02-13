import { Injectable } from '@nestjs/common';
import { Token } from '../models/token.model';

@Injectable()
export class TokenRepository {

  async createToken(tokenDto) {
    const token = new Token(tokenDto.tokenId);
    token.setData(tokenDto);
    token.createToken();
    return token;
  }

  async updateToken(tokenDto) {
    const token = new Token(tokenDto.tokenId);
    token.setData(tokenDto);
    token.updateToken();
    return token;
  }

  async deleteToken(tokenDto) {
    const token = new Token(tokenDto.tokenId);
    token.deleteToken();
    return token;
  }

  async welcomeToken(tokenDto) {
    const token = new Token(tokenDto.tokenId);
    token.welcomeToken();
    return token;
  }
}
