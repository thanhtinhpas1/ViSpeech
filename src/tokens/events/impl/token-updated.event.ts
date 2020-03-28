import {IEvent} from '@nestjs/cqrs';
import {TokenDto} from '../../dtos/tokens.dto';

export class TokenUpdatedEvent implements IEvent {
    constructor(
        public readonly streamId: string,
        public readonly tokenDto: TokenDto) {
    }
}
