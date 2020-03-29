import { ICommand } from '@nestjs/cqrs';
import { TokenDto } from '../../dtos/tokens.dto';
export declare class CreateTokenCommand implements ICommand {
    readonly streamId: string;
    readonly tokenDto: TokenDto;
    constructor(streamId: string, tokenDto: TokenDto);
}
export declare class CreateFreeTokenCommand implements ICommand {
    readonly streamId: string;
    readonly tokenDto: TokenDto;
    constructor(streamId: string, tokenDto: TokenDto);
}
export declare class CreateOrderedTokenCommand implements ICommand {
    readonly streamId: string;
    readonly tokenDto: TokenDto;
    constructor(streamId: string, tokenDto: TokenDto);
}
