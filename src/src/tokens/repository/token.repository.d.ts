import { Token } from '../models/token.model';
import { TokenDto } from 'tokens/dtos/tokens.dto';
export declare class TokenRepository {
    createToken(streamId: string, tokenDto: TokenDto): Promise<Token>;
    createFreeToken(streamId: string, tokenDto: TokenDto): Promise<Token>;
    createOrderedToken(streamId: string, tokenDto: TokenDto): Promise<Token>;
    updateToken(streamId: string, tokenDto: TokenDto): Promise<Token>;
    deleteToken(streamId: string, tokenId: string): Promise<Token>;
    deleteTokenByUserId(streamId: string, userId: string): Promise<Token>;
    welcomeToken(streamId: string, tokenId: string): Promise<Token>;
}
