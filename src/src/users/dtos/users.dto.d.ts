import { BaseEntityDto } from 'base/base-entity.dto';
import { RoleDto } from 'roles/dtos/roles.dto';
export declare class UserIdRequestParamsDto {
    constructor(userId: any);
    _id: string;
}
export declare class ChangePasswordBody {
    readonly oldPassword: any;
    readonly newPassword: any;
}
export declare class UserDto extends BaseEntityDto {
    constructor(firstName: string, lastName: string, username: string, password: string, email: string, roles: RoleDto[]);
    firstName: string;
    lastName: string;
    username: string;
    password: string;
    email: string;
    firstTimeLoginRemaining: boolean;
    isActive: boolean;
    roles: RoleDto[];
}
