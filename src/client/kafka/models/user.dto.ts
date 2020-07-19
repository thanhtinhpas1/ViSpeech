import { BaseEntityDto } from './base-entity.dto';
import { RoleDto } from './role.dto';

export class UserDto extends BaseEntityDto {
    constructor(firstName: string, lastName: string, username: string, password: string,
                email: string, roles: RoleDto[]) {
        super();
        this.firstName = firstName;
        this.lastName = lastName;
        this.username = username;
        this.password = password;
        this.email = email;
        this.roles = roles;
    }

    firstName: string;
    lastName: string;
    username: string;
    password: string;
    email: string;
    isActive: boolean;
    roles: RoleDto[];
}