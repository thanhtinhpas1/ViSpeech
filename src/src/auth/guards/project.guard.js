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
const auth_service_1 = require("auth/auth.service");
const constant_1 = require("common/constant");
const projects_dto_1 = require("projects/dtos/projects.dto");
const typeorm_1 = require("typeorm");
let ProjectGuard = class ProjectGuard {
    constructor(authService) {
        this.authService = authService;
    }
    canActivate(context) {
        return __awaiter(this, void 0, void 0, function* () {
            const request = context.switchToHttp().getRequest();
            const id = request.params._id || request.params.id;
            if (!id)
                return true;
            const payload = this.authService.decode(request);
            if (!payload || !payload['id'] || !payload['roles']) {
                throw new common_1.BadRequestException();
            }
            if (payload['roles'].includes(constant_1.CONSTANTS.ROLE.ADMIN))
                return true;
            const project = yield typeorm_1.getMongoRepository(projects_dto_1.ProjectDto).findOne({ _id: id });
            if (project.userId === payload['id']) {
                return true;
            }
            common_1.Logger.warn('User do not have permission to modify this project.', 'ProjectGuard');
            return false;
        });
    }
};
ProjectGuard = __decorate([
    common_1.Injectable(),
    __metadata("design:paramtypes", [auth_service_1.AuthService])
], ProjectGuard);
exports.ProjectGuard = ProjectGuard;
let ProjectQueryGuard = class ProjectQueryGuard {
    constructor(authService) {
        this.authService = authService;
    }
    canActivate(context) {
        return __awaiter(this, void 0, void 0, function* () {
            const request = context.switchToHttp().getRequest();
            const payload = this.authService.decode(request);
            if (!payload || !payload['id'] || !payload['roles']) {
                throw new common_1.BadRequestException();
            }
            if (payload['roles'] && payload['roles'].includes(constant_1.CONSTANTS.ROLE.ADMIN))
                return true;
            const id = request.params._id || request.params.id;
            if (id) {
                const project = yield typeorm_1.getMongoRepository(projects_dto_1.ProjectDto).findOne({ _id: id });
                if (project.userId === payload['id']) {
                    return true;
                }
            }
            const userId = request.query.userId;
            if (userId && userId === payload['id']) {
                return true;
            }
            common_1.Logger.warn('User do not have permission to query projects.', 'ProjectGuard');
            return false;
        });
    }
};
ProjectQueryGuard = __decorate([
    common_1.Injectable(),
    __metadata("design:paramtypes", [auth_service_1.AuthService])
], ProjectQueryGuard);
exports.ProjectQueryGuard = ProjectQueryGuard;
//# sourceMappingURL=project.guard.js.map