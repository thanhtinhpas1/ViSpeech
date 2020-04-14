import {IEvent} from '@nestjs/cqrs';
import {ReportDto} from 'reports/dtos/reports.dto';

export class ReportCreatedEvent implements IEvent {
    constructor(
        public readonly streamId: string,
        public readonly reportDto: ReportDto) {
    }
}

export class ReportCreatedSuccessEvent implements IEvent {
    constructor(
        public readonly streamId: string,
        public readonly reportDto: ReportDto) {
    }
}

export class ReportCreatedFailedEvent implements IEvent {
    constructor(
        public readonly streamId: string,
        public readonly reportDto: ReportDto,
        public readonly error: object) {
    }
}
