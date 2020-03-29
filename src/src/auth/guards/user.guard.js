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
const auth_service_1 = require("../auth.service");
const typeorm_1 = require("typeorm");
const users_dto_1 = require("../../users/dtos/users.dto");
const constant_1 = require("../../common/constant");
const typeorm_2 = require("@nestjs/typeorm");
let UserGuard = class UserGuard {
    constructor(authService, userRepository) {
        this.authService = authService;
        this.userRepository = userRepository;
    }
    canActivate(context) {
        return __awaiter(this, void 0, void 0, function* () {
            const request = context.switchToHttp().getRequest();
            const id = request.params['_id'] || request.params['id'] || request.params['userId'];
            if (!id)
                return true;
            const payload = this.authService.decode(request);
            if (!payload || !payload['id'] || !payload['roles']) {
                throw new common_1.BadRequestException();
            }
            if (payload['roles'].findIndex(x => x.name === constant_1.CONSTANTS.ROLE.ADMIN) !== -1)
                return true;
            if (payload['id'] === id) {
                return true;
            }
            common_1.Logger.warn('User do not have permission to modify this user.', 'UserGuard');
            return false;
        });
    }
};
UserGuard = __decorate([
    common_1.Injectable(),
    __param(1, typeorm_2.InjectRepository(users_dto_1.UserDto)),
    __metadata("design:paramtypes", [auth_service_1.AuthService,
        typeorm_1.Repository])
], UserGuard);
exports.UserGuard = UserGuard;
let VerifyEmailGuard = class VerifyEmailGuard {
    constructor(authService) {
        this.authService = authService;
    }
    canActivate(context) {
        return __awaiter(this, void 0, void 0, function* () {
            const request = context.switchToHttp().getRequest();
            const emailToken = request.body;
            const requestJwt = this.authService.decode(request);
            if (!requestJwt || !requestJwt['id'] || !requestJwt['roles']) {
                throw new common_1.BadRequestException();
            }
            const decodedEmailToken = this.authService.decodeJwtToken(emailToken);
            if (!decodedEmailToken || !decodedEmailToken['id']) {
                throw new common_1.BadRequestException();
            }
            if (decodedEmailToken['id'] === requestJwt['id']) {
                return true;
            }
            return false;
        });
    }
};
VerifyEmailGuard = __decorate([
    common_1.Injectable(),
    __metadata("design:paramtypes", [auth_service_1.AuthService])
], VerifyEmailGuard);
exports.VerifyEmailGuard = VerifyEmailGuard;
//# sourceMappingURL=user.guard.js.map