import {BaseEntityDto} from 'base/base-entity.dto';
import {IsArray, IsEmail, IsEmpty, IsNotEmpty, IsOptional, IsString} from 'class-validator';
import {RoleDto} from 'roles/dtos/roles.dto';
import {Column, Entity, Index} from 'typeorm';

export class UserIdRequestParamsDto {
    constructor(userId) {
        this._id = userId;
    }

    @IsString()
    @IsOptional()
    _id: string;
}

// export class AssignUserRoleBody {
//     @IsNotEmpty()
//     @IsString()
//     @IsIn([CONSTANTS.ROLE.USER, CONSTANTS.ROLE.MANAGER_USER])
//     roleName: string;
// }

export class ChangePasswordBody {
    @IsNotEmpty()
    @IsString()
    readonly userId;

    @IsNotEmpty()
    @IsString()
    readonly oldPassword;

    @IsNotEmpty()
    @IsString()
    readonly newPassword;
}

@Entity('users')
export class UserDto extends BaseEntityDto {
    constructor(firstName: string, lastName: string, username: string, password: string, email: string, roles: RoleDto[]) {
        super();
        this.firstName = firstName;
        this.lastName = lastName;
        this.username = username;
        this.password = password;
        this.email = email;
        // this.assignerId = assignerId;
        this.roles = roles;
    }

    @IsString()
    @IsNotEmpty()
    @Column()
    firstName: string;

    @IsString()
    @IsNotEmpty()
    @Column()
    lastName: string;

    @IsString()
    @IsNotEmpty()
    @Index({ unique: true })
    @Column({ nullable: false, update: false })
    username: string;

    @IsOptional()
    @IsString()
    @Column({
        select: false, nullable: false,
    })
    password: string;

    @IsEmail()
    @IsNotEmpty()
    @Column({
        unique: true, update: false,
    })
    email: string;

    // @IsOptional()
    // @IsUUID()
    // @Column({insert: false})
    // assignerId: string;

    @IsEmpty()
    @Column({
        default: true,
        nullable: true,
        insert: false,
    })
    firstTimeLoginRemaining: boolean;

    @IsEmpty()
    @Column({
        default: true,
        nullable: false,
        insert: false,
    })
    isActive: boolean;

    @IsArray()
    @IsOptional()
    @Column()
    roles: RoleDto[];
}
