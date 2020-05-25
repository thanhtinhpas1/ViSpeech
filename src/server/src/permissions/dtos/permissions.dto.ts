import {BaseEntityDto} from 'base/base-entity.dto';
import {IsArray, IsIn, IsNotEmpty, IsOptional, IsString, IsUUID} from 'class-validator';
import {CONSTANTS} from 'common/constant';
import {ObjectID} from 'mongodb';
import {Column, Entity} from 'typeorm';
import { ErrUtil } from "../../utils/err.util";
import { ERR } from "../../common/error";

export class PermissionAssignDto {
    constructor(assigneeUsername: string, projectId, permissions: string[], assignerId) {
        this.assigneeUsername = assigneeUsername;
        this.projectId = projectId;
        this.permissions = permissions;
        this.assignerId = assignerId;
    }

    @IsString(ErrUtil.getMessage('assigneeUsername', ERR.IsString))
    @IsNotEmpty(ErrUtil.getMessage('assigneeUsername', ERR.IsNotEmpty))
    assigneeUsername: string;

    @IsNotEmpty(ErrUtil.getMessage('projectId', ERR.IsNotEmpty))
    @IsUUID('all', ErrUtil.getMessage('projectId', ERR.IsUUID))
    @Column({
        nullable: false,
        type: 'uuid',
    })
    projectId: ObjectID;

    @IsNotEmpty(ErrUtil.getMessage('permissions', ERR.IsNotEmpty))
    @IsArray(ErrUtil.getMessage('permissions', ERR.IsArray))
    @IsIn([CONSTANTS.PERMISSION.CSR_USER], {each: true})
    permissions: string[];

    @IsNotEmpty(ErrUtil.getMessage('assignerId', ERR.IsNotEmpty))
    @IsUUID('all', ErrUtil.getMessage('assignerId', ERR.IsUUID))
    @Column({
        nullable: false,
        type: 'uuid',
    })
    assignerId: ObjectID;

    @IsOptional()
    @IsUUID('all', ErrUtil.getMessage('assigneeId', ERR.IsUUID))
    @Column({
        nullable: false,
        type: 'uuid',
    })
    assigneeId: ObjectID;
}

export class PermissionResponseDto {
    constructor(emailToken: string, status: string) {
        this.emailToken = emailToken;
        this.status = status;
    }

    @IsString(ErrUtil.getMessage('emailToken', ERR.IsString))
    @IsNotEmpty(ErrUtil.getMessage('emailToken', ERR.IsNotEmpty))
    emailToken: string;

    @IsString(ErrUtil.getMessage('status', ERR.IsString))
    @IsIn([
        CONSTANTS.STATUS.ACCEPTED,
        CONSTANTS.STATUS.REJECTED
    ])
    @Column()
    status: string;
}

export class PermissionIdRequestParamsDto {
    constructor(permissionId) {
        this._id = permissionId;
    }

    @IsString(ErrUtil.getMessage('_id', ERR.IsString))
    @IsNotEmpty(ErrUtil.getMessage('_id', ERR.IsNotEmpty))
    _id: string;
}

export class EmailTokenParamsDto {
    constructor(emailToken) {
        this.emailToken = emailToken;
    }

    @IsString(ErrUtil.getMessage('emailToken', ERR.IsString))
    @IsNotEmpty(ErrUtil.getMessage('emailToken', ERR.IsNotEmpty))
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

    @IsNotEmpty(ErrUtil.getMessage('permissions', ERR.IsNotEmpty))
    @IsArray(ErrUtil.getMessage('permissions', ERR.IsArray))
    @IsIn([CONSTANTS.PERMISSION.CSR_USER], {each: true})
    @Column()
    permissions: string[];

    @IsString(ErrUtil.getMessage('assigneeId', ERR.IsString))
    @IsUUID('all', ErrUtil.getMessage('assigneeId', ERR.IsUUID))
    @Column({
        nullable: false,
        type: 'uuid',
    })
    assigneeId: ObjectID;

    @IsString(ErrUtil.getMessage('assignerId', ERR.IsString))
    @IsUUID('all', ErrUtil.getMessage('assignerId', ERR.IsUUID))
    @Column({
        nullable: false,
        type: 'uuid',
    })
    assignerId: ObjectID;

    @IsNotEmpty(ErrUtil.getMessage('projectId', ERR.IsNotEmpty))
    @IsString(ErrUtil.getMessage('projectId', ERR.IsString))
    @IsUUID('all', ErrUtil.getMessage('projectId', ERR.IsUUID))
    @Column({
        nullable: false,
        type: 'uuid',
    })
    projectId: ObjectID;

    @IsOptional()
    @IsString(ErrUtil.getMessage('status', ERR.IsString))
    @IsIn([
        CONSTANTS.STATUS.PENDING,
        CONSTANTS.STATUS.ACCEPTED,
        CONSTANTS.STATUS.REJECTED,
        CONSTANTS.STATUS.INVALID,
    ])
    @Column()
    status: string;
}
