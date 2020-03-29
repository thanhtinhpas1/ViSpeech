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
const token_created_event_1 = require("../impl/token-created.event");
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const token_types_dto_1 = require("tokens/dtos/token-types.dto");
const tokens_dto_1 = require("tokens/dtos/tokens.dto");
const typeorm_2 = require("typeorm");
const utils_1 = require("utils");
let TokenCreatedHandler = class TokenCreatedHandler {
    constructor(repository, repositoryTokenType, eventBus) {
        this.repository = repository;
        this.repositoryTokenType = repositoryTokenType;
        this.eventBus = eventBus;
    }
    handle(event) {
        return __awaiter(this, void 0, void 0, function* () {
            common_1.Logger.log(event.tokenDto._id, 'TokenCreatedEvent');
            const { streamId, tokenDto } = event;
            let token = JSON.parse(JSON.stringify(tokenDto));
            let tokenTypeDto = null;
            try {
                if (token.tokenTypeId) {
                    tokenTypeDto = yield this.repositoryTokenType.findOne({ _id: token.tokenTypeId });
                    if (!tokenTypeDto) {
                        throw new common_1.NotFoundException(`Token type with _id ${token.tokenTypeId} does not exist.`);
                    }
                }
                else if (token.tokenType) {
                    tokenTypeDto = yield this.repositoryTokenType.findOne({ name: token.tokenType });
                }
                token.tokenTypeId = tokenTypeDto._id;
                token.minutes = tokenTypeDto.minutes;
                token = utils_1.Utils.removePropertiesFromObject(token, ['tokenType', 'orderId']);
                yield this.repository.save(token);
                this.eventBus.publish(new token_created_event_1.TokenCreatedSuccessEvent(streamId, tokenDto));
            }
            catch (error) {
                this.eventBus.publish(new token_created_event_1.TokenCreatedFailedEvent(streamId, tokenDto, error));
            }
        });
    }
};
TokenCreatedHandler = __decorate([
    cqrs_1.EventsHandler(token_created_event_1.TokenCreatedEvent),
    __param(0, typeorm_1.InjectRepository(tokens_dto_1.TokenDto)),
    __param(1, typeorm_1.InjectRepository(token_types_dto_1.TokenTypeDto)),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        typeorm_2.Repository,
        cqrs_1.EventBus])
], TokenCreatedHandler);
exports.TokenCreatedHandler = TokenCreatedHandler;
let TokenCreatedSuccessHandler = class TokenCreatedSuccessHandler {
    handle(event) {
        common_1.Logger.log(event.tokenDto._id, 'TokenCreatedSuccessEvent');
    }
};
TokenCreatedSuccessHandler = __decorate([
    cqrs_1.EventsHandler(token_created_event_1.TokenCreatedSuccessEvent)
], TokenCreatedSuccessHandler);
exports.TokenCreatedSuccessHandler = TokenCreatedSuccessHandler;
let TokenCreatedFailedHandler = class TokenCreatedFailedHandler {
    handle(event) {
        common_1.Logger.log(event.error, 'TokenCreatedFailedEvent');
    }
};
TokenCreatedFailedHandler = __decorate([
    cqrs_1.EventsHandler(token_created_event_1.TokenCreatedFailedEvent)
], TokenCreatedFailedHandler);
exports.TokenCreatedFailedHandler = TokenCreatedFailedHandler;
//# sourceMappingURL=token-created.handler.js.map