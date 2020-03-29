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
Object.defineProperty(exports, "__esModule", { value: true });
const common_1 = require("@nestjs/common");
const cqrs_1 = require("@nestjs/cqrs");
const operators_1 = require("rxjs/operators");
const user_created_event_1 = require("users/events/impl/user-created.event");
const tokens_dto_1 = require("tokens/dtos/tokens.dto");
const auth_service_1 = require("auth/auth.service");
const create_user_command_1 = require("users/commands/impl/create-user.command");
const welcome_user_command_1 = require("users/commands/impl/welcome-user.command");
const delete_token_command_1 = require("tokens/commands/impl/delete-token.command");
const free_token_created_event_1 = require("tokens/events/impl/free-token-created.event");
const delete_user_command_1 = require("users/commands/impl/delete-user.command");
const users_dto_1 = require("users/dtos/users.dto");
const user_deleted_event_1 = require("users/events/impl/user-deleted.event");
const create_token_command_1 = require("tokens/commands/impl/create-token.command");
let UsersSagas = class UsersSagas {
    constructor(authService) {
        this.authService = authService;
        this.startCreatingUser = (events$) => {
            return events$.pipe(cqrs_1.ofType(user_created_event_1.UserCreationStartedEvent), operators_1.map((event) => {
                common_1.Logger.log('Inside [UsersSagas] startCreatingUser Saga', 'UsersSagas');
                const { streamId, userDto } = event;
                return new create_user_command_1.CreateUserCommand(streamId, userDto);
            }));
        };
        this.userCreatedSucess = (events$) => {
            return events$.pipe(cqrs_1.ofType(user_created_event_1.UserCreatedSuccessEvent), operators_1.map((event) => {
                common_1.Logger.log('Inside [UsersSagas] userCreatedSucess Saga', 'UsersSagas');
                const { streamId, userDto } = event;
                const userId = userDto._id;
                const tokenValue = this.authService.generateTokenWithUserId(userId);
                const tokenDto = new tokens_dto_1.TokenDto(tokenValue, userId, "");
                return new create_token_command_1.CreateFreeTokenCommand(streamId, tokenDto);
            }));
        };
        this.freeTokenCreatedSuccess = (events$) => {
            return events$.pipe(cqrs_1.ofType(free_token_created_event_1.FreeTokenCreatedSuccessEvent), operators_1.map((event) => {
                common_1.Logger.log('Inside [UsersSagas] freeTokenCreatedSuccess Saga', 'UsersSagas');
                const { streamId, tokenDto } = event;
                return new welcome_user_command_1.WelcomeUserCommand(streamId, tokenDto.userId);
            }));
        };
        this.freeTokenCreatedFailed = (events$) => {
            return events$.pipe(cqrs_1.ofType(free_token_created_event_1.FreeTokenCreatedFailedEvent), operators_1.flatMap((event) => {
                common_1.Logger.log('Inside [UsersSagas] freeTokenCreatedFailed Saga', 'UsersSagas');
                const { streamId, tokenDto } = event;
                const { _id, userId } = tokenDto;
                return [
                    new delete_token_command_1.DeleteTokenCommand(streamId, new tokens_dto_1.TokenIdRequestParamsDto(_id)),
                    new delete_user_command_1.DeleteUserCommand(streamId, new users_dto_1.UserIdRequestParamsDto(userId))
                ];
            }));
        };
        this.userDeletedSucess = (events$) => {
            return events$.pipe(cqrs_1.ofType(user_deleted_event_1.UserDeletedSuccessEvent), operators_1.map((event) => {
                common_1.Logger.log('Inside [UsersSagas] userDeletedSucess Saga', 'UsersSagas');
                const { streamId, userId } = event;
                return new delete_token_command_1.DeleteTokenByUserIdCommand(streamId, userId);
            }));
        };
    }
};
__decorate([
    cqrs_1.Saga(),
    __metadata("design:type", Object)
], UsersSagas.prototype, "startCreatingUser", void 0);
__decorate([
    cqrs_1.Saga(),
    __metadata("design:type", Object)
], UsersSagas.prototype, "userCreatedSucess", void 0);
__decorate([
    cqrs_1.Saga(),
    __metadata("design:type", Object)
], UsersSagas.prototype, "freeTokenCreatedSuccess", void 0);
__decorate([
    cqrs_1.Saga(),
    __metadata("design:type", Object)
], UsersSagas.prototype, "freeTokenCreatedFailed", void 0);
__decorate([
    cqrs_1.Saga(),
    __metadata("design:type", Object)
], UsersSagas.prototype, "userDeletedSucess", void 0);
UsersSagas = __decorate([
    common_1.Injectable(),
    __metadata("design:paramtypes", [auth_service_1.AuthService])
], UsersSagas);
exports.UsersSagas = UsersSagas;
//# sourceMappingURL=users.sagas.js.map