import { Column, Entity } from 'typeorm';
import { BaseEntityDto } from '../../base/base-entity.dto';
import { IsNotEmpty } from 'class-validator';

@Entity('monitors')
export class MonitorDto extends BaseEntityDto {
    constructor(data: object) {
        super();
        this.data = data;
    }

    @Column()
    @IsNotEmpty()
    data: object;
}