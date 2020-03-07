import { BaseEntityDto } from "base/base-entity.dto";
import { IsArray, IsEmail, IsEmpty, IsNotEmpty, IsOptional, IsString, IsIn } from "class-validator";
import { RoleDto } from "roles/dtos/roles.dto";
import { Column, Entity, Index } from "typeorm";
import { CONSTANTS } from "common/constant";

export class UserIdRequestParamsDto {
  constructor(userId) {
    this._id = userId;
  }

  @IsString()
  @IsNotEmpty()
  _id: string;
}

export class AssignRoleUserBody {
  @IsNotEmpty()
  @IsArray()
  roleName: string[];
}

@Entity("users")
export class UserDto extends BaseEntityDto {
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
  @Column()
  username: string;

  @IsOptional()
  @IsString()
  @Column()
  password: string;

  @IsEmail()
  @IsNotEmpty()
  @Column({ unique: true })
  email: string;

  @IsEmpty()
  @Column({
    default: true,
    nullable: true
  })
  firstTimeLoginRemaining: boolean;

  @IsEmpty()
  @Column({
    default: true,
    nullable: false
  })
  isActive: boolean;

  @IsArray()
  @IsNotEmpty()
  @Column()
  roles: RoleDto[];
}
