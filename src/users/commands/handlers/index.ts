import {AssignUserRoleHandler} from './assign-user-role.handler';
import {CreateUserHandler, CreateUserStartHandler} from './create-user.handler';
import {DeleteUserHandler} from './delete-user.handler';
import {UpdateUserHandler} from './update-user.handler';
import {WelcomeUserHandler} from './welcome-user.handler';
import {ChangePasswordHandler} from './change-password.handler';

export const CommandHandlers = [
    CreateUserStartHandler,
    CreateUserHandler,
    DeleteUserHandler,
    UpdateUserHandler,
    WelcomeUserHandler,
    AssignUserRoleHandler,
    ChangePasswordHandler,
];
