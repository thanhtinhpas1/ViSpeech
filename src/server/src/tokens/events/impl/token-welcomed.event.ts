import {IEvent} from '@nestjs/cqrs';

export class TokenWelcomedEvent implements IEvent {
    constructor(
        public readonly streamId: string,
        public readonly tokenId: string) {
    }
}
