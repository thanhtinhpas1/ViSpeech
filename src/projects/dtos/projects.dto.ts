import {BaseEntityDto} from 'base/base-entity.dto';
import {IsNotEmpty, IsOptional, IsString, IsUUID} from 'class-validator';
import {Column, Entity, ObjectID} from 'typeorm';

export class ProjectIdRequestParamsDto {
    constructor(projectId) {
        this._id = projectId;
    }

    @IsString()
    @IsNotEmpty()
    _id: string;
}

@Entity('projects')
export class ProjectDto extends BaseEntityDto {
    constructor(name: string, userId, description: string = '') {
        super();
        this.name = name;
        this.userId = userId;
        this.description = description;
    }

    @IsString()
    @IsNotEmpty()
    @Column({
        unique: true,
    })
    name: string;

    @IsOptional()
    @IsString()
    @Column({
        default: '',
    })
    description: string;

    @IsUUID()
    @Column({
        nullable: false,
        type: 'uuid',
    })
    userId: ObjectID;
}
