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
const welcome_order_command_1 = require("../impl/welcome-order.command");
const order_repository_1 = require("../../repository/order.repository");
const common_1 = require("@nestjs/common");
let WelcomeOrderHandler = class WelcomeOrderHandler {
    constructor(repository, publisher) {
        this.repository = repository;
        this.publisher = publisher;
    }
    execute(command) {
        return __awaiter(this, void 0, void 0, function* () {
            common_1.Logger.log('Async WelcomeOrderHandler...', 'WelcomeOrderCommand');
            const { streamId, orderId } = command;
            const order = this.publisher.mergeObjectContext(yield this.repository.welcomeOrder(streamId, orderId));
            order.commit();
        });
    }
};
WelcomeOrderHandler = __decorate([
    cqrs_1.CommandHandler(welcome_order_command_1.WelcomeOrderCommand),
    __metadata("design:paramtypes", [order_repository_1.OrderRepository,
        cqrs_1.EventPublisher])
], WelcomeOrderHandler);
exports.WelcomeOrderHandler = WelcomeOrderHandler;
//# sourceMappingURL=welcome-order.handler.js.map