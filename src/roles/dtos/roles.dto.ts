import { Column, Entity, ManyToMany } from "typeorm";
import { BaseEntityDto } from "base/base-entity.dto";
import { IsNotEmpty, IsString } from "class-validator";
import { UserDto } from "users/dtos/users.dto";

@Entity("roles")
export class RoleDto extends BaseEntityDto {
  constructor(name) {
    super();
    this.name = name;
  }

  @IsNotEmpty()
  @IsString()
  @Column()
  name: string;
}
