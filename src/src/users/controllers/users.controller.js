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
const common_1 = require("@nestjs/common");
const passport_1 = require("@nestjs/passport");
const swagger_1 = require("@nestjs/swagger");
const auth_service_1 = require("auth/auth.service");
const roles_decorator_1 = require("auth/roles.decorator");
const constant_1 = require("common/constant");
const find_user_query_1 = require("users/queries/impl/find-user.query");
const get_users_query_1 = require("users/queries/impl/get-users.query");
const users_dto_1 = require("../dtos/users.dto");
const users_service_1 = require("../services/users.service");
const user_guard_1 = require("auth/guards/user.guard");
const utils_1 = require("utils");
let UsersController = class UsersController {
    constructor(authService, usersService) {
        this.authService = authService;
        this.usersService = usersService;
    }
    createUser(userDto) {
        return __awaiter(this, void 0, void 0, function* () {
            const streamId = userDto._id;
            return yield this.usersService.createUserStart(streamId, userDto);
        });
    }
    updateUser(userIdDto, userDto) {
        return __awaiter(this, void 0, void 0, function* () {
            const streamId = userIdDto._id;
            return this.usersService.updateUser(streamId, Object.assign(Object.assign({}, userDto), { _id: userIdDto._id }));
        });
    }
    changePassword(body, request) {
        return __awaiter(this, void 0, void 0, function* () {
            if (!body || !body.oldPassword || !body.newPassword)
                throw new common_1.BadRequestException();
            const payload = this.authService.decode(request);
            if (!payload)
                throw new common_1.UnauthorizedException();
            const streamId = payload['id'];
            return this.usersService.changePassword(streamId, payload['id'], body.newPassword, body.oldPassword);
        });
    }
    deleteUser(userIdDto, request) {
        return __awaiter(this, void 0, void 0, function* () {
            const payload = this.authService.decode(request);
            if (payload['id'] === userIdDto._id)
                throw new common_1.BadRequestException();
            const streamId = userIdDto._id;
            return this.usersService.deleteUser(streamId, userIdDto);
        });
    }
    sendVerifyEmail(userIdDto) {
        return __awaiter(this, void 0, void 0, function* () {
            const streamId = userIdDto._id;
            return this.usersService.sendVerifyEmail(streamId, userIdDto);
        });
    }
    verifyEmail(emailToken) {
        return __awaiter(this, void 0, void 0, function* () {
            const streamId = utils_1.Utils.getUuid();
            return this.usersService.verifyEmail(streamId, emailToken);
        });
    }
    findOneUser(findUserQuery) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this.usersService.findOne(findUserQuery);
        });
    }
    getUsers(getUsersQuery) {
        return __awaiter(this, void 0, void 0, function* () {
            return this.usersService.getUsers(getUsersQuery);
        });
    }
};
__decorate([
    swagger_1.ApiOperation({ tags: ['Create User'] }),
    swagger_1.ApiResponse({ status: 200, description: 'Create User.' }),
    common_1.Post(),
    __param(0, common_1.Body()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [users_dto_1.UserDto]),
    __metadata("design:returntype", Promise)
], UsersController.prototype, "createUser", null);
__decorate([
    swagger_1.ApiOperation({ tags: ['Update User'] }),
    swagger_1.ApiResponse({ status: 200, description: 'Update User.' }),
    common_1.UseGuards(passport_1.AuthGuard(constant_1.CONSTANTS.AUTH_JWT), user_guard_1.UserGuard),
    common_1.Put(':_id'),
    __param(0, common_1.Param()),
    __param(1, common_1.Body()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [users_dto_1.UserIdRequestParamsDto,
        users_dto_1.UserDto]),
    __metadata("design:returntype", Promise)
], UsersController.prototype, "updateUser", null);
__decorate([
    swagger_1.ApiOperation({ tags: ['Change password'] }),
    swagger_1.ApiResponse({ status: 200, description: 'Change password.' }),
    common_1.UseGuards(passport_1.AuthGuard(constant_1.CONSTANTS.AUTH_JWT)),
    common_1.Put('change-password'),
    __param(0, common_1.Body()), __param(1, common_1.Req()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [users_dto_1.ChangePasswordBody, Object]),
    __metadata("design:returntype", Promise)
], UsersController.prototype, "changePassword", null);
__decorate([
    swagger_1.ApiOperation({ tags: ['Delete User'] }),
    swagger_1.ApiResponse({ status: 200, description: 'Delete User.' }),
    common_1.UseGuards(passport_1.AuthGuard(constant_1.CONSTANTS.AUTH_JWT), user_guard_1.UserGuard),
    roles_decorator_1.Roles([constant_1.CONSTANTS.ROLE.ADMIN, constant_1.CONSTANTS.ROLE.MANAGER_USER]),
    common_1.Delete(':_id'),
    __param(0, common_1.Param()), __param(1, common_1.Req()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [users_dto_1.UserIdRequestParamsDto, Object]),
    __metadata("design:returntype", Promise)
], UsersController.prototype, "deleteUser", null);
__decorate([
    swagger_1.ApiOperation({ tags: ['Send Verify Email'] }),
    swagger_1.ApiResponse({ status: 200, description: 'Send Verify Email.' }),
    common_1.UseGuards(passport_1.AuthGuard(constant_1.CONSTANTS.AUTH_JWT), user_guard_1.UserGuard),
    roles_decorator_1.Roles([constant_1.CONSTANTS.ROLE.USER]),
    common_1.Post('send-verify-email'),
    __param(0, common_1.Body()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [users_dto_1.UserIdRequestParamsDto]),
    __metadata("design:returntype", Promise)
], UsersController.prototype, "sendVerifyEmail", null);
__decorate([
    swagger_1.ApiOperation({ tags: ['Verify Email'] }),
    swagger_1.ApiResponse({ status: 200, description: 'Verify Email.' }),
    common_1.UseGuards(passport_1.AuthGuard(constant_1.CONSTANTS.AUTH_JWT), user_guard_1.VerifyEmailGuard),
    roles_decorator_1.Roles([constant_1.CONSTANTS.ROLE.USER]),
    common_1.Post('verify-email'),
    __param(0, common_1.Body()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], UsersController.prototype, "verifyEmail", null);
__decorate([
    swagger_1.ApiOperation({ tags: ['Find User'] }),
    swagger_1.ApiResponse({ status: 200, description: 'Find User.' }),
    common_1.UseGuards(passport_1.AuthGuard(constant_1.CONSTANTS.AUTH_JWT), user_guard_1.UserGuard),
    common_1.Get(':id'),
    __param(0, common_1.Param()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [find_user_query_1.FindUserQuery]),
    __metadata("design:returntype", Promise)
], UsersController.prototype, "findOneUser", null);
__decorate([
    swagger_1.ApiOperation({ tags: ['List Users'] }),
    swagger_1.ApiResponse({ status: 200, description: 'List Users.' }),
    common_1.UseGuards(passport_1.AuthGuard(constant_1.CONSTANTS.AUTH_JWT)),
    roles_decorator_1.Roles([constant_1.CONSTANTS.ROLE.ADMIN]),
    common_1.Get(),
    __param(0, common_1.Query()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [get_users_query_1.GetUsersQuery]),
    __metadata("design:returntype", Promise)
], UsersController.prototype, "getUsers", null);
UsersController = __decorate([
    common_1.Controller('users'),
    swagger_1.ApiTags('Users'),
    __metadata("design:paramtypes", [auth_service_1.AuthService,
        users_service_1.UsersService])
], UsersController);
exports.UsersController = UsersController;
//# sourceMappingURL=users.controller.js.map