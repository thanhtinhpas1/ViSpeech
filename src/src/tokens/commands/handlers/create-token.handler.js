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
const create_token_command_1 = require("../impl/create-token.command");
const token_repository_1 = require("../../repository/token.repository");
let CreateTokenHandler = class CreateTokenHandler {
    constructor(repository, publisher) {
        this.repository = repository;
        this.publisher = publisher;
    }
    execute(command) {
        return __awaiter(this, void 0, void 0, function* () {
            common_1.Logger.log('Async CreateTokenHandler...', 'CreateTokenCommand');
            const { streamId, tokenDto } = command;
            const token = this.publisher.mergeObjectContext(yield this.repository.createToken(streamId, tokenDto));
            token.commit();
        });
    }
};
CreateTokenHandler = __decorate([
    cqrs_1.CommandHandler(create_token_command_1.CreateTokenCommand),
    __metadata("design:paramtypes", [token_repository_1.TokenRepository,
        cqrs_1.EventPublisher])
], CreateTokenHandler);
exports.CreateTokenHandler = CreateTokenHandler;
let CreateFreeTokenHandler = class CreateFreeTokenHandler {
    constructor(repository, publisher) {
        this.repository = repository;
        this.publisher = publisher;
    }
    execute(command) {
        return __awaiter(this, void 0, void 0, function* () {
            common_1.Logger.log('Async CreateFreeTokenHandler...', 'CreateFreeTokenCommand');
            const { streamId, tokenDto } = command;
            const token = this.publisher.mergeObjectContext(yield this.repository.createFreeToken(streamId, tokenDto));
            token.commit();
        });
    }
};
CreateFreeTokenHandler = __decorate([
    cqrs_1.CommandHandler(create_token_command_1.CreateFreeTokenCommand),
    __metadata("design:paramtypes", [token_repository_1.TokenRepository,
        cqrs_1.EventPublisher])
], CreateFreeTokenHandler);
exports.CreateFreeTokenHandler = CreateFreeTokenHandler;
let CreateOrderedTokenHandler = class CreateOrderedTokenHandler {
    constructor(repository, publisher) {
        this.repository = repository;
        this.publisher = publisher;
    }
    execute(command) {
        return __awaiter(this, void 0, void 0, function* () {
            common_1.Logger.log('Async CreateOrderedTokenHandler...', 'CreateOrderedTokenCommand');
            const { streamId, tokenDto } = command;
            const token = this.publisher.mergeObjectContext(yield this.repository.createOrderedToken(streamId, tokenDto));
            token.commit();
        });
    }
};
CreateOrderedTokenHandler = __decorate([
    cqrs_1.CommandHandler(create_token_command_1.CreateOrderedTokenCommand),
    __metadata("design:paramtypes", [token_repository_1.TokenRepository,
        cqrs_1.EventPublisher])
], CreateOrderedTokenHandler);
exports.CreateOrderedTokenHandler = CreateOrderedTokenHandler;
//# sourceMappingURL=create-token.handler.js.map