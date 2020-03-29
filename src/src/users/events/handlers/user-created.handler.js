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
const user_created_event_1 = require("../impl/user-created.event");
const common_1 = require("@nestjs/common");
const typeorm_1 = require("typeorm");
const users_dto_1 = require("users/dtos/users.dto");
const utils_1 = require("utils");
const roles_dto_1 = require("roles/dtos/roles.dto");
const constant_1 = require("../../../common/constant");
const typeorm_2 = require("@nestjs/typeorm");
let UserCreationStartedHandler = class UserCreationStartedHandler {
    handle(event) {
        common_1.Logger.log(event.userDto.username, 'UserCreationStartedEvent');
    }
};
UserCreationStartedHandler = __decorate([
    cqrs_1.EventsHandler(user_created_event_1.UserCreationStartedEvent)
], UserCreationStartedHandler);
exports.UserCreationStartedHandler = UserCreationStartedHandler;
let UserCreatedHandler = class UserCreatedHandler {
    constructor(eventBus, userRepository) {
        this.eventBus = eventBus;
        this.userRepository = userRepository;
    }
    handle(event) {
        return __awaiter(this, void 0, void 0, function* () {
            common_1.Logger.log(event.userDto.username, 'UserCreatedEvent');
            const { streamId, userDto } = event;
            const user = JSON.parse(JSON.stringify(userDto));
            try {
                user.password = utils_1.Utils.hashPassword(user.password);
                user.roles = [new roles_dto_1.RoleDto(constant_1.CONSTANTS.ROLE.USER)];
                yield this.userRepository.save(user);
                this.eventBus.publish(new user_created_event_1.UserCreatedSuccessEvent(streamId, userDto));
            }
            catch (error) {
                this.eventBus.publish(new user_created_event_1.UserCreatedFailedEvent(streamId, userDto, error));
            }
        });
    }
};
UserCreatedHandler = __decorate([
    cqrs_1.EventsHandler(user_created_event_1.UserCreatedEvent),
    __param(1, typeorm_2.InjectRepository(users_dto_1.UserDto)),
    __metadata("design:paramtypes", [cqrs_1.EventBus,
        typeorm_1.Repository])
], UserCreatedHandler);
exports.UserCreatedHandler = UserCreatedHandler;
let UserCreatedSuccessHandler = class UserCreatedSuccessHandler {
    handle(event) {
        common_1.Logger.log(event.userDto.username, 'UserCreatedSuccessEvent');
    }
};
UserCreatedSuccessHandler = __decorate([
    cqrs_1.EventsHandler(user_created_event_1.UserCreatedSuccessEvent)
], UserCreatedSuccessHandler);
exports.UserCreatedSuccessHandler = UserCreatedSuccessHandler;
let UserCreatedFailHandler = class UserCreatedFailHandler {
    handle(event) {
        common_1.Logger.log(event.error, 'UserCreatedFailEvent');
    }
};
UserCreatedFailHandler = __decorate([
    cqrs_1.EventsHandler(user_created_event_1.UserCreatedFailedEvent)
], UserCreatedFailHandler);
exports.UserCreatedFailHandler = UserCreatedFailHandler;
//# sourceMappingURL=user-created.handler.js.map