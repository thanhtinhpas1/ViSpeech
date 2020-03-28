import {IEvent} from '@nestjs/cqrs';

export class ProjectDeletedEvent implements IEvent {
    constructor(
        public readonly streamId: string,
        public readonly projectId: string
    ) {
    }
}