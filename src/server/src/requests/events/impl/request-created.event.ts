import { IEvent } from '@nestjs/cqrs';
import { RequestDto } from 'requests/dtos/requests.dto';
import { TokenDto } from 'tokens/dtos/tokens.dto';

export class RequestCreatedEvent implements IEvent {
    constructor(
        public readonly streamId: string,
        public readonly requestDto: RequestDto,
        public readonly tokenDto: TokenDto,
    ) {
    }
}

export class RequestCreatedSuccessEvent implements IEvent {
    constructor(
        public readonly streamId: string,
        public readonly requestDto: RequestDto,
        public readonly tokenDto: TokenDto) {
    }
}

export class RequestCreatedFailedEvent implements IEvent {
    constructor(
        public readonly streamId: string,
        public readonly requestDto: RequestDto,
        public readonly tokenDto: TokenDto,
        public readonly error: object) {
    }
}
