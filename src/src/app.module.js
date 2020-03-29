"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
const common_1 = require("@nestjs/common");
const serve_static_1 = require("@nestjs/serve-static");
const typeorm_1 = require("@nestjs/typeorm");
const auth_module_1 = require("auth/auth.module");
const orders_module_1 = require("orders/orders.module");
const path_1 = require("path");
const reports_module_1 = require("reports/reports.module");
const roles_module_1 = require("roles/roles.module");
const tokens_module_1 = require("tokens/tokens.module");
const users_module_1 = require("users/users.module");
const config_1 = require("../config");
const projects_module_1 = require("projects/projects.module");
const permissions_module_1 = require("permissions/permissions.module");
const request_module_1 = require("./requests/request.module");
let AppModule = class AppModule {
};
AppModule = __decorate([
    common_1.Module({
        imports: [
            typeorm_1.TypeOrmModule.forRoot(Object.assign(Object.assign({}, config_1.config.DATABASE), { useUnifiedTopology: true, entities: [__dirname + '/../**/*.dto{.ts,.js}'] })),
            serve_static_1.ServeStaticModule.forRoot({
                rootPath: path_1.join(__dirname, '..', config_1.config.APP_ROOT_PATH),
            }),
            users_module_1.UsersModule,
            auth_module_1.AuthModule,
            tokens_module_1.TokensModule,
            orders_module_1.OrdersModule,
            roles_module_1.RolesModule,
            reports_module_1.ReportsModule,
            projects_module_1.ProjectsModule,
            permissions_module_1.PermissionsModule,
            request_module_1.RequestModule,
        ],
    })
], AppModule);
exports.AppModule = AppModule;
//# sourceMappingURL=app.module.js.map