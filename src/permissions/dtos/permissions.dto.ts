import { BaseEntityDto } from 'base/base-entity.dto';
import { IsIn, IsNotEmpty, IsOptional, IsString, IsUUID, IsArray } from 'class-validator';
import { CONSTANTS } from 'common/constant';
import { ObjectID } from 'mongodb';
import { Column, Entity } from 'typeorm';

export class PermissionAssignDto {
  constructor(assigneeUsername: string, projectId, permissions: string[], assignerId) {
    this.assigneeUsername = assigneeUsername;
    this.projectId = projectId;
    this.permissions = permissions;
    this.assignerId = assignerId;
  }

  @IsString()
  @IsNotEmpty()
  assigneeUsername: string;

  @IsUUID()
  @Column({
    nullable: false,
    type: 'uuid',
  })
  projectId: ObjectID;

  @IsNotEmpty()
  @IsArray()
  @IsIn([CONSTANTS.PERMISSION.CSR_USER], { each: true })
  permissions: string[];

  @IsUUID()
  @Column({
    nullable: false,
    type: 'uuid',
  })
  assignerId: ObjectID;

  @IsOptional()
  @IsUUID()
  @Column({
    nullable: false,
    type: 'uuid',
  })
  assigneeId: ObjectID;
}

export class PermissionIdRequestParamsDto {
  constructor(permissionId) {
    this._id = permissionId;
  }

  @IsString()
  @IsNotEmpty()
  _id: string;
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

  @IsNotEmpty()
  @IsArray()
  @IsIn([CONSTANTS.PERMISSION.CSR_USER], { each: true })
  permissions: string[];

  @IsUUID()
  @Column({
    nullable: false,
    type: 'uuid',
  })
  assigneeId: ObjectID;

  @IsUUID()
  @Column({
    nullable: false,
    type: 'uuid',
  })
  assignerId: ObjectID;

  @IsUUID()
  @Column({
    nullable: false,
    type: 'uuid',
  })
  projectId: ObjectID;

  @IsOptional()
  @IsString()
  @IsIn([
    CONSTANTS.STATUS.PENDING,
    CONSTANTS.STATUS.APPROVED,
    CONSTANTS.STATUS.REJECTED,
    CONSTANTS.STATUS.INVALID,
  ])
  @Column()
  status: string;
}
