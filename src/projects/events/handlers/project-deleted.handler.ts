import {Logger, NotFoundException} from '@nestjs/common';
import {EventsHandler, IEventHandler} from '@nestjs/cqrs';
import {InjectRepository} from '@nestjs/typeorm';
import {ProjectDto} from 'projects/dtos/projects.dto';
import {ProjectDeletedEvent} from '../impl/project-deleted.event';
import {Repository} from 'typeorm';

@EventsHandler(ProjectDeletedEvent)
export class ProjectDeletedHandler implements IEventHandler<ProjectDeletedEvent> {
    constructor(
        @InjectRepository(ProjectDto)
        private readonly repository: Repository<ProjectDto>
    ) {
    }

    async handle(event: ProjectDeletedEvent) {
        Logger.log(event.projectId, 'ProjectDeletedEvent');
        const {streamId, projectId} = event;

        try {
            const project = await this.repository.findOne({_id: projectId});
            if (project) {
                await this.repository.delete({_id: projectId});
                return;
            }
            throw new NotFoundException(`Project with _id ${projectId} does not exist.`);
        } catch (error) {
            Logger.error(error, '', 'ProjectDeletedEvent');
        }
    }
}

// TODO: project deleted success and failed
