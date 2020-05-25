import {Column, Entity} from 'typeorm';
import {BaseEntityDto} from 'base/base-entity.dto';
import {IsIn, IsNotEmpty, IsString} from 'class-validator';
import {CONSTANTS} from 'common/constant';
import { ErrUtil } from "../../utils/err.util";
import { ERR } from "../../common/error";

@Entity('roles')
export class RoleDto extends BaseEntityDto {
    constructor(name: string) {
        super();
        this.name = name;
    }

    @IsNotEmpty(ErrUtil.getMessage('name', ERR.IsNotEmpty))
    @IsString(ErrUtil.getMessage('name', ERR.IsString))
    @IsIn([
        CONSTANTS.ROLE.USER,
        CONSTANTS.ROLE.MANAGER_USER,
        CONSTANTS.ROLE.ADMIN,
    ])
    @Column()
    name: string;
}
