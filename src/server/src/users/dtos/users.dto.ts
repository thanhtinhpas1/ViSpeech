import { BaseEntityDto } from 'base/base-entity.dto';
import { IsArray, IsBoolean, IsEmail, IsEnum, IsNotEmpty, IsOptional, IsString } from 'class-validator';
import { RoleDto } from 'roles/dtos/roles.dto';
import { Column, Entity } from 'typeorm';
import { ERR } from '../../common/error';
import { ErrorUtils } from '../../utils/errorUtils';

export class UserIdRequestParamsDto {
    constructor(userId) {
        this._id = userId;
    }

    @IsString(ErrorUtils.getMessage('_id', ERR.IsString))
    @IsOptional()
    _id: string;
}

export class GetProjectAssigneesParamsDto {
    @IsNotEmpty(ErrorUtils.getMessage('projectId', ERR.IsNotEmpty))
    @IsString(ErrorUtils.getMessage('projectId', ERR.IsString))
    projectId: string;
}

export class ChangePasswordBody {
    @IsNotEmpty(ErrorUtils.getMessage('userId', ERR.IsNotEmpty))
    @IsString(ErrorUtils.getMessage('userId', ERR.IsString))
    readonly userId;

    @IsNotEmpty(ErrorUtils.getMessage('oldPassword', ERR.IsNotEmpty))
    @IsString(ErrorUtils.getMessage('oldPassword', ERR.IsString))
    readonly oldPassword;

    @IsNotEmpty(ErrorUtils.getMessage('newPassword', ERR.IsNotEmpty))
    @IsString(ErrorUtils.getMessage('newPassword', ERR.IsString))
    readonly newPassword;
}

export class ResetPasswordBody {
    @IsOptional()
    @IsString(ErrorUtils.getMessage('userId', ERR.IsString))
    userId: string;

    @IsNotEmpty(ErrorUtils.getMessage('password', ERR.IsNotEmpty))
    @IsString(ErrorUtils.getMessage('password', ERR.IsString))
    readonly password;

    @IsNotEmpty(ErrorUtils.getMessage('emailToken', ERR.IsNotEmpty))
    @IsString(ErrorUtils.getMessage('emailToken', ERR.IsString))
    readonly emailToken;
}

export enum USER_TYPE {
    NORMAL = 'NORMAL',
    FACEBOOK = 'FACEBOOK',
    GOOGLE = 'GOOGLE',
    TWITTER = 'TWITTER',
}

@Entity('users')
export class UserDto extends BaseEntityDto {
    constructor(firstName: string, lastName: string, username: string, password: string, email: string, roles: RoleDto[],
                userType: USER_TYPE = USER_TYPE.NORMAL, socialId?: string) {
        super();
        this.firstName = firstName;
        this.lastName = lastName;
        this.username = username;
        this.password = password;
        this.email = email;
        this.roles = roles;
        this.isActive = true;
        this.socialId = socialId;
        this.userType = userType;
    }

    @IsString(ErrorUtils.getMessage('firstName', ERR.IsString))
    @IsNotEmpty(ErrorUtils.getMessage('firstName', ERR.IsNotEmpty))
    @Column()
    firstName: string;

    @IsString(ErrorUtils.getMessage('lastName', ERR.IsString))
    @IsOptional()
    @Column()
    lastName: string;

    @IsString(ErrorUtils.getMessage('username', ERR.IsString))
    @IsNotEmpty(ErrorUtils.getMessage('username', ERR.IsNotEmpty))
    @Column({ nullable: false, update: false, unique: true })
    username: string;

    @IsOptional()
    @IsString(ErrorUtils.getMessage('password', ERR.IsString))
    @Column({
        select: false, nullable: false,
    })
    password: string;

    @IsEmail({}, ErrorUtils.getMessage('email', ERR.IsEmail))
    @IsNotEmpty(ErrorUtils.getMessage('email', ERR.IsNotEmpty))
    @Column({
        unique: true, update: false,
    })
    email: string;

    @IsNotEmpty(ErrorUtils.getMessage('isActive', ERR.IsNotEmpty))
    @IsBoolean(ErrorUtils.getMessage('isActive', ERR.IsBoolean))
    @Column({
        default: true,
        nullable: false,
    })
    isActive: boolean;

    @IsOptional()
    @IsString(ErrorUtils.getMessage('socialId', ERR.IsString))
    @Column()
    socialId: string;

    @IsOptional()
    @IsString()
    @IsEnum(USER_TYPE)
    @Column({ default: USER_TYPE.NORMAL })
    userType: USER_TYPE;

    @IsArray(ErrorUtils.getMessage('roles', ERR.IsArray))
    @IsOptional()
    @Column()
    roles: RoleDto[];
}
