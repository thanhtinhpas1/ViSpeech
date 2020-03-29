"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const common_1 = require("@nestjs/common");
const cqrs_1 = require("@nestjs/cqrs");
const typeorm_1 = require("@nestjs/typeorm");
const event_store_1 = require("../core/event-store/event-store");
const event_store_module_1 = require("../core/event-store/event-store.module");
const handlers_1 = require("./commands/handlers");
const reports_controller_1 = require("./controllers/reports.controller");
const reports_dto_1 = require("./dtos/reports.dto");
const handlers_2 = require("./events/handlers");
const report_created_event_1 = require("./events/impl/report-created.event");
const report_deleted_event_1 = require("./events/impl/report-deleted.event");
const report_updated_event_1 = require("./events/impl/report-updated.event");
const report_welcomed_event_1 = require("./events/impl/report-welcomed.event");
const handler_1 = require("./queries/handler");
const report_repository_1 = require("./repository/report.repository");
const reports_sagas_1 = require("./sagas/reports.sagas");
const reports_service_1 = require("./services/reports.service");
const auth_module_1 = require("../auth/auth.module");
let ReportsModule = class ReportsModule {
    constructor(command$, query$, event$, reportsSagas, eventStore) {
        this.command$ = command$;
        this.query$ = query$;
        this.event$ = event$;
        this.reportsSagas = reportsSagas;
        this.eventStore = eventStore;
        this.eventHandlers = {
            ReportCreatedEvent: (streamId, data) => new report_created_event_1.ReportCreatedEvent(streamId, data),
            ReportDeletedEvent: (streamId, data) => new report_deleted_event_1.ReportDeletedEvent(streamId, data),
            ReportUpdatedEvent: (streamId, data) => new report_updated_event_1.ReportUpdatedEvent(streamId, data),
            ReportWelcomedEvent: (streamId, data) => new report_welcomed_event_1.ReportWelcomedEvent(streamId, data)
        };
    }
    onModuleInit() {
        return __awaiter(this, void 0, void 0, function* () {
            this.eventStore.setEventHandlers(this.eventHandlers);
            this.eventStore.bridgeEventsTo(this.event$.subject$);
            this.event$.publisher = this.eventStore;
            this.event$.register(handlers_2.EventHandlers);
            this.command$.register(handlers_1.CommandHandlers);
            this.query$.register(handler_1.QueryHandlers);
            this.event$.registerSagas([reports_sagas_1.ReportsSagas]);
        });
    }
};
ReportsModule = __decorate([
    common_1.Module({
        imports: [
            typeorm_1.TypeOrmModule.forFeature([reports_dto_1.ReportDto]),
            event_store_module_1.EventStoreModule.forFeature(),
            common_1.forwardRef(() => auth_module_1.AuthModule),
        ],
        controllers: [reports_controller_1.ReportsController],
        providers: [
            reports_service_1.ReportsService,
            reports_sagas_1.ReportsSagas,
            ...handlers_1.CommandHandlers,
            ...handlers_2.EventHandlers,
            ...handler_1.QueryHandlers,
            report_repository_1.ReportRepository,
            cqrs_1.QueryBus, cqrs_1.EventBus, event_store_1.EventStore, cqrs_1.CommandBus, cqrs_1.EventPublisher,
        ],
        exports: [reports_service_1.ReportsService]
    }),
    __metadata("design:paramtypes", [cqrs_1.CommandBus,
        cqrs_1.QueryBus,
        cqrs_1.EventBus,
        reports_sagas_1.ReportsSagas,
        event_store_1.EventStore])
], ReportsModule);
exports.ReportsModule = ReportsModule;
//# sourceMappingURL=reports.module.js.map