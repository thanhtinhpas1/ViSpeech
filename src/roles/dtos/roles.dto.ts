import {BaseEntityDto} from '../../base/base-entity.dto';
import {Column, Entity} from 'typeorm';
import {IsString} from 'class-validator';

@Entity('roles')
export class RoleDto extends BaseEntityDto {
    constructor(name: string) {
        super();
        this.name = name;
    }

    @IsString()
    @Column()
    name: string;
}