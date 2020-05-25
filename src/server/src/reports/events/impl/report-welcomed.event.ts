import {IEvent} from '@nestjs/cqrs';

export class ReportWelcomedEvent implements IEvent {
    constructor(
        public readonly streamId: string,
        public readonly reportId: string) {
    }
}
