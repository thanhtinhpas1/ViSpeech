"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const get_projects_handler_1 = require("./get-projects.handler");
const get_projects_by_userId_handler_1 = require("./get-projects-by-userId.handler");
const find_project_handler_1 = require("./find-project.handler");
const get_accepted_projects_by_userId_handler_1 = require("./get-accepted-projects-by-userId.handler");
exports.QueryHandlers = [
    get_projects_handler_1.GetProjectsHandler,
    get_projects_by_userId_handler_1.GetProjectsByUserIdHandler,
    get_accepted_projects_by_userId_handler_1.GetAcceptedProjectsByUserIdHandler,
    find_project_handler_1.FindProjectHandler,
];
//# sourceMappingURL=index.js.map