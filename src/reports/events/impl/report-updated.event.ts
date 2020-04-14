import { IEvent } from '@nestjs/cqrs';
import { ReportDto } from '../../dtos/reports.dto';

export class ReportUpdatedEvent implements IEvent {
    constructor(
        public readonly streamId: string,
        public readonly reportDto: ReportDto) {
    }
}

export class ReportUpdatedSuccessEvent implements IEvent {
    constructor(
        public readonly streamId: string,
        public readonly reportDto: ReportDto) {
    }
}

export class ReportUpdatedFailedEvent implements IEvent {
    constructor(
        public readonly streamId: string,
        public readonly reportDto: ReportDto,
        public readonly error: object) {
    }
}
