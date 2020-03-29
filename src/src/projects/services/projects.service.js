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
const create_project_command_1 = require("../commands/impl/create-project.command");
const update_project_command_1 = require("../commands/impl/update-project.command");
const delete_project_command_1 = require("../commands/impl/delete-project.command");
const get_projects_query_1 = require("projects/queries/impl/get-projects.query");
const find_project_query_1 = require("projects/queries/impl/find-project.query");
const get_projects_by_userId_1 = require("projects/queries/impl/get-projects-by-userId");
const get_accepted_projects_by_userId_1 = require("projects/queries/impl/get-accepted-projects-by-userId");
let ProjectsService = class ProjectsService {
    constructor(commandBus, queryBus) {
        this.commandBus = commandBus;
        this.queryBus = queryBus;
    }
    createProject(streamId, projectDto) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this.commandBus.execute(new create_project_command_1.CreateProjectCommand(streamId, projectDto));
        });
    }
    updateProject(streamId, projectDto) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this.commandBus.execute(new update_project_command_1.UpdateProjectCommand(streamId, projectDto));
        });
    }
    deleteProject(streamId, projectIdDto) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this.commandBus.execute(new delete_project_command_1.DeleteProjectCommand(streamId, projectIdDto));
        });
    }
    getProjects(getProjectsQuery) {
        return __awaiter(this, void 0, void 0, function* () {
            const query = new get_projects_query_1.GetProjectsQuery();
            Object.assign(query, getProjectsQuery);
            return yield this.queryBus.execute(query);
        });
    }
    findOne(findProjectQuery) {
        return __awaiter(this, void 0, void 0, function* () {
            const query = new find_project_query_1.FindProjectQuery(findProjectQuery.id);
            return yield this.queryBus.execute(query);
        });
    }
    getProjectsByUserId(getProjectsByUserIdQuery) {
        return __awaiter(this, void 0, void 0, function* () {
            const query = new get_projects_by_userId_1.GetProjectsByUserIdQuery(getProjectsByUserIdQuery.userId);
            Object.assign(query, getProjectsByUserIdQuery);
            return yield this.queryBus.execute(query);
        });
    }
    getAcceptedProjectsByUserId(getAcceptedProjectsByUserIdQuery) {
        return __awaiter(this, void 0, void 0, function* () {
            const query = new get_accepted_projects_by_userId_1.GetAcceptedProjectsByUserIdQuery(getAcceptedProjectsByUserIdQuery.userId);
            Object.assign(query, getAcceptedProjectsByUserIdQuery);
            return yield this.queryBus.execute(query);
        });
    }
};
ProjectsService = __decorate([
    common_1.Injectable(),
    __metadata("design:paramtypes", [cqrs_1.CommandBus,
        cqrs_1.QueryBus])
], ProjectsService);
exports.ProjectsService = ProjectsService;
//# sourceMappingURL=projects.service.js.map