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
var PermissionsModule_1;
Object.defineProperty(exports, "__esModule", { value: true });
const common_1 = require("@nestjs/common");
const cqrs_1 = require("@nestjs/cqrs");
const typeorm_1 = require("@nestjs/typeorm");
const event_store_1 = require("core/event-store/event-store");
const event_store_module_1 = require("core/event-store/event-store.module");
const handlers_1 = require("./commands/handlers");
const permissions_controller_1 = require("./controllers/permissions.controller");
const permissions_dto_1 = require("./dtos/permissions.dto");
const handlers_2 = require("./events/handlers");
const permission_created_event_1 = require("./events/impl/permission-created.event");
const permission_deleted_event_1 = require("./events/impl/permission-deleted.event");
const permission_updated_event_1 = require("./events/impl/permission-updated.event");
const permission_welcomed_event_1 = require("./events/impl/permission-welcomed.event");
const handler_1 = require("./queries/handler");
const permission_repository_1 = require("./repository/permission.repository");
const permissions_sagas_1 = require("./sagas/permissions.sagas");
const permissions_service_1 = require("./services/permissions.service");
const auth_module_1 = require("../auth/auth.module");
const users_dto_1 = require("users/dtos/users.dto");
const projects_dto_1 = require("projects/dtos/projects.dto");
const permission_assign_email_sent_event_1 = require("./events/impl/permission-assign-email-sent.event");
const permission_assign_replied_event_1 = require("./events/impl/permission-assign-replied.event");
let PermissionsModule = PermissionsModule_1 = class PermissionsModule {
    constructor(command$, query$, event$, eventStore) {
        this.command$ = command$;
        this.query$ = query$;
        this.event$ = event$;
        this.eventStore = eventStore;
    }
    onModuleInit() {
        return __awaiter(this, void 0, void 0, function* () {
            this.eventStore.setEventHandlers(PermissionsModule_1.eventHandlers);
            yield this.eventStore.bridgeEventsTo(this.event$.subject$);
            this.event$.publisher = this.eventStore;
            this.event$.register(handlers_2.EventHandlers);
            this.command$.register(handlers_1.CommandHandlers);
            this.query$.register(handler_1.QueryHandlers);
            this.event$.registerSagas([permissions_sagas_1.PermissionsSagas]);
        });
    }
};
PermissionsModule.eventHandlers = {
    PermissionCreatedEvent: (streamId, data) => new permission_created_event_1.PermissionCreatedEvent(streamId, data),
    PermissionCreatedSuccessEvent: (streamId, data) => new permission_created_event_1.PermissionCreatedSuccessEvent(streamId, data),
    PermissionCreatedFailedEvent: (streamId, data, error) => new permission_created_event_1.PermissionCreatedFailedEvent(streamId, data, error),
    PermissionDeletedEvent: (streamId, data) => new permission_deleted_event_1.PermissionDeletedEvent(streamId, data),
    PermissionUpdatedEvent: (streamId, data) => new permission_updated_event_1.PermissionUpdatedEvent(streamId, data),
    PermissionWelcomedEvent: (streamId, data) => new permission_welcomed_event_1.PermissionWelcomedEvent(streamId, data),
    PermissionAssignEmailSentEvent: (streamId, data) => new permission_assign_email_sent_event_1.PermissionAssignEmailSentEvent(streamId, data),
    PermissionAssignEmailSentSuccessEvent: (streamId, data) => new permission_assign_email_sent_event_1.PermissionAssignEmailSentSuccessEvent(streamId, data),
    PermissionAssignEmailSentFailedEvent: (streamId, data, error) => new permission_assign_email_sent_event_1.PermissionAssignEmailSentFailedEvent(streamId, data, error),
    PermissionAssignRepliedEvent: (streamId, data) => new permission_assign_replied_event_1.PermissionAssignRepliedEvent(streamId, data),
};
PermissionsModule = PermissionsModule_1 = __decorate([
    common_1.Module({
        imports: [
            typeorm_1.TypeOrmModule.forFeature([permissions_dto_1.PermissionDto, users_dto_1.UserDto, projects_dto_1.ProjectDto]),
            common_1.forwardRef(() => auth_module_1.AuthModule),
            event_store_module_1.EventStoreModule.forFeature(),
        ],
        controllers: [permissions_controller_1.PermissionsController],
        providers: [
            permissions_service_1.PermissionsService,
            permissions_sagas_1.PermissionsSagas,
            ...handlers_1.CommandHandlers,
            ...handlers_2.EventHandlers,
            ...handler_1.QueryHandlers,
            permission_repository_1.PermissionRepository,
            cqrs_1.QueryBus, cqrs_1.EventBus, event_store_1.EventStore, cqrs_1.CommandBus, cqrs_1.EventPublisher,
        ],
        exports: [permissions_service_1.PermissionsService],
    }),
    __metadata("design:paramtypes", [cqrs_1.CommandBus,
        cqrs_1.QueryBus,
        cqrs_1.EventBus,
        event_store_1.EventStore])
], PermissionsModule);
exports.PermissionsModule = PermissionsModule;
//# sourceMappingURL=permissions.module.js.map