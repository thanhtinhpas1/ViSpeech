import { Column, Entity } from 'typeorm';
import { BaseEntityDto } from '../../../../base/base-entity.dto';

@Entity('projections')
export class ProjectionDto extends BaseEntityDto {
    constructor(streamName: string, eventNumber: number) {
        super();
        this.streamName = streamName;
        this.eventNumber = eventNumber;
    }

    @Column()
    streamName: string;
    @Column()
    eventNumber: number;
}