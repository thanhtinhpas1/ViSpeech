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
const update_user_command_1 = require("../commands/impl/update-user.command");
const delete_user_command_1 = require("../commands/impl/delete-user.command");
const get_users_query_1 = require("users/queries/impl/get-users.query");
const find_user_query_1 = require("users/queries/impl/find-user.query");
const create_user_command_1 = require("users/commands/impl/create-user.command");
const change_password_command_1 = require("../commands/impl/change-password.command");
const verify_email_command_1 = require("users/commands/impl/verify-email.command");
const send_verify_email_command_1 = require("users/commands/impl/send-verify-email.command");
let UsersService = class UsersService {
    constructor(commandBus, queryBus) {
        this.commandBus = commandBus;
        this.queryBus = queryBus;
    }
    createUserStart(streamId, userDto) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this.commandBus.execute(new create_user_command_1.CreateUserStartCommand(streamId, userDto));
        });
    }
    updateUser(streamId, userDto) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this.commandBus.execute(new update_user_command_1.UpdateUserCommand(streamId, userDto));
        });
    }
    deleteUser(streamId, userIdDto) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this.commandBus.execute(new delete_user_command_1.DeleteUserCommand(streamId, userIdDto));
        });
    }
    sendVerifyEmail(streamId, userIdDto) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this.commandBus.execute(new send_verify_email_command_1.SendVerifyEmailCommand(streamId, userIdDto));
        });
    }
    verifyEmail(streamId, emailToken) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this.commandBus.execute(new verify_email_command_1.VerifyEmailCommand(streamId, emailToken));
        });
    }
    changePassword(streamId, userId, newPassword, oldPassword) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this.commandBus.execute(new change_password_command_1.ChangePasswordCommand(streamId, userId, newPassword, oldPassword));
        });
    }
    getUsers(getUsersQuery) {
        return __awaiter(this, void 0, void 0, function* () {
            const query = new get_users_query_1.GetUsersQuery();
            Object.assign(query, getUsersQuery);
            return yield this.queryBus.execute(query);
        });
    }
    findOne(findUserQuery) {
        return __awaiter(this, void 0, void 0, function* () {
            const query = new find_user_query_1.FindUserQuery(findUserQuery.id);
            return yield this.queryBus.execute(query);
        });
    }
};
UsersService = __decorate([
    common_1.Injectable(),
    __metadata("design:paramtypes", [cqrs_1.CommandBus,
        cqrs_1.QueryBus])
], UsersService);
exports.UsersService = UsersService;
//# sourceMappingURL=users.service.js.map