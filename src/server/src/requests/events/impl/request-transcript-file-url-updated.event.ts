import { IEvent } from '@nestjs/cqrs';

export class RequestTranscriptFileUrlUpdatedEvent implements IEvent {
    constructor(
        public readonly streamId: string,
        public readonly requestId: string,
        public readonly url: string) {
    }
}

export class RequestTranscriptFileUrlUpdatedSuccessEvent implements IEvent {
    constructor(
        public readonly streamId: string,
        public readonly requestId: string,
        public readonly url: string) {
    }
}

export class RequestTranscriptFileUrlUpdatedFailedEvent implements IEvent {
    constructor(
        public readonly streamId: string,
        public readonly requestId: string,
        public readonly url: string,
        public readonly error: object) {
    }
}
