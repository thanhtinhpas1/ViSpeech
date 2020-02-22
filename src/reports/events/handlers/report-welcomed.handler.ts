import {EventsHandler, IEventHandler} from '@nestjs/cqrs';
import {ReportWelcomedEvent} from '../impl/report-welcomed.event';
import {Logger} from '@nestjs/common';

@EventsHandler(ReportWelcomedEvent)
export class ReportWelcomedHandler implements IEventHandler<ReportWelcomedEvent> {
  handle(event: ReportWelcomedEvent) {
    Logger.log(event, "ReportWelcomedEvent"); // write here
  }
}
