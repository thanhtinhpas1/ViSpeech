import {FindUserUsernameHandler} from './find-user-username.handler';
import {FindUserHandler} from './find-user.handler';
import {GetUsersHandler} from './get-users.handler';
import {GetAssigneeHandler} from "./get-assignee.handler";

export const QueryHandlers = [
    GetUsersHandler,
    FindUserHandler,
    FindUserUsernameHandler,
    GetAssigneeHandler,
];
