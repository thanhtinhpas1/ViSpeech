import {IEvent} from '@nestjs/cqrs';

export class ReportDeletedEvent implements IEvent {
    constructor(
        public readonly streamId: string,
        public readonly reportId: string) {
    }
}

export class ReportDeletedSuccessEvent implements IEvent {
    constructor(
        public readonly streamId: string,
        public readonly reportId: string) {
    }
}

export class ReportDeletedFailedEvent implements IEvent {
    constructor(
        public readonly streamId: string,
        public readonly reportId: string,
        public readonly error: object) {
    }
}
