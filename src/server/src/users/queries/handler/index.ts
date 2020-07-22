import { FindUserUsernameHandler } from './find-user-username.handler';
import { FindUserHandler } from './find-user.handler';
import { GetUsersHandler } from './get-users.handler';
import { GetProjectAssigneesHandler } from './get-project-assignees.handler';
import { GetUsernamesHandler } from './get-usernames.handler';

export const QueryHandlers = [
    GetUsersHandler,
    FindUserHandler,
    FindUserUsernameHandler,
    GetProjectAssigneesHandler,
    GetUsernamesHandler,
];
