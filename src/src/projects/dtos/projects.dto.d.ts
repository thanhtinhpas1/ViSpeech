import { BaseEntityDto } from 'base/base-entity.dto';
import { ObjectID } from 'typeorm';
export declare class ProjectIdRequestParamsDto {
    constructor(projectId: any);
    _id: string;
}
export declare class ProjectDto extends BaseEntityDto {
    constructor(name: string, userId: any, description?: string);
    name: string;
    description: string;
    userId: ObjectID;
}
