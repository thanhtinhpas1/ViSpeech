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
const password_changed_event_1 = require("../impl/password-changed.event");
const typeorm_1 = require("@nestjs/typeorm");
const users_dto_1 = require("../../dtos/users.dto");
const typeorm_2 = require("typeorm");
const utils_1 = require("../../../utils");
let PasswordChangedHandler = class PasswordChangedHandler {
    constructor(eventBus, repository) {
        this.eventBus = eventBus;
        this.repository = repository;
    }
    handle(event) {
        return __awaiter(this, void 0, void 0, function* () {
            common_1.Logger.log(event.userId, 'PasswordChangedEvent');
            const { streamId, userId, newPassword, oldPassword } = event;
            try {
                const user = yield this.repository.findOne({ _id: userId });
                if (!user)
                    throw new common_1.NotFoundException(`User with _id ${userId} does not exist.`);
                const isValid = yield utils_1.Utils.comparePassword(oldPassword, user.password);
                if (isValid) {
                    if (oldPassword === newPassword)
                        throw new Error('New password must be different than old password.');
                    user.password = utils_1.Utils.hashPassword(newPassword);
                    yield this.repository.update({ _id: userId }, user);
                    this.eventBus.publish(new password_changed_event_1.PasswordChangedSuccessEvent(streamId, userId, newPassword, oldPassword));
                    return;
                }
                throw new Error('Passwords do not match.');
            }
            catch (error) {
                this.eventBus.publish(new password_changed_event_1.PasswordChangedFailedEvent(streamId, userId, newPassword, oldPassword, error));
            }
        });
    }
};
PasswordChangedHandler = __decorate([
    cqrs_1.EventsHandler(password_changed_event_1.PasswordChangedEvent),
    __param(1, typeorm_1.InjectRepository(users_dto_1.UserDto)),
    __metadata("design:paramtypes", [cqrs_1.EventBus,
        typeorm_2.Repository])
], PasswordChangedHandler);
exports.PasswordChangedHandler = PasswordChangedHandler;
//# sourceMappingURL=password-changed.handler.js.map