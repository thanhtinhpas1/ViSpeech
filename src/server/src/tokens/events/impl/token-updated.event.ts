import { IEvent } from '@nestjs/cqrs';
import { TokenDto } from '../../dtos/tokens.dto';

export class TokenUpdatedEvent implements IEvent {
    constructor(
        public readonly streamId: string,
        public readonly tokenDto: TokenDto) {
    }
}

export class TokenUpdatedSuccessEvent implements IEvent {
    constructor(
        public readonly streamId: string,
        public readonly tokenDto: TokenDto) {
    }
}

export class TokenUpdatedFailedEvent implements IEvent {
    constructor(
        public readonly streamId: string,
        public readonly tokenDto: TokenDto,
        public readonly error: object) {
    }
}
