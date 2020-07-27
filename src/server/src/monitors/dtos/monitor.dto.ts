import { Column, Entity } from 'typeorm';
import { BaseEntityDto } from '../../base/base-entity.dto';
import { IsNotEmpty } from 'class-validator';
import { ErrorUtils } from 'utils/errorUtils';
import { ERR } from 'common/error';

@Entity('monitors')
export class MonitorDto extends BaseEntityDto {
    constructor(data: object) {
        super();
        this.data = data;
    }

    @IsNotEmpty(ErrorUtils.getMessage('data', ERR.IsNotEmpty))
    @Column()
    data: object;
}