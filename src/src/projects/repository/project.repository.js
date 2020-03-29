"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
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
const project_model_1 = require("../models/project.model");
let ProjectRepository = class ProjectRepository {
    createProject(streamId, projectDto) {
        return __awaiter(this, void 0, void 0, function* () {
            const project = new project_model_1.Project(undefined);
            project.setData(projectDto);
            project.createProject(streamId);
            return project;
        });
    }
    updateProject(streamId, projectDto) {
        return __awaiter(this, void 0, void 0, function* () {
            const project = new project_model_1.Project(undefined);
            project.setData(projectDto);
            project.updateProject(streamId);
            return project;
        });
    }
    deleteProject(streamId, projectId) {
        return __awaiter(this, void 0, void 0, function* () {
            const project = new project_model_1.Project(projectId);
            project.deleteProject(streamId);
            return project;
        });
    }
    welcomeProject(streamId, projectId) {
        return __awaiter(this, void 0, void 0, function* () {
            const project = new project_model_1.Project(projectId);
            project.welcomeProject(streamId);
            return project;
        });
    }
};
ProjectRepository = __decorate([
    common_1.Injectable()
], ProjectRepository);
exports.ProjectRepository = ProjectRepository;
//# sourceMappingURL=project.repository.js.map