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
const passport_1 = require("@nestjs/passport");
const jwt_1 = require("@nestjs/jwt");
const core_1 = require("@nestjs/core");
const roles_guard_1 = require("auth/roles.guard");
const auth_controllers_1 = require("./auth.controllers");
const typeorm_1 = require("@nestjs/typeorm");
const cqrs_1 = require("@nestjs/cqrs");
const users_module_1 = require("../users/users.module");
const config_1 = require("../../config");
const auth_service_1 = require("./auth.service");
const users_dto_1 = require("../users/dtos/users.dto");
const local_strategy_1 = require("./local.strategy");
const jwt_strategy_1 = require("./jwt.strategy");
let AuthModule = class AuthModule {
    constructor(query$) {
        this.query$ = query$;
    }
};
AuthModule = __decorate([
    common_1.Module({
        imports: [
            jwt_1.JwtModule.register(config_1.config.JWT),
            typeorm_1.TypeOrmModule.forFeature([users_dto_1.UserDto]),
            common_1.forwardRef(() => users_module_1.UsersModule),
            passport_1.PassportModule
        ],
        controllers: [auth_controllers_1.AuthController],
        providers: [
            {
                provide: core_1.APP_GUARD,
                useClass: roles_guard_1.RolesGuard
            },
            local_strategy_1.LocalStrategy,
            jwt_strategy_1.JwtStrategy,
            cqrs_1.CommandBus,
            cqrs_1.QueryBus,
            auth_service_1.AuthService
        ],
        exports: [jwt_1.JwtModule, auth_service_1.AuthService]
    }),
    __metadata("design:paramtypes", [cqrs_1.QueryBus])
], AuthModule);
exports.AuthModule = AuthModule;
//# sourceMappingURL=auth.module.js.map