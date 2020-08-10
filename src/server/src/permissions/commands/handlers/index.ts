import { CreatePermissionHandler } from './create-permission.handler';
import { DeletePermissionHandler } from './delete-permission.handler';
import { UpdatePermissionHandler } from './update-permission.handler';
import { WelcomePermissionHandler } from './welcome-permission.handler';
import { SendAssignPermissionEmailHandler } from './send-assign-permission-email.handler';
import { ReplyPermissionAssignHandler } from './reply-permission-assign.handler';
import { DeletePermissionByUserIdHandler } from './delete-permission-by-userId.handler';
import { DeletePermissionForAssigneeHandler } from './delete-permission-for-assignee.handler';
import { UpdatePermissionExpirationDateHandler } from './update-permission-expiration-date.handler';

export const CommandHandlers = [
    CreatePermissionHandler,
    DeletePermissionHandler,
    DeletePermissionByUserIdHandler,
    DeletePermissionForAssigneeHandler,
    UpdatePermissionHandler,
    UpdatePermissionExpirationDateHandler,
    WelcomePermissionHandler,
    SendAssignPermissionEmailHandler,
    ReplyPermissionAssignHandler,
];
