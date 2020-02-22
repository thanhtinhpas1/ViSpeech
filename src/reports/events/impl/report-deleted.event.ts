import {IEvent} from '@nestjs/cqrs';

export class ReportDeletedEvent implements IEvent {
  constructor(public readonly reportId: string) {}
}
