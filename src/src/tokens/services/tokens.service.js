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
const create_token_command_1 = require("../commands/impl/create-token.command");
const update_token_command_1 = require("../commands/impl/update-token.command");
const delete_token_command_1 = require("../commands/impl/delete-token.command");
const get_tokens_query_1 = require("tokens/queries/impl/get-tokens.query");
const get_tokens_by_userId_1 = require("tokens/queries/impl/get-tokens-by-userId");
const find_token_query_1 = require("tokens/queries/impl/find-token.query");
let TokensService = class TokensService {
    constructor(commandBus, queryBus) {
        this.commandBus = commandBus;
        this.queryBus = queryBus;
    }
    createToken(streamId, tokenDto) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this.commandBus.execute(new create_token_command_1.CreateTokenCommand(streamId, tokenDto));
        });
    }
    updateToken(streamId, tokenDto) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this.commandBus.execute(new update_token_command_1.UpdateTokenCommand(streamId, tokenDto));
        });
    }
    deleteToken(streamId, tokenIdDto) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this.commandBus.execute(new delete_token_command_1.DeleteTokenCommand(streamId, tokenIdDto));
        });
    }
    getTokens(getTokensQuery) {
        return __awaiter(this, void 0, void 0, function* () {
            const query = new get_tokens_query_1.GetTokensQuery();
            Object.assign(query, getTokensQuery);
            return yield this.queryBus.execute(query);
        });
    }
    findTokenTypes(getTokenTypesQuery) {
        return __awaiter(this, void 0, void 0, function* () {
            const query = new get_tokens_query_1.GetTokenTypesQuery();
            Object.assign(query, getTokenTypesQuery);
            return yield this.queryBus.execute(query);
        });
    }
    getTokensByUserId(getTokensByUserIdQuery) {
        return __awaiter(this, void 0, void 0, function* () {
            const query = new get_tokens_by_userId_1.GetTokensByUserIdQuery(getTokensByUserIdQuery.userId);
            return yield this.queryBus.execute(query);
        });
    }
    findOne(findTokenQuery) {
        return __awaiter(this, void 0, void 0, function* () {
            const query = new find_token_query_1.FindTokenQuery(findTokenQuery.id);
            return yield this.queryBus.execute(query);
        });
    }
};
TokensService = __decorate([
    common_1.Injectable(),
    __metadata("design:paramtypes", [cqrs_1.CommandBus,
        cqrs_1.QueryBus])
], TokensService);
exports.TokensService = TokensService;
//# sourceMappingURL=tokens.service.js.map