import { IEvent } from '@nestjs/cqrs';

export class $statsCollected implements IEvent {
    constructor(
        public readonly streamId: string,
        public readonly data: object,
    ) {
    }
}

export class MonitorBeatSuccessEvent implements IEvent {
    constructor(
        public readonly streamId: string,
        public readonly data: object,
    ) {
    }
}

export class MonitorBeatFailedEvent implements IEvent {
    constructor(
        public readonly streamId: string,
        public readonly data: object,
        public readonly error: object,
    ) {
    }
}