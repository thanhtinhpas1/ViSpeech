import { IEventHandler } from '@nestjs/cqrs';
import { ReportWelcomedEvent } from '../impl/report-welcomed.event';
export declare class ReportWelcomedHandler implements IEventHandler<ReportWelcomedEvent> {
    handle(event: ReportWelcomedEvent): void;
}
