"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class ProjectCreatedEvent {
    constructor(streamId, projectDto) {
        this.streamId = streamId;
        this.projectDto = projectDto;
    }
}
exports.ProjectCreatedEvent = ProjectCreatedEvent;
class ProjectCreatedSuccessEvent {
    constructor(streamId, projectDto) {
        this.streamId = streamId;
        this.projectDto = projectDto;
    }
}
exports.ProjectCreatedSuccessEvent = ProjectCreatedSuccessEvent;
class ProjectCreatedFailedEvent {
    constructor(streamId, projectDto, error) {
        this.streamId = streamId;
        this.projectDto = projectDto;
        this.error = error;
    }
}
exports.ProjectCreatedFailedEvent = ProjectCreatedFailedEvent;
//# sourceMappingURL=project-created.event.js.map