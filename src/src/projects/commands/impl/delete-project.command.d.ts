import { ICommand } from '@nestjs/cqrs';
import { ProjectIdRequestParamsDto } from '../../dtos/projects.dto';
export declare class DeleteProjectCommand implements ICommand {
    readonly streamId: string;
    readonly projectIdDto: ProjectIdRequestParamsDto;
    constructor(streamId: string, projectIdDto: ProjectIdRequestParamsDto);
}
