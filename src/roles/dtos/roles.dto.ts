import { Entity, Column } from "typeorm";

import { BaseDto } from "base/base.dto";

import { IsString } from "class-validator";

@Entity('roles')
export class RoleDto extends BaseDto{
    
    @IsString()
    @Column()
    name: string;
}
