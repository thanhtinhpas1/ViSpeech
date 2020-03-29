import { IEvent } from '@nestjs/cqrs';
import { TokenDto } from '../../dtos/tokens.dto';
export declare class TokenUpdatedEvent implements IEvent {
    readonly streamId: string;
    readonly tokenDto: TokenDto;
    constructor(streamId: string, tokenDto: TokenDto);
}
