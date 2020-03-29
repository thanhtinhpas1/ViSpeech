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
var TokensModule_1;
Object.defineProperty(exports, "__esModule", { value: true });
const common_1 = require("@nestjs/common");
const cqrs_1 = require("@nestjs/cqrs");
const typeorm_1 = require("@nestjs/typeorm");
const constant_1 = require("common/constant");
const event_store_1 = require("core/event-store/event-store");
const event_store_module_1 = require("core/event-store/event-store.module");
const typeorm_2 = require("typeorm");
const handlers_1 = require("./commands/handlers");
const tokens_controller_1 = require("./controllers/tokens.controller");
const token_types_dto_1 = require("./dtos/token-types.dto");
const tokens_dto_1 = require("./dtos/tokens.dto");
const handlers_2 = require("./events/handlers");
const token_created_event_1 = require("./events/impl/token-created.event");
const token_deleted_event_1 = require("./events/impl/token-deleted.event");
const token_updated_event_1 = require("./events/impl/token-updated.event");
const token_welcomed_event_1 = require("./events/impl/token-welcomed.event");
const handler_1 = require("./queries/handler");
const token_repository_1 = require("./repository/token.repository");
const tokens_sagas_1 = require("./sagas/tokens.sagas");
const tokens_service_1 = require("./services/tokens.service");
const free_token_created_event_1 = require("./events/impl/free-token-created.event");
const ordered_token_created_event_1 = require("./events/impl/ordered-token-created.event");
const auth_module_1 = require("../auth/auth.module");
let TokensModule = TokensModule_1 = class TokensModule {
    constructor(command$, query$, event$, eventStore) {
        this.command$ = command$;
        this.query$ = query$;
        this.event$ = event$;
        this.eventStore = eventStore;
    }
    onModuleInit() {
        return __awaiter(this, void 0, void 0, function* () {
            this.eventStore.setEventHandlers(TokensModule_1.eventHandlers);
            yield this.eventStore.bridgeEventsTo(this.event$.subject$);
            this.event$.publisher = this.eventStore;
            this.event$.register(handlers_2.EventHandlers);
            this.command$.register(handlers_1.CommandHandlers);
            this.query$.register(handler_1.QueryHandlers);
            this.event$.registerSagas([tokens_sagas_1.TokensSagas]);
            this.persistTokenTypesToDB();
        });
    }
    persistTokenTypesToDB() {
        return __awaiter(this, void 0, void 0, function* () {
            const freeTokenType = yield typeorm_2.getMongoRepository(token_types_dto_1.TokenTypeDto).find({
                name: constant_1.CONSTANTS.TOKEN_TYPE.FREE,
            });
            const tokenType_50 = yield typeorm_2.getMongoRepository(token_types_dto_1.TokenTypeDto).find({
                name: constant_1.CONSTANTS.TOKEN_TYPE['50-MINS'],
            });
            const tokenType_200 = yield typeorm_2.getMongoRepository(token_types_dto_1.TokenTypeDto).find({
                name: constant_1.CONSTANTS.TOKEN_TYPE['200-MINS'],
            });
            const tokenType_500 = yield typeorm_2.getMongoRepository(token_types_dto_1.TokenTypeDto).find({
                name: constant_1.CONSTANTS.TOKEN_TYPE['500-MINS'],
            });
            if (!freeTokenType[0] && !tokenType_50[0] && !tokenType_200[0] && !tokenType_500[0]) {
                typeorm_2.getMongoRepository(token_types_dto_1.TokenTypeDto).save(new token_types_dto_1.TokenTypeDto(constant_1.CONSTANTS.TOKEN_TYPE.FREE, 10, 0));
                typeorm_2.getMongoRepository(token_types_dto_1.TokenTypeDto).save(new token_types_dto_1.TokenTypeDto(constant_1.CONSTANTS.TOKEN_TYPE['50-MINS'], 50, 5));
                typeorm_2.getMongoRepository(token_types_dto_1.TokenTypeDto).save(new token_types_dto_1.TokenTypeDto(constant_1.CONSTANTS.TOKEN_TYPE['200-MINS'], 200, 10));
                typeorm_2.getMongoRepository(token_types_dto_1.TokenTypeDto).save(new token_types_dto_1.TokenTypeDto(constant_1.CONSTANTS.TOKEN_TYPE['500-MINS'], 500, 20));
            }
        });
    }
};
TokensModule.eventHandlers = {
    TokenCreatedEvent: (streamId, data) => new token_created_event_1.TokenCreatedEvent(streamId, data),
    TokenCreatedSuccessEvent: (streamId, data) => new token_created_event_1.TokenCreatedSuccessEvent(streamId, data),
    TokenCreatedFailedEvent: (streamId, data, error) => new token_created_event_1.TokenCreatedFailedEvent(streamId, data, error),
    TokenDeletedEvent: (streamId, data) => new token_deleted_event_1.TokenDeletedEvent(streamId, data),
    TokenDeletedByUserIdEvent: (streamId, data) => new token_deleted_event_1.TokenDeletedByUserIdEvent(streamId, data),
    TokenUpdatedEvent: (streamId, data) => new token_updated_event_1.TokenUpdatedEvent(streamId, data),
    TokenWelcomedEvent: (streamId, data) => new token_welcomed_event_1.TokenWelcomedEvent(streamId, data),
    FreeTokenCreatedEvent: (streamId, data) => new free_token_created_event_1.FreeTokenCreatedEvent(streamId, data),
    FreeTokenCreatedSuccessEvent: (streamId, data) => new free_token_created_event_1.FreeTokenCreatedSuccessEvent(streamId, data),
    FreeTokenCreatedFailedEvent: (streamId, data, error) => new free_token_created_event_1.FreeTokenCreatedFailedEvent(streamId, data, error),
    OrderedTokenCreatedEvent: (streamId, data) => new ordered_token_created_event_1.OrderedTokenCreatedEvent(streamId, data),
    OrderedTokenCreatedSuccessEvent: (streamId, data) => new ordered_token_created_event_1.OrderedTokenCreatedSuccessEvent(streamId, data),
    OrderedTokenCreatedFailedEvent: (streamId, data, error) => new ordered_token_created_event_1.OrderedTokenCreatedFailedEvent(streamId, data, error),
};
TokensModule = TokensModule_1 = __decorate([
    common_1.Module({
        imports: [
            typeorm_1.TypeOrmModule.forFeature([tokens_dto_1.TokenDto, token_types_dto_1.TokenTypeDto]),
            common_1.forwardRef(() => auth_module_1.AuthModule),
            event_store_module_1.EventStoreModule.forFeature(),
        ],
        controllers: [tokens_controller_1.TokensController],
        providers: [
            tokens_service_1.TokensService,
            tokens_sagas_1.TokensSagas,
            ...handlers_1.CommandHandlers,
            ...handlers_2.EventHandlers,
            ...handler_1.QueryHandlers,
            token_repository_1.TokenRepository,
            cqrs_1.QueryBus, cqrs_1.EventBus, event_store_1.EventStore, cqrs_1.CommandBus, cqrs_1.EventPublisher,
        ],
        exports: [tokens_service_1.TokensService],
    }),
    __metadata("design:paramtypes", [cqrs_1.CommandBus,
        cqrs_1.QueryBus,
        cqrs_1.EventBus,
        event_store_1.EventStore])
], TokensModule);
exports.TokensModule = TokensModule;
//# sourceMappingURL=tokens.module.js.map