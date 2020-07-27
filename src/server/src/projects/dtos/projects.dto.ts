import { BaseEntityDto } from 'base/base-entity.dto';
import { IsBoolean, IsNotEmpty, IsOptional, IsString, IsUUID } from 'class-validator';
import { Column, Entity } from 'typeorm';
import { ErrorUtils } from '../../utils/errorUtils';
import { ERR } from '../../common/error';

export class ProjectIdRequestParamsDto {
    constructor(projectId) {
        this._id = projectId;
    }

    @IsString(ErrorUtils.getMessage('_id', ERR.IsString))
    @IsNotEmpty(ErrorUtils.getMessage('_id', ERR.IsNotEmpty))
    _id: string;
}

@Entity('projects')
export class ProjectDto extends BaseEntityDto {
    constructor(name: string, userId, description: string = '') {
        super();
        this.name = name;
        this.userId = userId;
        this.description = description;
        this.isValid = true;
    }

    @IsString(ErrorUtils.getMessage('name', ERR.IsString))
    @IsNotEmpty(ErrorUtils.getMessage('name', ERR.IsNotEmpty))
    @Column({
        unique: true,
    })
    name: string;

    @IsOptional()
    @IsString(ErrorUtils.getMessage('description', ERR.IsString))
    @Column({
        default: '',
    })
    description: string;

    @IsNotEmpty(ErrorUtils.getMessage('userId', ERR.IsNotEmpty))
    @IsString(ErrorUtils.getMessage('userId', ERR.IsString))
    @IsUUID('all', ErrorUtils.getMessage('userId', ERR.IsUUID))
    @Column({
        nullable: false,
        update: false,
        type: 'uuid',
    })
    userId: string;

    @IsNotEmpty(ErrorUtils.getMessage('isValid', ERR.IsNotEmpty))
    @IsBoolean(ErrorUtils.getMessage('isValid', ERR.IsBoolean))
    @Column({
        default: true,
        nullable: false,
    })
    isValid: boolean;
}
