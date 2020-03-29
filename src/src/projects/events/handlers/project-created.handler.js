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
const project_created_event_1 = require("../impl/project-created.event");
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const projects_dto_1 = require("projects/dtos/projects.dto");
const typeorm_2 = require("typeorm");
let ProjectCreatedHandler = class ProjectCreatedHandler {
    constructor(repository, eventBus) {
        this.repository = repository;
        this.eventBus = eventBus;
    }
    handle(event) {
        return __awaiter(this, void 0, void 0, function* () {
            common_1.Logger.log(event.projectDto._id, "ProjectCreatedEvent");
            const { streamId, projectDto } = event;
            try {
                yield this.repository.save(projectDto);
                this.eventBus.publish(new project_created_event_1.ProjectCreatedSuccessEvent(streamId, projectDto));
            }
            catch (error) {
                this.eventBus.publish(new project_created_event_1.ProjectCreatedFailedEvent(streamId, projectDto, error));
            }
        });
    }
};
ProjectCreatedHandler = __decorate([
    cqrs_1.EventsHandler(project_created_event_1.ProjectCreatedEvent),
    __param(0, typeorm_1.InjectRepository(projects_dto_1.ProjectDto)),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        cqrs_1.EventBus])
], ProjectCreatedHandler);
exports.ProjectCreatedHandler = ProjectCreatedHandler;
let ProjectCreatedSuccessHandler = class ProjectCreatedSuccessHandler {
    handle(event) {
        common_1.Logger.log(event.projectDto._id, 'ProjectCreatedSuccessEvent');
    }
};
ProjectCreatedSuccessHandler = __decorate([
    cqrs_1.EventsHandler(project_created_event_1.ProjectCreatedSuccessEvent)
], ProjectCreatedSuccessHandler);
exports.ProjectCreatedSuccessHandler = ProjectCreatedSuccessHandler;
let ProjectCreatedFailedHandler = class ProjectCreatedFailedHandler {
    handle(event) {
        common_1.Logger.log(event.error, 'ProjectCreatedFailedEvent');
    }
};
ProjectCreatedFailedHandler = __decorate([
    cqrs_1.EventsHandler(project_created_event_1.ProjectCreatedFailedEvent)
], ProjectCreatedFailedHandler);
exports.ProjectCreatedFailedHandler = ProjectCreatedFailedHandler;
//# sourceMappingURL=project-created.handler.js.map