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
const users_dto_1 = require("users/dtos/users.dto");
const typeorm_2 = require("typeorm");
const verify_email_sent_event_1 = require("../impl/verify-email-sent.event");
const auth_service_1 = require("auth/auth.service");
const email_util_1 = require("utils/email.util");
let VerifyEmailSentHandler = class VerifyEmailSentHandler {
    constructor(eventBus, authService, repository) {
        this.eventBus = eventBus;
        this.authService = authService;
        this.repository = repository;
    }
    handle(event) {
        return __awaiter(this, void 0, void 0, function* () {
            common_1.Logger.log(event.userId, 'VerifyEmailSentEvent');
            const { streamId, userId } = event;
            try {
                const user = yield this.repository.findOne({ _id: userId });
                if (!user) {
                    throw new common_1.NotFoundException(`User with _id ${userId} does not exist.`);
                }
                const verifyEmailToken = this.authService.generateTokenWithUserId(userId, '2 days');
                yield email_util_1.EmailUtils.sendVerifyEmail(user.username, user.email, verifyEmailToken);
                this.eventBus.publish(new verify_email_sent_event_1.VerifyEmailSentSuccessEvent(streamId, userId));
            }
            catch (error) {
                this.eventBus.publish(new verify_email_sent_event_1.VerifyEmailSentFailedEvent(streamId, userId, error.toString()));
            }
        });
    }
};
VerifyEmailSentHandler = __decorate([
    cqrs_1.EventsHandler(verify_email_sent_event_1.VerifyEmailSentEvent),
    __param(2, typeorm_1.InjectRepository(users_dto_1.UserDto)),
    __metadata("design:paramtypes", [cqrs_1.EventBus,
        auth_service_1.AuthService,
        typeorm_2.Repository])
], VerifyEmailSentHandler);
exports.VerifyEmailSentHandler = VerifyEmailSentHandler;
let VerifyEmailSentSuccessHandler = class VerifyEmailSentSuccessHandler {
    handle(event) {
        common_1.Logger.log(event.userId, 'VerifyEmailSentSuccessEvent');
    }
};
VerifyEmailSentSuccessHandler = __decorate([
    cqrs_1.EventsHandler(verify_email_sent_event_1.VerifyEmailSentSuccessEvent)
], VerifyEmailSentSuccessHandler);
exports.VerifyEmailSentSuccessHandler = VerifyEmailSentSuccessHandler;
let VerifyEmailSentFailedHandler = class VerifyEmailSentFailedHandler {
    handle(event) {
        common_1.Logger.log(event.error, 'VerifyEmailSentFailedEvent');
    }
};
VerifyEmailSentFailedHandler = __decorate([
    cqrs_1.EventsHandler(verify_email_sent_event_1.VerifyEmailSentFailedEvent)
], VerifyEmailSentFailedHandler);
exports.VerifyEmailSentFailedHandler = VerifyEmailSentFailedHandler;
//# sourceMappingURL=verify-email-sent.handler.js.map