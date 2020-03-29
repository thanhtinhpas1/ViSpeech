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
const constant_1 = require("common/constant");
const find_project_query_1 = require("projects/queries/impl/find-project.query");
const get_projects_query_1 = require("projects/queries/impl/get-projects.query");
const projects_dto_1 = require("../dtos/projects.dto");
const projects_service_1 = require("../services/projects.service");
const roles_decorator_1 = require("auth/roles.decorator");
const project_guard_1 = require("auth/guards/project.guard");
const get_projects_by_userId_1 = require("projects/queries/impl/get-projects-by-userId");
const get_accepted_projects_by_userId_1 = require("projects/queries/impl/get-accepted-projects-by-userId");
let ProjectsController = class ProjectsController {
    constructor(projectsService) {
        this.projectsService = projectsService;
    }
    createProject(projectDto) {
        return __awaiter(this, void 0, void 0, function* () {
            const streamId = projectDto._id;
            return this.projectsService.createProject(streamId, projectDto);
        });
    }
    updateProject(projectIdDto, projectDto) {
        return __awaiter(this, void 0, void 0, function* () {
            const streamId = projectIdDto._id;
            return this.projectsService.updateProject(streamId, Object.assign(Object.assign({}, projectDto), { _id: projectIdDto._id }));
        });
    }
    deleteProject(projectIdDto) {
        return __awaiter(this, void 0, void 0, function* () {
            const streamId = projectIdDto._id;
            return this.projectsService.deleteProject(streamId, projectIdDto);
        });
    }
    getProjects(getProjectsQuery) {
        return __awaiter(this, void 0, void 0, function* () {
            return this.projectsService.getProjects(getProjectsQuery);
        });
    }
    findOneProject(findProjectQuery) {
        return __awaiter(this, void 0, void 0, function* () {
            return this.projectsService.findOne(findProjectQuery);
        });
    }
    getProjectsByUserId(getProjectsByUserIdQuery) {
        return __awaiter(this, void 0, void 0, function* () {
            return this.projectsService.getProjectsByUserId(getProjectsByUserIdQuery);
        });
    }
    getAcceptedProjectsByUserId(getAcceptedProjectsByUserIdQuery) {
        return __awaiter(this, void 0, void 0, function* () {
            return this.projectsService.getAcceptedProjectsByUserId(getAcceptedProjectsByUserIdQuery);
        });
    }
};
__decorate([
    swagger_1.ApiOperation({ tags: ['Create Project'] }),
    swagger_1.ApiResponse({ status: 200, description: 'Create Project.' }),
    roles_decorator_1.Roles([constant_1.CONSTANTS.ROLE.ADMIN, constant_1.CONSTANTS.ROLE.MANAGER_USER]),
    common_1.Post(),
    __param(0, common_1.Body()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [projects_dto_1.ProjectDto]),
    __metadata("design:returntype", Promise)
], ProjectsController.prototype, "createProject", null);
__decorate([
    swagger_1.ApiOperation({ tags: ['Update Project'] }),
    swagger_1.ApiResponse({ status: 200, description: 'Update Project.' }),
    roles_decorator_1.Roles([constant_1.CONSTANTS.ROLE.ADMIN, constant_1.CONSTANTS.ROLE.MANAGER_USER]),
    common_1.Put(':_id'),
    __param(0, common_1.Param()),
    __param(1, common_1.Body()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [projects_dto_1.ProjectIdRequestParamsDto,
        projects_dto_1.ProjectDto]),
    __metadata("design:returntype", Promise)
], ProjectsController.prototype, "updateProject", null);
__decorate([
    swagger_1.ApiOperation({ tags: ['Delete Project'] }),
    swagger_1.ApiResponse({ status: 200, description: 'Delete Project.' }),
    roles_decorator_1.Roles([constant_1.CONSTANTS.ROLE.ADMIN, constant_1.CONSTANTS.ROLE.MANAGER_USER]),
    common_1.Delete(':_id'),
    __param(0, common_1.Param()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [projects_dto_1.ProjectIdRequestParamsDto]),
    __metadata("design:returntype", Promise)
], ProjectsController.prototype, "deleteProject", null);
__decorate([
    swagger_1.ApiOperation({ tags: ['List Projects'] }),
    swagger_1.ApiResponse({ status: 200, description: 'List Projects.' }),
    common_1.UseGuards(passport_1.AuthGuard(constant_1.CONSTANTS.AUTH_JWT), project_guard_1.ProjectQueryGuard),
    common_1.Get(),
    __param(0, common_1.Query()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [get_projects_query_1.GetProjectsQuery]),
    __metadata("design:returntype", Promise)
], ProjectsController.prototype, "getProjects", null);
__decorate([
    swagger_1.ApiOperation({ tags: ['Find Project'] }),
    swagger_1.ApiResponse({ status: 200, description: 'Find Project.' }),
    common_1.UseGuards(passport_1.AuthGuard(constant_1.CONSTANTS.AUTH_JWT), project_guard_1.ProjectQueryGuard),
    roles_decorator_1.Roles([constant_1.CONSTANTS.ROLE.ADMIN, constant_1.CONSTANTS.ROLE.MANAGER_USER]),
    common_1.Get(':id'),
    __param(0, common_1.Param()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [find_project_query_1.FindProjectQuery]),
    __metadata("design:returntype", Promise)
], ProjectsController.prototype, "findOneProject", null);
__decorate([
    swagger_1.ApiOperation({ tags: ['List Projects By UserId'] }),
    swagger_1.ApiResponse({ status: 200, description: 'List Projects By UserId.' }),
    common_1.UseGuards(passport_1.AuthGuard(constant_1.CONSTANTS.AUTH_JWT), project_guard_1.ProjectQueryGuard),
    roles_decorator_1.Roles([constant_1.CONSTANTS.ROLE.ADMIN, constant_1.CONSTANTS.ROLE.MANAGER_USER]),
    common_1.Get('/user-projects'),
    __param(0, common_1.Query()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [get_projects_by_userId_1.GetProjectsByUserIdQuery]),
    __metadata("design:returntype", Promise)
], ProjectsController.prototype, "getProjectsByUserId", null);
__decorate([
    swagger_1.ApiOperation({ tags: ['List Accepted Projects By UserId'] }),
    swagger_1.ApiResponse({ status: 200, description: 'List Accepted Projects By UserId.' }),
    common_1.UseGuards(passport_1.AuthGuard(constant_1.CONSTANTS.AUTH_JWT), project_guard_1.ProjectQueryGuard),
    roles_decorator_1.Roles([constant_1.CONSTANTS.ROLE.ADMIN, constant_1.CONSTANTS.ROLE.MANAGER_USER]),
    common_1.Get('/accepted-projects'),
    __param(0, common_1.Query()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [get_accepted_projects_by_userId_1.GetAcceptedProjectsByUserIdQuery]),
    __metadata("design:returntype", Promise)
], ProjectsController.prototype, "getAcceptedProjectsByUserId", null);
ProjectsController = __decorate([
    common_1.Controller('projects'),
    swagger_1.ApiTags('Projects'),
    common_1.UseGuards(passport_1.AuthGuard(constant_1.CONSTANTS.AUTH_JWT), project_guard_1.ProjectGuard),
    __metadata("design:paramtypes", [projects_service_1.ProjectsService])
], ProjectsController);
exports.ProjectsController = ProjectsController;
//# sourceMappingURL=projects.controller.js.map