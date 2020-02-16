import { Entity, Column, ManyToMany, JoinTable } from "typeorm";
import { BaseEntityDto } from "base/base-entity.dto";
import { IsString, IsNotEmpty } from "class-validator";
import { UserDto } from "users/dtos/users.dto";

@Entity("roles")
export class RoleDto extends BaseEntityDto {
  @IsNotEmpty()
  @IsString()
  @Column()
  name: string;

  @ManyToMany(
    type => UserDto,
    userDto => userDto.roles
  )
  @JoinTable()
  users: UserDto[];
}
