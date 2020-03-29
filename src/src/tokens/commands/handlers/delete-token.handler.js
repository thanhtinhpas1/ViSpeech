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
const cqrs_1 = require("@nestjs/cqrs");
const delete_token_command_1 = require("../impl/delete-token.command");
const token_repository_1 = require("../../repository/token.repository");
const common_1 = require("@nestjs/common");
let DeleteTokenHandler = class DeleteTokenHandler {
    constructor(repository, publisher) {
        this.repository = repository;
        this.publisher = publisher;
    }
    execute(command) {
        return __awaiter(this, void 0, void 0, function* () {
            common_1.Logger.log('Async DeleteTokenHandler...', 'DeleteTokenCommand');
            const { streamId, tokenIdDto } = command;
            const token = this.publisher.mergeObjectContext(yield this.repository.deleteToken(streamId, tokenIdDto._id));
            token.commit();
        });
    }
};
DeleteTokenHandler = __decorate([
    cqrs_1.CommandHandler(delete_token_command_1.DeleteTokenCommand),
    __metadata("design:paramtypes", [token_repository_1.TokenRepository,
        cqrs_1.EventPublisher])
], DeleteTokenHandler);
exports.DeleteTokenHandler = DeleteTokenHandler;
let DeleteTokenByUserIdHandler = class DeleteTokenByUserIdHandler {
    constructor(repository, publisher) {
        this.repository = repository;
        this.publisher = publisher;
    }
    execute(command) {
        return __awaiter(this, void 0, void 0, function* () {
            common_1.Logger.log('Async DeleteTokenByUserIdHandler...', 'DeleteTokenByUserIdCommand');
            const { streamId, userId } = command;
            const token = this.publisher.mergeObjectContext(yield this.repository.deleteTokenByUserId(streamId, userId));
            token.commit();
        });
    }
};
DeleteTokenByUserIdHandler = __decorate([
    cqrs_1.CommandHandler(delete_token_command_1.DeleteTokenByUserIdCommand),
    __metadata("design:paramtypes", [token_repository_1.TokenRepository,
        cqrs_1.EventPublisher])
], DeleteTokenByUserIdHandler);
exports.DeleteTokenByUserIdHandler = DeleteTokenByUserIdHandler;
//# sourceMappingURL=delete-token.handler.js.map