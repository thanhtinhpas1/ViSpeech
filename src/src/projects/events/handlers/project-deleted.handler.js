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
const cqrs_1 = require("@nestjs/cqrs");
const typeorm_1 = require("@nestjs/typeorm");
const projects_dto_1 = require("projects/dtos/projects.dto");
const project_deleted_event_1 = require("../impl/project-deleted.event");
const typeorm_2 = require("typeorm");
let ProjectDeletedHandler = class ProjectDeletedHandler {
    constructor(repository) {
        this.repository = repository;
    }
    handle(event) {
        return __awaiter(this, void 0, void 0, function* () {
            common_1.Logger.log(event.projectId, 'ProjectDeletedEvent');
            const { streamId, projectId } = event;
            try {
                const project = yield this.repository.findOne({ _id: projectId });
                if (project) {
                    yield this.repository.delete({ _id: projectId });
                    return;
                }
                throw new common_1.NotFoundException(`Project with _id ${projectId} does not exist.`);
            }
            catch (error) {
                common_1.Logger.error(error, '', 'ProjectDeletedEvent');
            }
        });
    }
};
ProjectDeletedHandler = __decorate([
    cqrs_1.EventsHandler(project_deleted_event_1.ProjectDeletedEvent),
    __param(0, typeorm_1.InjectRepository(projects_dto_1.ProjectDto)),
    __metadata("design:paramtypes", [typeorm_2.Repository])
], ProjectDeletedHandler);
exports.ProjectDeletedHandler = ProjectDeletedHandler;
//# sourceMappingURL=project-deleted.handler.js.map