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
const passport_1 = require("@nestjs/passport");
const swagger_1 = require("@nestjs/swagger");
const constant_1 = require("common/constant");
const find_token_query_1 = require("tokens/queries/impl/find-token.query");
const get_tokens_by_userId_1 = require("tokens/queries/impl/get-tokens-by-userId");
const get_tokens_query_1 = require("tokens/queries/impl/get-tokens.query");
const tokens_dto_1 = require("../dtos/tokens.dto");
const tokens_service_1 = require("../services/tokens.service");
const roles_decorator_1 = require("auth/roles.decorator");
const token_guard_1 = require("auth/guards/token.guard");
let TokensController = class TokensController {
    constructor(tokensService) {
        this.tokensService = tokensService;
    }
    createToken(tokenDto) {
        return __awaiter(this, void 0, void 0, function* () {
            const streamId = tokenDto._id;
            return this.tokensService.createToken(streamId, tokenDto);
        });
    }
    updateToken(tokenIdDto, tokenDto) {
        return __awaiter(this, void 0, void 0, function* () {
            const streamId = tokenIdDto._id;
            return this.tokensService.updateToken(streamId, Object.assign(Object.assign({}, tokenDto), { _id: tokenIdDto._id }));
        });
    }
    deleteToken(tokenIdDto) {
        return __awaiter(this, void 0, void 0, function* () {
            const streamId = tokenIdDto._id;
            return this.tokensService.deleteToken(streamId, tokenIdDto);
        });
    }
    getTokens(getTokensQuery) {
        return __awaiter(this, void 0, void 0, function* () {
            return this.tokensService.getTokens(getTokensQuery);
        });
    }
    getTokensByUserId(getTokensByUserIdQuery) {
        return __awaiter(this, void 0, void 0, function* () {
            return this.tokensService.getTokensByUserId(getTokensByUserIdQuery);
        });
    }
    findOneToken(findTokenQuery) {
        return __awaiter(this, void 0, void 0, function* () {
            return this.tokensService.findOne(findTokenQuery);
        });
    }
    getTokenTypes(getTokenTypesQuery) {
        return __awaiter(this, void 0, void 0, function* () {
            return this.tokensService.findTokenTypes(getTokenTypesQuery);
        });
    }
};
__decorate([
    swagger_1.ApiOperation({ tags: ['Create Token'] }),
    swagger_1.ApiResponse({ status: 200, description: 'Create Token.' }),
    common_1.Post(),
    __param(0, common_1.Body()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [tokens_dto_1.TokenDto]),
    __metadata("design:returntype", Promise)
], TokensController.prototype, "createToken", null);
__decorate([
    swagger_1.ApiOperation({ tags: ['Update Token'] }),
    swagger_1.ApiResponse({ status: 200, description: 'Update Token.' }),
    common_1.Put(':_id'),
    __param(0, common_1.Param()),
    __param(1, common_1.Body()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [tokens_dto_1.TokenIdRequestParamsDto,
        tokens_dto_1.TokenDto]),
    __metadata("design:returntype", Promise)
], TokensController.prototype, "updateToken", null);
__decorate([
    swagger_1.ApiOperation({ tags: ['Delete Token'] }),
    swagger_1.ApiResponse({ status: 200, description: 'Delete Token.' }),
    roles_decorator_1.Roles([constant_1.CONSTANTS.ROLE.ADMIN, constant_1.CONSTANTS.ROLE.MANAGER_USER]),
    common_1.Delete(':_id'),
    __param(0, common_1.Param()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [tokens_dto_1.TokenIdRequestParamsDto]),
    __metadata("design:returntype", Promise)
], TokensController.prototype, "deleteToken", null);
__decorate([
    swagger_1.ApiOperation({ tags: ['List Tokens'] }),
    swagger_1.ApiResponse({ status: 200, description: 'List Tokens.' }),
    roles_decorator_1.Roles([constant_1.CONSTANTS.ROLE.ADMIN]),
    common_1.Get(),
    __param(0, common_1.Query()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [get_tokens_query_1.GetTokensQuery]),
    __metadata("design:returntype", Promise)
], TokensController.prototype, "getTokens", null);
__decorate([
    swagger_1.ApiOperation({ tags: ['List Tokens By UserId'] }),
    swagger_1.ApiResponse({ status: 200, description: 'List Tokens By UserId.' }),
    common_1.Get('/user-tokens'),
    __param(0, common_1.Query()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [get_tokens_by_userId_1.GetTokensByUserIdQuery]),
    __metadata("design:returntype", Promise)
], TokensController.prototype, "getTokensByUserId", null);
__decorate([
    swagger_1.ApiOperation({ tags: ['Find Token'] }),
    swagger_1.ApiResponse({ status: 200, description: 'Find Token.' }),
    common_1.Get(':id'),
    __param(0, common_1.Param()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [find_token_query_1.FindTokenQuery]),
    __metadata("design:returntype", Promise)
], TokensController.prototype, "findOneToken", null);
__decorate([
    swagger_1.ApiOperation({ tags: ['List Token Types'] }),
    swagger_1.ApiResponse({ status: 200, description: 'List Token Types.' }),
    common_1.Get('/token-types'),
    __param(0, common_1.Query()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [get_tokens_query_1.GetTokenTypesQuery]),
    __metadata("design:returntype", Promise)
], TokensController.prototype, "getTokenTypes", null);
TokensController = __decorate([
    common_1.Controller('tokens'),
    swagger_1.ApiTags('Tokens'),
    common_1.UseGuards(passport_1.AuthGuard(constant_1.CONSTANTS.AUTH_JWT), token_guard_1.TokenGuard),
    __metadata("design:paramtypes", [tokens_service_1.TokensService])
], TokensController);
exports.TokensController = TokensController;
//# sourceMappingURL=tokens.controller.js.map