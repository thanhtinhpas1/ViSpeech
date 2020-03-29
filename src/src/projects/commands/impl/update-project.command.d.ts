import { ICommand } from '@nestjs/cqrs';
import { ProjectDto } from '../../dtos/projects.dto';
export declare class UpdateProjectCommand implements ICommand {
    readonly streamId: string;
    readonly projectDto: ProjectDto;
    constructor(streamId: string, projectDto: ProjectDto);
}
