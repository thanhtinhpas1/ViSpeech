import {IEvent} from '@nestjs/cqrs';

export class EmailVerifiedEvent implements IEvent {
    constructor(
        public readonly streamId: string,
        public readonly emailToken: string
    ) {
    }
}
