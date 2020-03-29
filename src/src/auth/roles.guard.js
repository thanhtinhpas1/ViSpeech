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
const core_1 = require("@nestjs/core");
const jwt_1 = require("@nestjs/jwt");
const constant_1 = require("../common/constant");
const cqrs_1 = require("@nestjs/cqrs");
let RolesGuard = class RolesGuard {
    constructor(reflector, jwtService, queryBus) {
        this.reflector = reflector;
        this.jwtService = jwtService;
        this.queryBus = queryBus;
    }
    canActivate(context) {
        const roles = this.reflector.get('roles', context.getHandler());
        const request = context.switchToHttp().getRequest();
        if (!roles) {
            return true;
        }
        return this.matchRoles(request, roles);
    }
    matchRoles(request, roles) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const authorization = request.headers.authorization;
                if (!authorization)
                    return false;
                const jwt = authorization.replace(constant_1.CONSTANTS.BEARER_HEADER_AUTHORIZE, '');
                const payload = this.jwtService.decode(jwt);
                if (!payload)
                    return false;
                const userRoles = payload['roles'];
                const match = userRoles.filter(x => roles.includes(x.name));
                return match.length > 0;
            }
            catch (e) {
                common_1.Logger.warn('Authorize Roles by Guard failed', 'RolesGuard');
                return false;
            }
        });
    }
};
RolesGuard = __decorate([
    common_1.Injectable(),
    __metadata("design:paramtypes", [core_1.Reflector,
        jwt_1.JwtService,
        cqrs_1.QueryBus])
], RolesGuard);
exports.RolesGuard = RolesGuard;
//# sourceMappingURL=roles.guard.js.map