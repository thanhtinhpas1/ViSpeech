import { BaseEntityDto } from 'base/base-entity.dto';
import { IsArray, IsIn, IsNotEmpty, IsOptional, IsString, IsUUID, IsPositive, IsNumber } from 'class-validator';
import { CONSTANTS } from 'common/constant';
import { ObjectID } from 'mongodb';
import { Column, Entity } from 'typeorm';
import { ErrorUtils } from '../../utils/errorUtils';
import { ERR } from '../../common/error';

export class PermissionAssignDto {
    constructor(assigneeUsernames: string[], projectId, expiresIn: number, assignerId) {
        this.assigneeUsernames = assigneeUsernames;
        this.projectId = projectId;
        this.expiresIn = expiresIn;
        this.assignerId = assignerId;
    }

    @IsArray(ErrorUtils.getMessage('assigneeUsernames', ERR.IsArray))
    @IsNotEmpty(ErrorUtils.getMessage('assigneeUsernames', ERR.IsNotEmpty))
    assigneeUsernames: string[];

    @IsNotEmpty(ErrorUtils.getMessage('projectId', ERR.IsNotEmpty))
    @IsUUID('all', ErrorUtils.getMessage('projectId', ERR.IsUUID))
    projectId: ObjectID;

    @IsNotEmpty(ErrorUtils.getMessage('expiresIn', ERR.IsNotEmpty))
    @IsNumber({}, ErrorUtils.getMessage('expiresIn', ERR.IsNumber))
    @IsPositive(ErrorUtils.getMessage('expiresIn', ERR.IsPositive))
    expiresIn: number;

    @IsNotEmpty(ErrorUtils.getMessage('assignerId', ERR.IsNotEmpty))
    @IsUUID('all', ErrorUtils.getMessage('assignerId', ERR.IsUUID))
    assignerId: ObjectID;

    @IsOptional()
    @IsArray(ErrorUtils.getMessage('assigneeIds', ERR.IsArray))
    assigneeIds: ObjectID[];

    @IsOptional()
    @IsArray(ErrorUtils.getMessage('permissions', ERR.IsArray))
    permissions: Permission[];
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

export class PermissionId {
    constructor(assigneeId: string, id: string) {
        this.assigneeId = assigneeId;
        this.id = id;
    }

    @IsNotEmpty(ErrorUtils.getMessage('assigneeId', ERR.IsNotEmpty))
    @IsString(ErrorUtils.getMessage('assigneeId', ERR.IsString))
    @IsUUID('all', ErrorUtils.getMessage('assigneeId', ERR.IsUUID))
    assigneeId: ObjectID;

    @IsNotEmpty(ErrorUtils.getMessage('id', ERR.IsNotEmpty))
    @IsString(ErrorUtils.getMessage('id', ERR.IsString))
    @IsUUID('all', ErrorUtils.getMessage('id', ERR.IsUUID))
    id: ObjectID;
}

export class Permission {
    constructor(assigneeId: string, tokenId: string, assigneeToken: string) {
        this.assigneeId = assigneeId;
        this.tokenId = tokenId;
        this.assigneeToken = assigneeToken;
    }

    @IsNotEmpty(ErrorUtils.getMessage('assigneeId', ERR.IsNotEmpty))
    @IsString(ErrorUtils.getMessage('assigneeId', ERR.IsString))
    @IsUUID('all', ErrorUtils.getMessage('assigneeId', ERR.IsUUID))
    assigneeId: ObjectID;

    @IsNotEmpty(ErrorUtils.getMessage('tokenId', ERR.IsNotEmpty))
    @IsString(ErrorUtils.getMessage('tokenId', ERR.IsString))
    @IsUUID('all', ErrorUtils.getMessage('tokenId', ERR.IsUUID))
    tokenId: ObjectID;

    @IsNotEmpty(ErrorUtils.getMessage('assigneeToken', ERR.IsNotEmpty))
    @IsString(ErrorUtils.getMessage('assigneeToken', ERR.IsString))
    assigneeToken: string;
}

export class UpdatePermissionAssigneeTokensDto {
    constructor(projectId: string, assignerId: string, assigneeTokens: Permission[]) {
        this.projectId = projectId;
        this.assignerId = assignerId;
        this.assigneeTokens = assigneeTokens;
    }

    @IsNotEmpty(ErrorUtils.getMessage('projectId', ERR.IsNotEmpty))
    @IsString(ErrorUtils.getMessage('projectId', ERR.IsString))
    @IsUUID('all', ErrorUtils.getMessage('projectId', ERR.IsUUID))
    projectId: ObjectID;

    @IsNotEmpty(ErrorUtils.getMessage('assignerId', ERR.IsNotEmpty))
    @IsString(ErrorUtils.getMessage('assignerId', ERR.IsString))
    @IsUUID('all', ErrorUtils.getMessage('assignerId', ERR.IsUUID))
    assignerId: ObjectID;

    @IsNotEmpty(ErrorUtils.getMessage('assigneeTokens', ERR.IsNotEmpty))
    @IsArray(ErrorUtils.getMessage('assigneeTokens', ERR.IsArray))
    assigneeTokens: Permission[];
}

@Entity('permissions')
export class PermissionDto extends BaseEntityDto {
    constructor(permissions: Permission[], assigneeId, assignerId, projectId, expiresIn: number, status: string = CONSTANTS.STATUS.PENDING) {
        super();
        this.permissions = permissions;
        this.assigneeId = assigneeId;
        this.assignerId = assignerId;
        this.projectId = projectId;
        this.expiresIn = expiresIn;
        this.status = status;
    }

    @IsNotEmpty(ErrorUtils.getMessage('permissions', ERR.IsNotEmpty))
    @IsArray(ErrorUtils.getMessage('permissions', ERR.IsArray))
    @Column()
    permissions: Permission[];

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

    @IsNotEmpty(ErrorUtils.getMessage('expiresIn', ERR.IsNotEmpty))
    @IsNumber({}, ErrorUtils.getMessage('expiresIn', ERR.IsNumber))
    @IsPositive(ErrorUtils.getMessage('expiresIn', ERR.IsPositive))
    @Column()
    expiresIn: number;

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
