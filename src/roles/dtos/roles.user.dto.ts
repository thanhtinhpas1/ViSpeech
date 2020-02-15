import { Entity, Column } from "typeorm";
import { BaseDto } from "base/base.dto";
import { IsString } from "class-validator";

@Entity('role_users')
export class RoleUsers extends BaseDto {

    @IsString()
    @Column({
        name: 'user_id'
    })
    userId: string;

    @IsString()
    @Column({
        name: 'role_id',
    })
    roleId: string;
}