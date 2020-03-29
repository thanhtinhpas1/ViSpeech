"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const project_created_handler_1 = require("./project-created.handler");
const project_updated_handler_1 = require("./project-updated.handler");
const project_deleted_handler_1 = require("./project-deleted.handler");
const project_welcomed_handler_1 = require("./project-welcomed.handler");
exports.EventHandlers = [
    project_created_handler_1.ProjectCreatedHandler,
    project_created_handler_1.ProjectCreatedSuccessHandler,
    project_created_handler_1.ProjectCreatedFailedHandler,
    project_updated_handler_1.ProjectUpdatedHandler,
    project_deleted_handler_1.ProjectDeletedHandler,
    project_welcomed_handler_1.ProjectWelcomedHandler,
];
//# sourceMappingURL=index.js.map