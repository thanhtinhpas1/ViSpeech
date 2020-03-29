import { IEvent } from '@nestjs/cqrs';
import { TokenDto } from 'tokens/dtos/tokens.dto';
export declare class FreeTokenCreatedEvent implements IEvent {
    readonly streamId: string;
    readonly tokenDto: TokenDto;
    constructor(streamId: string, tokenDto: TokenDto);
}
export declare class FreeTokenCreatedSuccessEvent implements IEvent {
    readonly streamId: string;
    readonly tokenDto: any;
    constructor(streamId: string, tokenDto: any);
}
export declare class FreeTokenCreatedFailedEvent implements IEvent {
    readonly streamId: string;
    readonly tokenDto: TokenDto;
    readonly error: object;
    constructor(streamId: string, tokenDto: TokenDto, error: object);
}
