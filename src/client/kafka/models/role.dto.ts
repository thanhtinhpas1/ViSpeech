import { BaseEntityDto } from './base-entity.dto';

export class RoleDto extends BaseEntityDto {
    constructor(name: string) {
        super();
        this.name = name;
    }
    name: string;
}
