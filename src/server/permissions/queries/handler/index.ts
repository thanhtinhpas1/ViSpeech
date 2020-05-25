import {GetPermissionsHandler} from './get-permissions.handler';
import {FindPermissionHandler} from './find-permission.handler';
import { FindPermisisonsByIdsHandler } from './find-permissions-by-ids.handler';

export const QueryHandlers = [
    GetPermissionsHandler,
    FindPermisisonsByIdsHandler,
    FindPermissionHandler
];
