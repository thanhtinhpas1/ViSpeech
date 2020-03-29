import { IEvent } from '@nestjs/cqrs';
import { TokenDto } from 'tokens/dtos/tokens.dto';
export declare class TokenCreatedEvent implements IEvent {
    readonly streamId: string;
    readonly tokenDto: TokenDto;
    constructor(streamId: string, tokenDto: TokenDto);
}
export declare class TokenCreatedSuccessEvent implements IEvent {
    readonly streamId: string;
    readonly tokenDto: any;
    constructor(streamId: string, tokenDto: any);
}
export declare class TokenCreatedFailedEvent implements IEvent {
    readonly streamId: string;
    readonly tokenDto: TokenDto;
    readonly error: object;
    constructor(streamId: string, tokenDto: TokenDto, error: object);
}
