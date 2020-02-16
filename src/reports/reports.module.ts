import { CommandBus, EventBus, CqrsModule, QueryBus } from "@nestjs/cqrs";
import { OnModuleInit, Module } from "@nestjs/common";
import { CommandHandlers } from "./commands/handlers";
import { EventHandlers } from "./events/handlers";
import { ReportsSagas } from "./sagas/reports.sagas";
import { ReportsController } from "./controllers/reports.controller";
import { ReportsService } from "./services/reports.service";
import { ReportRepository } from "./repository/report.repository";
import { EventStoreModule } from "../core/event-store/event-store.module";
import { EventStore } from "../core/event-store/event-store";
import { ReportCreatedEvent } from "./events/impl/report-created.event";
import { ReportDeletedEvent } from "./events/impl/report-deleted.event";
import { ReportUpdatedEvent } from "./events/impl/report-updated.event";
import { ReportWelcomedEvent } from "./events/impl/report-welcomed.event";
import { TypeOrmModule } from "@nestjs/typeorm";
import { ReportDto } from "./dtos/reports.dto";
import { QueryHandlers } from "./queries/handler";

@Module({
  imports: [
    TypeOrmModule.forFeature([ReportDto]),
    CqrsModule,
    EventStoreModule.forFeature()
  ],
  controllers: [ReportsController],
  providers: [
    ReportsService,
    ReportsSagas,
    ...CommandHandlers,
    ...EventHandlers,
    ...QueryHandlers,
    ReportRepository
  ],
  exports: [ReportsService]
})
export class ReportsModule implements OnModuleInit {
  constructor(
    private readonly command$: CommandBus,
    private readonly query$: QueryBus,
    private readonly event$: EventBus,
    private readonly reportsSagas: ReportsSagas,
    private readonly eventStore: EventStore
  ) {}

  async onModuleInit() {
    this.eventStore.setEventHandlers(this.eventHandlers);
    this.eventStore.bridgeEventsTo((this.event$ as any).subject$);
    this.event$.publisher = this.eventStore;
    /** ------------ */
    this.event$.register(EventHandlers);
    this.command$.register(CommandHandlers);
    this.query$.register(QueryHandlers);
    this.event$.registerSagas([ReportsSagas]);
  }

  eventHandlers = {
    ReportCreatedEvent: data => new ReportCreatedEvent(data),
    ReportDeletedEvent: data => new ReportDeletedEvent(data),
    ReportUpdatedEvent: data => new ReportUpdatedEvent(data),
    ReportWelcomedEvent: data => new ReportWelcomedEvent(data)
  };
}
