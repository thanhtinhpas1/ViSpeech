import { Injectable } from '@nestjs/common';
import { Token } from '../models/token.model';
import { TokenDto } from 'tokens/dtos/tokens.dto';
import { TokenTypeDto } from 'tokens/dtos/token-types.dto';

@Injectable()
export class TokenRepository {
    async createToken(streamId: string, tokenDto: TokenDto) {
        const token = new Token(streamId);
        token.setData(tokenDto);
        token.createToken(streamId);
        return token;
    }

    async createFreeToken(streamId: string, tokenDto: TokenDto) {
        const token = new Token(undefined);
        token.setData(tokenDto);
        token.createFreeToken(streamId);
        return token;
    }

    async createOrderedToken(streamId: string, tokenDto: TokenDto) {
        const token = new Token(undefined);
        token.setData(tokenDto);
        token.createOrderedToken(streamId);
        return token;
    }

    async updateToken(streamId: string, tokenDto: TokenDto) {
        const token = new Token(undefined);
        token.setData(tokenDto);
        token.updateToken(streamId);
        return token;
    }

    async deleteToken(streamId: string, tokenId: string) {
        const token = new Token(tokenId);
        token.deleteToken(streamId);
        return token;
    }

    async deleteTokenByUserId(streamId: string, userId: string) {
        const token = new Token(undefined);
        token.setData(userId);
        token.deleteTokenByUserId(streamId);
        return token;
    }

    async deleteTokenByProjectId(streamId: string, projectId: string) {
        const token = new Token(undefined);
        token.setData(projectId);
        token.deleteTokenByProjectId(streamId);
        return token;
    }

    async upgradeToken(streamId: string, tokenDto: TokenDto, tokenTypeDto: TokenTypeDto) {
        const token = new Token(tokenDto._id);
        token.setData(tokenDto);
        token.upgradeToken(streamId, tokenTypeDto);
        return token;
    }

    async welcomeToken(streamId: string, tokenId: string) {
        const token = new Token(tokenId);
        token.welcomeToken(streamId);
        return token;
    }
}
