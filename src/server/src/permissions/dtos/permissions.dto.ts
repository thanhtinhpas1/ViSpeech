import { BaseEntityDto } from 'base/base-entity.dto';
import { IsArray, IsIn, IsNotEmpty, IsOptional, IsString, IsUUID } from 'class-validator';
import { CONSTANTS } from 'common/constant';
import { ObjectID } from 'mongodb';
import { Column, Entity } from 'typeorm';
import { ErrorUtils } from '../../utils/errorUtils';
import { ERR } from '../../common/error';

export class PermissionAssignDto {
    constructor(assigneeUsername: string, projectId, permissions: string[], assignerId) {
        this.assigneeUsername = assigneeUsername;
        this.projectId = projectId;
        this.permissions = permissions;
        this.assignerId = assignerId;
    }

    @IsString(ErrorUtils.getMessage('assigneeUsername', ERR.IsString))
    @IsNotEmpty(ErrorUtils.getMessage('assigneeUsername', ERR.IsNotEmpty))
    assigneeUsername: string;

    @IsNotEmpty(ErrorUtils.getMessage('projectId', ERR.IsNotEmpty))
    @IsUUID('all', ErrorUtils.getMessage('projectId', ERR.IsUUID))
    projectId: ObjectID;

    @IsNotEmpty(ErrorUtils.getMessage('permissions', ERR.IsNotEmpty))
    @IsArray(ErrorUtils.getMessage('permissions', ERR.IsArray))
    @IsIn([CONSTANTS.PERMISSION.CSR_USER], { each: true, message: ErrorUtils.getMessage('permissions', ERR.IsIn).message })
    permissions: string[];

    @IsNotEmpty(ErrorUtils.getMessage('assignerId', ERR.IsNotEmpty))
    @IsUUID('all', ErrorUtils.getMessage('assignerId', ERR.IsUUID))
    assignerId: ObjectID;

    @IsOptional()
    @IsUUID('all', ErrorUtils.getMessage('assigneeId', ERR.IsUUID))
    assigneeId: ObjectID;
}

export class PermissionResponseDto {
    constructor(emailToken: string, status: string) {
        this.emailToken = emailToken;
        this.status = status;
    }

    @IsString(ErrorUtils.getMessage('emailToken', ERR.IsString))
    @IsNotEmpty(ErrorUtils.getMessage('emailToken', ERR.IsNotEmpty))
    emailToken: string;

    @IsString(ErrorUtils.getMessage('status', ERR.IsString))
    @IsIn([
        CONSTANTS.STATUS.ACCEPTED,
        CONSTANTS.STATUS.REJECTED
    ], { message: ErrorUtils.getMessage('status', ERR.IsIn).message })
    status: string;
}

export class PermissionIdRequestParamsDto {
    constructor(permissionId) {
        this._id = permissionId;
    }

    @IsString(ErrorUtils.getMessage('_id', ERR.IsString))
    @IsNotEmpty(ErrorUtils.getMessage('_id', ERR.IsNotEmpty))
    _id: string;
}

export class EmailTokenParamsDto {
    constructor(emailToken) {
        this.emailToken = emailToken;
    }

    @IsString(ErrorUtils.getMessage('emailToken', ERR.IsString))
    @IsNotEmpty(ErrorUtils.getMessage('emailToken', ERR.IsNotEmpty))
    emailToken: string;
}

@Entity('permissions')
export class PermissionDto extends BaseEntityDto {
    constructor(permissions: string[], assigneeId, assignerId, projectId, status: string = CONSTANTS.STATUS.PENDING) {
        super();
        this.permissions = permissions;
        this.assigneeId = assigneeId;
        this.assignerId = assignerId;
        this.projectId = projectId;
        this.status = status;
    }

    @IsNotEmpty(ErrorUtils.getMessage('permissions', ERR.IsNotEmpty))
    @IsArray(ErrorUtils.getMessage('permissions', ERR.IsArray))
    @IsIn([CONSTANTS.PERMISSION.CSR_USER], { each: true, message: ErrorUtils.getMessage('permissions', ERR.IsIn).message })
    @Column()
    permissions: string[];

    @IsString(ErrorUtils.getMessage('assigneeId', ERR.IsString))
    @IsUUID('all', ErrorUtils.getMessage('assigneeId', ERR.IsUUID))
    @Column({
        nullable: false,
        type: 'uuid',
    })
    assigneeId: ObjectID;

    @IsString(ErrorUtils.getMessage('assignerId', ERR.IsString))
    @IsUUID('all', ErrorUtils.getMessage('assignerId', ERR.IsUUID))
    @Column({
        nullable: false,
        type: 'uuid',
    })
    assignerId: ObjectID;

    @IsNotEmpty(ErrorUtils.getMessage('projectId', ERR.IsNotEmpty))
    @IsString(ErrorUtils.getMessage('projectId', ERR.IsString))
    @IsUUID('all', ErrorUtils.getMessage('projectId', ERR.IsUUID))
    @Column({
        nullable: false,
        type: 'uuid',
    })
    projectId: ObjectID;

    @IsOptional()
    @IsString(ErrorUtils.getMessage('status', ERR.IsString))
    @IsIn([
        CONSTANTS.STATUS.PENDING,
        CONSTANTS.STATUS.ACCEPTED,
        CONSTANTS.STATUS.REJECTED,
        CONSTANTS.STATUS.INVALID,
    ], { message: ErrorUtils.getMessage('status', ERR.IsIn).message })
    @Column()
    status: string;
}
