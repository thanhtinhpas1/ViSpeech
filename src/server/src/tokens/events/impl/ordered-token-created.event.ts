import { IEvent } from '@nestjs/cqrs';
import { TokenDto } from 'tokens/dtos/tokens.dto';
import { Permission } from 'permissions/dtos/permissions.dto';

export class OrderedTokenCreatedEvent implements IEvent {
    constructor(
        public readonly streamId: string,
        public readonly tokenDto: TokenDto,
        public readonly assigneeTokens: Permission[]
    ) {
    }
}

export class OrderedTokenCreatedSuccessEvent implements IEvent {
    constructor(
        public readonly streamId: string,
        public readonly tokenDto: any,
        public readonly updatedToken: any,
        public readonly assigneeTokens: Permission[]
    ) {
    }
}

export class OrderedTokenCreatedFailedEvent implements IEvent {
    constructor(
        public readonly streamId: string,
        public readonly tokenDto: TokenDto,
        public readonly error: object
    ) {
    }
}
