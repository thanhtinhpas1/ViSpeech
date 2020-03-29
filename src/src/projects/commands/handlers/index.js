"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const create_project_handler_1 = require("./create-project.handler");
const delete_project_handler_1 = require("./delete-project.handler");
const update_project_handler_1 = require("./update-project.handler");
const welcome_project_handler_1 = require("./welcome-project.handler");
exports.CommandHandlers = [
    create_project_handler_1.CreateProjectHandler,
    delete_project_handler_1.DeleteProjectHandler,
    update_project_handler_1.UpdateProjectHandler,
    welcome_project_handler_1.WelcomeProjectHandler,
];
//# sourceMappingURL=index.js.map