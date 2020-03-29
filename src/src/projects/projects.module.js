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
var ProjectsModule_1;
Object.defineProperty(exports, "__esModule", { value: true });
const common_1 = require("@nestjs/common");
const cqrs_1 = require("@nestjs/cqrs");
const typeorm_1 = require("@nestjs/typeorm");
const event_store_1 = require("core/event-store/event-store");
const event_store_module_1 = require("core/event-store/event-store.module");
const handlers_1 = require("./commands/handlers");
const projects_controller_1 = require("./controllers/projects.controller");
const projects_dto_1 = require("./dtos/projects.dto");
const handlers_2 = require("./events/handlers");
const project_created_event_1 = require("./events/impl/project-created.event");
const project_deleted_event_1 = require("./events/impl/project-deleted.event");
const project_updated_event_1 = require("./events/impl/project-updated.event");
const project_welcomed_event_1 = require("./events/impl/project-welcomed.event");
const handler_1 = require("./queries/handler");
const project_repository_1 = require("./repository/project.repository");
const projects_sagas_1 = require("./sagas/projects.sagas");
const projects_service_1 = require("./services/projects.service");
const auth_module_1 = require("auth/auth.module");
const permissions_dto_1 = require("permissions/dtos/permissions.dto");
let ProjectsModule = ProjectsModule_1 = class ProjectsModule {
    constructor(command$, query$, event$, eventStore) {
        this.command$ = command$;
        this.query$ = query$;
        this.event$ = event$;
        this.eventStore = eventStore;
    }
    onModuleInit() {
        return __awaiter(this, void 0, void 0, function* () {
            this.eventStore.setEventHandlers(ProjectsModule_1.eventHandlers);
            yield this.eventStore.bridgeEventsTo(this.event$.subject$);
            this.event$.publisher = this.eventStore;
            this.event$.register(handlers_2.EventHandlers);
            this.command$.register(handlers_1.CommandHandlers);
            this.query$.register(handler_1.QueryHandlers);
            this.event$.registerSagas([projects_sagas_1.ProjectsSagas]);
        });
    }
};
ProjectsModule.eventHandlers = {
    ProjectCreatedEvent: (streamId, data) => new project_created_event_1.ProjectCreatedEvent(streamId, data),
    ProjectCreatedSuccessEvent: (streamId, data) => new project_created_event_1.ProjectCreatedSuccessEvent(streamId, data),
    ProjectCreatedFailedEvent: (streamId, data, error) => new project_created_event_1.ProjectCreatedFailedEvent(streamId, data, error),
    ProjectDeletedEvent: (streamId, data) => new project_deleted_event_1.ProjectDeletedEvent(streamId, data),
    ProjectUpdatedEvent: (streamId, data) => new project_updated_event_1.ProjectUpdatedEvent(streamId, data),
    ProjectWelcomedEvent: (streamId, data) => new project_welcomed_event_1.ProjectWelcomedEvent(streamId, data),
};
ProjectsModule = ProjectsModule_1 = __decorate([
    common_1.Module({
        imports: [
            typeorm_1.TypeOrmModule.forFeature([projects_dto_1.ProjectDto, permissions_dto_1.PermissionDto]),
            auth_module_1.AuthModule,
            event_store_module_1.EventStoreModule.forFeature(),
        ],
        controllers: [projects_controller_1.ProjectsController],
        providers: [
            projects_service_1.ProjectsService,
            projects_sagas_1.ProjectsSagas,
            ...handlers_1.CommandHandlers,
            ...handlers_2.EventHandlers,
            ...handler_1.QueryHandlers,
            project_repository_1.ProjectRepository,
            cqrs_1.QueryBus, cqrs_1.EventBus, event_store_1.EventStore, cqrs_1.CommandBus, cqrs_1.EventPublisher,
        ],
        exports: [projects_service_1.ProjectsService],
    }),
    __metadata("design:paramtypes", [cqrs_1.CommandBus,
        cqrs_1.QueryBus,
        cqrs_1.EventBus,
        event_store_1.EventStore])
], ProjectsModule);
exports.ProjectsModule = ProjectsModule;
//# sourceMappingURL=projects.module.js.map