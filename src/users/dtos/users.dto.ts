import { IsString, IsEmail, IsNotEmpty, IsEmpty } from "class-validator";
import { Entity, Column, Index, ManyToMany } from "typeorm";
import { RoleDto } from "roles/dtos/roles.dto";
import { BaseEntityDto } from "base/base-entity.dto";

export class UserIdRequestParamsDto {
  constructor(userId) {
    this.id = userId;
  }

  @IsString()
  @IsNotEmpty()
  id: string;
}

@Entity("users")
export class UserDto extends BaseEntityDto {
  constructor(firstName, lastName, username, password, email) {
    super();
    this.firstName = firstName;
    this.lastName = lastName;
    this.username = username;
    this.password = password;
    this.email = email;
  }

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

  @IsString()
  @IsNotEmpty()
  @Column()
  password: string;

  @IsEmail()
  @IsNotEmpty()
  @Column()
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
    default: true,
    nullable: true
  })
  isActive: boolean;

  @ManyToMany(
    type => RoleDto,
    roleDto => roleDto.users
  )
  roles: RoleDto[];
}
