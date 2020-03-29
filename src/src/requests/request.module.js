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
Object.defineProperty(exports, "__esModule", { value: true });
const common_1 = require("@nestjs/common");
const requests_controller_1 = require("./controllers/requests.controller");
const typeorm_1 = require("@nestjs/typeorm");
const platform_express_1 = require("@nestjs/platform-express");
const auth_module_1 = require("../auth/auth.module");
const cqrs_1 = require("@nestjs/cqrs");
const event_store_1 = require("../core/event-store/event-store");
const handler_1 = require("./events/handler");
const handler_2 = require("./commands/handler");
const handler_3 = require("./queries/handler");
const requests_dto_1 = require("./dtos/requests.dto");
const event_store_module_1 = require("../core/event-store/event-store.module");
const tokens_dto_1 = require("../tokens/dtos/tokens.dto");
const auth_service_1 = require("auth/auth.service");
const token_repository_1 = require("tokens/repository/token.repository");
const request_service_1 = require("./services/request.service");
const call_asr_event_1 = require("./events/impl/call-asr.event");
const call_asr_sagas_1 = require("./sagas/call-asr.sagas");
const request_repository_1 = require("./repository/request.repository");
let RequestModule = class RequestModule {
    constructor(command$, query$, event$, eventStore) {
        this.command$ = command$;
        this.query$ = query$;
        this.event$ = event$;
        this.eventStore = eventStore;
        this.eventHandlers = {
            CallAsrEvent: (streamId, requestDto, tokenDto) => new call_asr_event_1.CallAsrEvent(streamId, requestDto, tokenDto),
        };
    }
    onModuleInit() {
        this.eventStore.setEventHandlers(this.eventHandlers);
        this.eventStore.bridgeEventsTo(this.event$.subject$);
        this.event$.publisher = this.eventStore;
        this.event$.register(handler_1.EventHandlers);
        this.command$.register(handler_2.CommandHandlers);
        this.query$.register(handler_3.QueryHandlers);
        this.event$.registerSagas([call_asr_sagas_1.CallAsrSagas]);
    }
};
RequestModule = __decorate([
    common_1.Module({
        imports: [
            typeorm_1.TypeOrmModule.forFeature([requests_dto_1.RequestDto, tokens_dto_1.TokenDto]),
            event_store_module_1.EventStoreModule.forFeature(),
            platform_express_1.MulterModule.register({}),
            common_1.forwardRef(() => auth_module_1.AuthModule),
        ],
        controllers: [
            requests_controller_1.AsrController,
        ],
        providers: [
            cqrs_1.QueryBus, cqrs_1.EventBus, event_store_1.EventStore, cqrs_1.CommandBus, cqrs_1.EventPublisher,
            auth_service_1.AuthService, token_repository_1.TokenRepository, request_service_1.RequestService,
            request_repository_1.RequestRepository, ...handler_2.CommandHandlers,
            call_asr_sagas_1.CallAsrSagas,
        ],
    }),
    __metadata("design:paramtypes", [cqrs_1.CommandBus,
        cqrs_1.QueryBus,
        cqrs_1.EventBus,
        event_store_1.EventStore])
], RequestModule);
exports.RequestModule = RequestModule;
//# sourceMappingURL=request.module.js.map