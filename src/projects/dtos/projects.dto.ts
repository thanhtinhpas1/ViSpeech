import {BaseEntityDto} from 'base/base-entity.dto';
import {IsNotEmpty, IsOptional, IsString, IsUUID, IsBoolean} from 'class-validator';
import {Column, Entity, ObjectID} from 'typeorm';
import { ErrUtil } from "../../utils/err.util";
import { ERR } from "../../common/error";

export class ProjectIdRequestParamsDto {
    constructor(projectId) {
        this._id = projectId;
    }

    @IsString(ErrUtil.getMessage('_id', ERR.IsString))
    @IsNotEmpty(ErrUtil.getMessage('_id', ERR.IsNotEmpty))
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

    @IsString(ErrUtil.getMessage('name', ERR.IsString))
    @IsNotEmpty(ErrUtil.getMessage('name', ERR.IsNotEmpty))
    @Column({
        unique: true,
    })
    name: string;

    @IsOptional()
    @IsString(ErrUtil.getMessage('description', ERR.IsString))
    @Column({
        default: '',
    })
    description: string;

    @IsNotEmpty(ErrUtil.getMessage('userId', ERR.IsNotEmpty))
    @IsString(ErrUtil.getMessage('userId', ERR.IsString))
    @IsUUID('3', ErrUtil.getMessage('userId', ERR.IsUUID))
    @Column({
        nullable: false,
        type: 'uuid',
    })
    userId: ObjectID;

    @IsNotEmpty(ErrUtil.getMessage('isValid', ERR.IsNotEmpty))
    @IsBoolean(ErrUtil.getMessage('isValid', ERR.IsBoolean))
    @Column({
        default: true,
        nullable: false,
    })
    isValid: boolean;
}
