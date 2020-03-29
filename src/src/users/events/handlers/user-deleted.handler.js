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
const user_deleted_event_1 = require("../impl/user-deleted.event");
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const users_dto_1 = require("users/dtos/users.dto");
const typeorm_2 = require("typeorm");
let UserDeletedHandler = class UserDeletedHandler {
    constructor(eventBus, repository) {
        this.eventBus = eventBus;
        this.repository = repository;
    }
    handle(event) {
        return __awaiter(this, void 0, void 0, function* () {
            common_1.Logger.log(event.userId, 'UserDeletedEvent');
            const { streamId, userId } = event;
            try {
                const user = yield this.repository.findOne({ _id: userId });
                if (user) {
                    yield this.repository.delete({ _id: userId });
                    this.eventBus.publish(new user_deleted_event_1.UserDeletedSuccessEvent(streamId, userId));
                    return;
                }
                throw new common_1.NotFoundException(`User with _id ${userId} does not exist.`);
            }
            catch (error) {
                this.eventBus.publish(new user_deleted_event_1.UserDeletedFailedEvent(streamId, userId, error));
            }
        });
    }
};
UserDeletedHandler = __decorate([
    cqrs_1.EventsHandler(user_deleted_event_1.UserDeletedEvent),
    __param(1, typeorm_1.InjectRepository(users_dto_1.UserDto)),
    __metadata("design:paramtypes", [cqrs_1.EventBus,
        typeorm_2.Repository])
], UserDeletedHandler);
exports.UserDeletedHandler = UserDeletedHandler;
let UserDeletedSuccessHandler = class UserDeletedSuccessHandler {
    handle(event) {
        common_1.Logger.log(event.userId, 'UserDeletedSuccessEvent');
    }
};
UserDeletedSuccessHandler = __decorate([
    cqrs_1.EventsHandler(user_deleted_event_1.UserDeletedSuccessEvent)
], UserDeletedSuccessHandler);
exports.UserDeletedSuccessHandler = UserDeletedSuccessHandler;
let UserDeletedFailedHandler = class UserDeletedFailedHandler {
    handle(event) {
        common_1.Logger.log(event.error, 'UserDeletedFailedEvent');
    }
};
UserDeletedFailedHandler = __decorate([
    cqrs_1.EventsHandler(user_deleted_event_1.UserDeletedFailedEvent)
], UserDeletedFailedHandler);
exports.UserDeletedFailedHandler = UserDeletedFailedHandler;
//# sourceMappingURL=user-deleted.handler.js.map