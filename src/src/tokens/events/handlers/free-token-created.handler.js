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
const cqrs_1 = require("@nestjs/cqrs");
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const tokens_dto_1 = require("tokens/dtos/tokens.dto");
const typeorm_2 = require("typeorm");
const token_types_dto_1 = require("tokens/dtos/token-types.dto");
const free_token_created_event_1 = require("../impl/free-token-created.event");
const constant_1 = require("common/constant");
const utils_1 = require("utils");
let FreeTokenCreatedHandler = class FreeTokenCreatedHandler {
    constructor(repository, repositoryTokenType, eventBus) {
        this.repository = repository;
        this.repositoryTokenType = repositoryTokenType;
        this.eventBus = eventBus;
    }
    handle(event) {
        return __awaiter(this, void 0, void 0, function* () {
            common_1.Logger.log(event.tokenDto._id, 'FreeTokenCreatedEvent');
            const { streamId, tokenDto } = event;
            let token = JSON.parse(JSON.stringify(tokenDto));
            try {
                const tokenTypeDto = yield this.repositoryTokenType.findOne({ name: constant_1.CONSTANTS.TOKEN_TYPE.FREE });
                token.tokenTypeId = tokenTypeDto._id;
                token.minutes = tokenTypeDto.minutes;
                token = utils_1.Utils.removePropertiesFromObject(token, ['tokenType', 'orderId']);
                yield this.repository.save(token);
                this.eventBus.publish(new free_token_created_event_1.FreeTokenCreatedSuccessEvent(streamId, tokenDto));
            }
            catch (error) {
                this.eventBus.publish(new free_token_created_event_1.FreeTokenCreatedFailedEvent(streamId, tokenDto, error));
            }
        });
    }
};
FreeTokenCreatedHandler = __decorate([
    cqrs_1.EventsHandler(free_token_created_event_1.FreeTokenCreatedEvent),
    __param(0, typeorm_1.InjectRepository(tokens_dto_1.TokenDto)),
    __param(1, typeorm_1.InjectRepository(token_types_dto_1.TokenTypeDto)),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        typeorm_2.Repository,
        cqrs_1.EventBus])
], FreeTokenCreatedHandler);
exports.FreeTokenCreatedHandler = FreeTokenCreatedHandler;
let FreeTokenCreatedSuccessHandler = class FreeTokenCreatedSuccessHandler {
    handle(event) {
        common_1.Logger.log(event.tokenDto._id, 'FreeTokenCreatedSuccessEvent');
    }
};
FreeTokenCreatedSuccessHandler = __decorate([
    cqrs_1.EventsHandler(free_token_created_event_1.FreeTokenCreatedSuccessEvent)
], FreeTokenCreatedSuccessHandler);
exports.FreeTokenCreatedSuccessHandler = FreeTokenCreatedSuccessHandler;
let FreeTokenCreatedFailedHandler = class FreeTokenCreatedFailedHandler {
    handle(event) {
        common_1.Logger.log(event.error, 'FreeTokenCreatedFailedEvent');
    }
};
FreeTokenCreatedFailedHandler = __decorate([
    cqrs_1.EventsHandler(free_token_created_event_1.FreeTokenCreatedFailedEvent)
], FreeTokenCreatedFailedHandler);
exports.FreeTokenCreatedFailedHandler = FreeTokenCreatedFailedHandler;
//# sourceMappingURL=free-token-created.handler.js.map