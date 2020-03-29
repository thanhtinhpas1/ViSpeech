import { BaseEntityDto } from 'base/base-entity.dto';
import { ObjectID } from 'mongodb';
export declare class PermissionAssignDto {
    constructor(assigneeUsername: string, projectId: any, permissions: string[], assignerId: any);
    assigneeUsername: string;
    projectId: ObjectID;
    permissions: string[];
    assignerId: ObjectID;
    assigneeId: ObjectID;
}
export declare class PermissionResponseDto {
    constructor(emailToken: string, status: string);
    emailToken: string;
    status: string;
}
export declare class PermissionIdRequestParamsDto {
    constructor(permissionId: any);
    _id: string;
}
export declare class PermissionDto extends BaseEntityDto {
    constructor(permissions: string[], assigneeId: any, assignerId: any, projectId: any, status?: string);
    permissions: string[];
    assigneeId: ObjectID;
    assignerId: ObjectID;
    projectId: ObjectID;
    status: string;
}
