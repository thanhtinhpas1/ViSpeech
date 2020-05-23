import { BaseEntityDto } from 'base/base-entity.dto';
import { IsArray, IsEmail, IsEmpty, IsNotEmpty, IsOptional, IsString, IsBoolean } from 'class-validator';
import { RoleDto } from 'roles/dtos/roles.dto';
import { Column, Entity, Index } from 'typeorm';
import { ERR } from "../../common/error";
import { ErrUtil } from "../../utils/err.util";

export class UserIdRequestParamsDto {
    constructor(userId) {
        this._id = userId;
    }

    @IsString(ErrUtil.getMessage('_id', ERR.IsString))
    @IsOptional()
    _id: string;
}

export class ChangePasswordBody {
    @IsNotEmpty(ErrUtil.getMessage('userId', ERR.IsNotEmpty))
    @IsString(ErrUtil.getMessage('userId', ERR.IsString))
    readonly userId;

    @IsNotEmpty(ErrUtil.getMessage('oldPassword', ERR.IsNotEmpty))
    @IsString(ErrUtil.getMessage('oldPassword', ERR.IsString))
    readonly oldPassword;

    @IsNotEmpty(ErrUtil.getMessage('newPassword', ERR.IsNotEmpty))
    @IsString(ErrUtil.getMessage('newPassword', ERR.IsString))
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
        this.roles = roles;
        this.isActive = true;
    }

    @IsString(ErrUtil.getMessage('newPassword', ERR.IsString))
    @IsNotEmpty(ErrUtil.getMessage('newPassword', ERR.IsNotEmpty))
    @Column()
    firstName: string;

    @IsString(ErrUtil.getMessage('lastName', ERR.IsString))
    @IsNotEmpty(ErrUtil.getMessage('lastName', ERR.IsNotEmpty))
    @Column()
    lastName: string;

    @IsString(ErrUtil.getMessage('username', ERR.IsString))
    @IsNotEmpty(ErrUtil.getMessage('username', ERR.IsNotEmpty))
    @Index({ unique: true })
    @Column({ nullable: false, update: false })
    username: string;

    @IsOptional()
    @IsString(ErrUtil.getMessage('password', ERR.IsString))
    @Column({
        select: false, nullable: false,
    })
    password: string;

    @IsEmail({}, ErrUtil.getMessage('email', ERR.IsEmail))
    @IsNotEmpty(ErrUtil.getMessage('email', ERR.IsNotEmpty))
    @Column({
        unique: true, update: false,
    })
    email: string;

    @IsEmpty(ErrUtil.getMessage('firstTimeLoginRemaining', ERR.IsEmpty))
    @Column({
        default: true,
        nullable: true,
        insert: false,
    })
    firstTimeLoginRemaining: boolean;

    @IsNotEmpty(ErrUtil.getMessage('isActive', ERR.IsNotEmpty))
    @IsBoolean(ErrUtil.getMessage('isActive', ERR.IsBoolean))
    @Column({
        default: true,
        nullable: false,
    })
    isActive: boolean;

    @IsArray(ErrUtil.getMessage('roles', ERR.IsArray))
    @IsOptional()
    @Column()
    roles: RoleDto[];
}
