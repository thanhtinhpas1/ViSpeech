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
const typeorm_1 = require("@nestjs/typeorm");
const constant_1 = require("common/constant");
const typeorm_2 = require("typeorm");
const roles_dto_1 = require("./dtos/roles.dto");
let RolesModule = class RolesModule {
    constructor(repository) {
        this.repository = repository;
    }
    onModuleInit() {
        return __awaiter(this, void 0, void 0, function* () {
            this.persistRolesToDB();
        });
    }
    persistRolesToDB() {
        return __awaiter(this, void 0, void 0, function* () {
            const userRole = yield typeorm_2.getMongoRepository(roles_dto_1.RoleDto).find({ name: constant_1.CONSTANTS.ROLE.USER });
            const manageUserRole = yield typeorm_2.getMongoRepository(roles_dto_1.RoleDto).find({ name: constant_1.CONSTANTS.ROLE.MANAGER_USER });
            const adminRole = yield typeorm_2.getMongoRepository(roles_dto_1.RoleDto).find({ name: constant_1.CONSTANTS.ROLE.ADMIN });
            if (!userRole[0] && !adminRole[0] && !manageUserRole[0]) {
                typeorm_2.getMongoRepository(roles_dto_1.RoleDto).save(new roles_dto_1.RoleDto(constant_1.CONSTANTS.ROLE.USER));
                typeorm_2.getMongoRepository(roles_dto_1.RoleDto).save(new roles_dto_1.RoleDto(constant_1.CONSTANTS.ROLE.MANAGER_USER));
                typeorm_2.getMongoRepository(roles_dto_1.RoleDto).save(new roles_dto_1.RoleDto(constant_1.CONSTANTS.ROLE.ADMIN));
            }
        });
    }
};
RolesModule = __decorate([
    common_1.Module({
        imports: [
            typeorm_1.TypeOrmModule.forFeature([roles_dto_1.RoleDto])
        ]
    }),
    __param(0, typeorm_1.InjectRepository(roles_dto_1.RoleDto)),
    __metadata("design:paramtypes", [typeorm_2.Repository])
], RolesModule);
exports.RolesModule = RolesModule;
//# sourceMappingURL=roles.module.js.map