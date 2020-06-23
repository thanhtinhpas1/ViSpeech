import { IEvent } from '@nestjs/cqrs';
import { TokenDto } from 'tokens/dtos/tokens.dto';

export class TokenCreatedEvent implements IEvent {
    constructor(
        public readonly streamId: string,
        public readonly tokenDto: TokenDto
    ) {
    }
}

export class TokenCreatedSuccessEvent implements IEvent {
    constructor(
        public readonly streamId: string,
        public readonly tokenDto: any
    ) {
    }
}

export class TokenCreatedFailedEvent implements IEvent {
    constructor(
        public readonly streamId: string,
        public readonly tokenDto: TokenDto,
        public readonly error: object,
    ) {
    }
}
