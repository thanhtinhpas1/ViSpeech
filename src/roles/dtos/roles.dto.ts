import {Column, Entity} from 'typeorm';
import {BaseEntityDto} from 'base/base-entity.dto';
import {IsIn, IsNotEmpty, IsString} from 'class-validator';
import {CONSTANTS} from 'common/constant';

@Entity('roles')
export class RoleDto extends BaseEntityDto {
    constructor(name: string) {
        super();
        this.name = name;
    }

    @IsNotEmpty()
    @IsString()
    @IsIn([
        CONSTANTS.ROLE.USER,
        CONSTANTS.ROLE.MANAGER_USER,
        CONSTANTS.ROLE.ADMIN,
    ])
    @Column()
    name: string;
}
