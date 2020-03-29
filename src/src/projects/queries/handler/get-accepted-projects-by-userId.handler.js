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
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const projects_dto_1 = require("projects/dtos/projects.dto");
const typeorm_2 = require("typeorm");
const get_accepted_projects_by_userId_1 = require("../impl/get-accepted-projects-by-userId");
const permissions_dto_1 = require("permissions/dtos/permissions.dto");
const constant_1 = require("common/constant");
let GetAcceptedProjectsByUserIdHandler = class GetAcceptedProjectsByUserIdHandler {
    constructor(repository, permissionDtoRepository) {
        this.repository = repository;
        this.permissionDtoRepository = permissionDtoRepository;
    }
    execute(query) {
        return __awaiter(this, void 0, void 0, function* () {
            common_1.Logger.log("Async GetAcceptedProjectsByUserIdQuery...", "GetAcceptedProjectsByUserIdQuery");
            const { userId, offset, limit } = query;
            let permissions = [];
            let result = [];
            try {
                if (limit && offset) {
                    permissions = yield this.permissionDtoRepository.find({
                        skip: offset,
                        take: limit,
                        where: { assigneeId: userId, status: { $in: [constant_1.CONSTANTS.STATUS.APPROVED, constant_1.CONSTANTS.STATUS.REJECTED] } }
                    });
                    permissions.forEach((permission) => __awaiter(this, void 0, void 0, function* () {
                        const project = yield this.repository.findOne({ _id: permission.projectId });
                        result.push(Object.assign(Object.assign({}, project), { status: permission.status }));
                    }));
                }
                else {
                    permissions = yield this.permissionDtoRepository.find({
                        where: { assigneeId: userId, status: { $in: [constant_1.CONSTANTS.STATUS.APPROVED, constant_1.CONSTANTS.STATUS.REJECTED] } }
                    });
                    permissions.forEach((permission) => __awaiter(this, void 0, void 0, function* () {
                        const project = yield this.repository.findOne({ _id: permission.projectId });
                        result.push(Object.assign(Object.assign({}, project), { status: permission.status }));
                    }));
                }
                return result;
            }
            catch (error) {
                common_1.Logger.error(error, "", "GetAcceptedProjectsByUserIdQuery");
            }
        });
    }
};
GetAcceptedProjectsByUserIdHandler = __decorate([
    cqrs_1.QueryHandler(get_accepted_projects_by_userId_1.GetAcceptedProjectsByUserIdQuery),
    __param(0, typeorm_1.InjectRepository(projects_dto_1.ProjectDto)),
    __param(1, typeorm_1.InjectRepository(permissions_dto_1.PermissionDto)),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        typeorm_2.Repository])
], GetAcceptedProjectsByUserIdHandler);
exports.GetAcceptedProjectsByUserIdHandler = GetAcceptedProjectsByUserIdHandler;
//# sourceMappingURL=get-accepted-projects-by-userId.handler.js.map