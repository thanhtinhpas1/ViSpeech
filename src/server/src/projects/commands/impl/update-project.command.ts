import { ICommand } from '@nestjs/cqrs';
import { ProjectDto } from '../../dtos/projects.dto';

export class UpdateProjectCommand implements ICommand {
    constructor(
        public readonly streamId: string,
        public readonly projectDto: ProjectDto) {
    }
}
