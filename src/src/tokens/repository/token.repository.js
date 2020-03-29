"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
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
const token_model_1 = require("../models/token.model");
let TokenRepository = class TokenRepository {
    createToken(streamId, tokenDto) {
        return __awaiter(this, void 0, void 0, function* () {
            const token = new token_model_1.Token(undefined);
            token.setData(tokenDto);
            token.createToken(streamId);
            return token;
        });
    }
    createFreeToken(streamId, tokenDto) {
        return __awaiter(this, void 0, void 0, function* () {
            const token = new token_model_1.Token(undefined);
            token.setData(tokenDto);
            token.createFreeToken(streamId);
            return token;
        });
    }
    createOrderedToken(streamId, tokenDto) {
        return __awaiter(this, void 0, void 0, function* () {
            const token = new token_model_1.Token(undefined);
            token.setData(tokenDto);
            token.createOrderedToken(streamId);
            return token;
        });
    }
    updateToken(streamId, tokenDto) {
        return __awaiter(this, void 0, void 0, function* () {
            const token = new token_model_1.Token(undefined);
            token.setData(tokenDto);
            token.updateToken(streamId);
            return token;
        });
    }
    deleteToken(streamId, tokenId) {
        return __awaiter(this, void 0, void 0, function* () {
            const token = new token_model_1.Token(tokenId);
            token.deleteToken(streamId);
            return token;
        });
    }
    deleteTokenByUserId(streamId, userId) {
        return __awaiter(this, void 0, void 0, function* () {
            const token = new token_model_1.Token(undefined);
            token.setData(userId);
            token.deleteTokenByUserId(streamId);
            return token;
        });
    }
    welcomeToken(streamId, tokenId) {
        return __awaiter(this, void 0, void 0, function* () {
            const token = new token_model_1.Token(tokenId);
            token.welcomeToken(streamId);
            return token;
        });
    }
};
TokenRepository = __decorate([
    common_1.Injectable()
], TokenRepository);
exports.TokenRepository = TokenRepository;
//# sourceMappingURL=token.repository.js.map