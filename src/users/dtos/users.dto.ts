import {
  IsEmail,
  IsEmpty,
  IsNotEmpty,
  IsString,
  IsArray,
  IsIn,
  IsOptional
} from "class-validator";
import { Column, Entity, Index } from "typeorm";
import { BaseEntityDto } from "base/base-entity.dto";
import { CONSTANTS } from "common/constant";

export class UserIdRequestParamsDto {
  constructor(userId) {
    this._id = userId;
  }

  @IsString()
  @IsNotEmpty()
  _id: string;
}

@Entity("users")
export class UserDto extends BaseEntityDto {
  @IsString()
  @IsNotEmpty()
  @Column({
    name: "first_name"
  })
  firstName: string;

  @IsString()
  @IsNotEmpty()
  @Column({
    name: "last_name"
  })
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
    name: "firsttime_login_remaining",
    nullable: true
  })
  firstTimeLoginRemaining: boolean;

  @IsEmpty()
  @Column({
    name: "is_active",
    default: true,
    nullable: false
  })
  isActive: boolean;

  @IsArray()
  @IsNotEmpty()
  @IsIn(
    [CONSTANTS.ROLE.USER, CONSTANTS.ROLE.MANAGER_USER, CONSTANTS.ROLE.ADMIN],
    {
      each: true
    }
  )
  @Column()
  roles: string[];
}
