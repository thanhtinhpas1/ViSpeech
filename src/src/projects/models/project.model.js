"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const cqrs_1 = require("@nestjs/cqrs");
const project_created_event_1 = require("../events/impl/project-created.event");
const project_updated_event_1 = require("../events/impl/project-updated.event");
const project_deleted_event_1 = require("../events/impl/project-deleted.event");
const project_welcomed_event_1 = require("../events/impl/project-welcomed.event");
class Project extends cqrs_1.AggregateRoot {
    constructor(id) {
        super();
        this.id = id;
    }
    setData(data) {
        this.data = data;
    }
    createProject(streamId) {
        this.apply(new project_created_event_1.ProjectCreatedEvent(streamId, this.data));
    }
    updateProject(streamId) {
        this.apply(new project_updated_event_1.ProjectUpdatedEvent(streamId, this.data));
    }
    welcomeProject(streamId) {
        this.apply(new project_welcomed_event_1.ProjectWelcomedEvent(streamId, this.id));
    }
    deleteProject(streamId) {
        this.apply(new project_deleted_event_1.ProjectDeletedEvent(streamId, this.id));
    }
}
exports.Project = Project;
//# sourceMappingURL=project.model.js.map