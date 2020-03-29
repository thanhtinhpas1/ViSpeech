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
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
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
const auth_module_1 = require("auth/auth.module");
const event_store_module_1 = require("core/event-store/event-store.module");
const handlers_1 = require("tokens/commands/handlers");
const token_repository_1 = require("tokens/repository/token.repository");
const tokens_module_1 = require("tokens/tokens.module");
const typeorm_2 = require("typeorm");
const constant_1 = require("../common/constant");
const event_store_1 = require("../core/event-store/event-store");
const roles_dto_1 = require("../roles/dtos/roles.dto");
const utils_1 = require("../utils");
const handlers_2 = require("./commands/handlers");
const users_controller_1 = require("./controllers/users.controller");
const users_dto_1 = require("./dtos/users.dto");
const handlers_3 = require("./events/handlers");
const password_changed_event_1 = require("./events/impl/password-changed.event");
const user_created_event_1 = require("./events/impl/user-created.event");
const user_deleted_event_1 = require("./events/impl/user-deleted.event");
const user_updated_event_1 = require("./events/impl/user-updated.event");
const user_welcomed_event_1 = require("./events/impl/user-welcomed.event");
const handler_1 = require("./queries/handler");
const user_repository_1 = require("./repository/user.repository");
const users_sagas_1 = require("./sagas/users.sagas");
const users_service_1 = require("./services/users.service");
const verify_email_sent_event_1 = require("./events/impl/verify-email-sent.event");
const email_verified_event_1 = require("./events/impl/email-verified.event");
let UsersModule = class UsersModule {
    constructor(command$, query$, event$, eventStore, repository) {
        this.command$ = command$;
        this.query$ = query$;
        this.event$ = event$;
        this.eventStore = eventStore;
        this.repository = repository;
        this.eventHandlers = {
            UserCreationStartedEvent: (streamId, data) => new user_created_event_1.UserCreationStartedEvent(streamId, data),
            UserCreatedEvent: (streamId, data) => new user_created_event_1.UserCreatedEvent(streamId, data),
            UserCreatedSuccessEvent: (streamId, data) => new user_created_event_1.UserCreatedSuccessEvent(streamId, data),
            UserCreatedFailedEvent: (streamId, data, error) => new user_created_event_1.UserCreatedFailedEvent(streamId, data, error),
            UserUpdatedEvent: (streamId, data) => new user_updated_event_1.UserUpdatedEvent(streamId, data),
            UserUpdatedSuccessEvent: (streamId, data) => new user_updated_event_1.UserUpdatedSuccessEvent(streamId, data),
            UserUpdatedFailedEvent: (streamId, data, error) => new user_updated_event_1.UserUpdatedFailedEvent(streamId, data, error),
            PasswordChangedEvent: (streamId, userId, newPassword, oldPassword) => new password_changed_event_1.PasswordChangedEvent(streamId, userId, newPassword, oldPassword),
            UserDeletedEvent: (streamId, data) => new user_deleted_event_1.UserDeletedEvent(streamId, data),
            UserDeletedSuccessEvent: (streamId, data) => new user_deleted_event_1.UserDeletedSuccessEvent(streamId, data),
            UserDeletedFailedEvent: (streamId, data, error) => new user_deleted_event_1.UserDeletedFailedEvent(streamId, data, error),
            UserWelcomedEvent: (streamId, data) => new user_welcomed_event_1.UserWelcomedEvent(streamId, data),
            VerifyEmailSentEvent: (streamId, data) => new verify_email_sent_event_1.VerifyEmailSentEvent(streamId, data),
            VerifyEmailSentSuccessEvent: (streamId, data) => new verify_email_sent_event_1.VerifyEmailSentSuccessEvent(streamId, data),
            VerifyEmailSentFailedEvent: (streamId, data, error) => new verify_email_sent_event_1.VerifyEmailSentFailedEvent(streamId, data, error),
            EmailVerifiedEvent: (streamId, data) => new email_verified_event_1.EmailVerifiedEvent(streamId, data),
        };
    }
    onModuleInit() {
        return __awaiter(this, void 0, void 0, function* () {
            this.eventStore.setEventHandlers(Object.assign(Object.assign({}, this.eventHandlers), tokens_module_1.TokensModule.eventHandlers));
            yield this.eventStore.bridgeEventsTo(this.event$.subject$);
            this.event$.publisher = this.eventStore;
            this.event$.register(handlers_3.EventHandlers);
            this.command$.register([...handlers_2.CommandHandlers, ...handlers_1.CommandHandlers]);
            this.query$.register(handler_1.QueryHandlers);
            this.event$.registerSagas([users_sagas_1.UsersSagas]);
            try {
                const admin = new users_dto_1.UserDto('admin', 'admin', 'admin', utils_1.Utils.hashPassword('admin'), 'admin@vispeech.com', [new roles_dto_1.RoleDto(constant_1.CONSTANTS.ROLE.ADMIN)]);
                common_1.Logger.log('Seed admin account success', 'UserModule');
                yield this.repository.save(admin);
            }
            catch (e) {
                common_1.Logger.warn('Seed admin account existed', 'UserModule');
            }
        });
    }
};
UsersModule = __decorate([
    common_1.Module({
        imports: [
            typeorm_1.TypeOrmModule.forFeature([users_dto_1.UserDto]),
            common_1.forwardRef(() => auth_module_1.AuthModule),
            event_store_module_1.EventStoreModule.forFeature(),
        ],
        controllers: [users_controller_1.UsersController],
        providers: [
            users_service_1.UsersService,
            users_sagas_1.UsersSagas, ...handlers_2.CommandHandlers, ...handlers_1.CommandHandlers,
            ...handlers_3.EventHandlers, ...handler_1.QueryHandlers,
            user_repository_1.UserRepository, token_repository_1.TokenRepository,
            cqrs_1.QueryBus, cqrs_1.EventBus, event_store_1.EventStore, cqrs_1.CommandBus, cqrs_1.EventPublisher,
        ],
        exports: [users_service_1.UsersService],
    }),
    __param(4, typeorm_1.InjectRepository(users_dto_1.UserDto)),
    __metadata("design:paramtypes", [cqrs_1.CommandBus,
        cqrs_1.QueryBus,
        cqrs_1.EventBus,
        event_store_1.EventStore,
        typeorm_2.Repository])
], UsersModule);
exports.UsersModule = UsersModule;
//# sourceMappingURL=users.module.js.map