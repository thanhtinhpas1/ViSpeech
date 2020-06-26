import { Column, Entity } from 'typeorm';
import { BaseEntityDto } from 'base/base-entity.dto';
import { IsIn, IsNotEmpty, IsString } from 'class-validator';
import { CONSTANTS } from 'common/constant';
import { ErrorUtils } from "../../utils/errorUtils";
import { ERR } from "../../common/error";

@Entity('roles')
export class RoleDto extends BaseEntityDto {
    constructor(name: string) {
        super();
        this.name = name;
    }

    @IsNotEmpty(ErrorUtils.getMessage('name', ERR.IsNotEmpty))
    @IsString(ErrorUtils.getMessage('name', ERR.IsString))
    @IsIn([
        CONSTANTS.ROLE.USER,
        CONSTANTS.ROLE.MANAGER_USER,
        CONSTANTS.ROLE.ADMIN,
    ])
    @Column({unique: true})
    name: string;
}
