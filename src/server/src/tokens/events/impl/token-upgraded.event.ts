import { IEvent } from '@nestjs/cqrs';
import { TokenTypeDto } from 'tokens/dtos/token-types.dto';

export class TokenUpgradedEvent implements IEvent {
    constructor(
        public readonly streamId: string,
        public readonly id: string,
        public readonly tokenTypeDto: TokenTypeDto) {
    }
}

export class TokenUpgradedSuccessEvent implements IEvent {
    constructor(
        public readonly streamId: string,
        public readonly id: string,
        public readonly tokenTypeDto: TokenTypeDto) {
    }
}

export class TokenUpgradedFailedEvent implements IEvent {
    constructor(
        public readonly streamId: string,
        public readonly id: string,
        public readonly tokenTypeDto: TokenTypeDto,
        public readonly error: object) {
    }
}
