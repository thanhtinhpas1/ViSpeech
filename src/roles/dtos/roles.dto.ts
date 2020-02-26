import { Column, Entity } from "typeorm";
import { BaseEntityDto } from "base/base-entity.dto";
import { IsNotEmpty, IsString } from "class-validator";

@Entity("roles")
export class RoleDto extends BaseEntityDto {
  constructor(name: string) {
    super();
    this.name = name;
  }

  @IsNotEmpty()
  @IsString()
  @Column()
  name: string;
}
