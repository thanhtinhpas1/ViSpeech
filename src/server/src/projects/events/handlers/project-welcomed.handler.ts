import { Logger } from '@nestjs/common';
import { EventsHandler, IEventHandler } from '@nestjs/cqrs';
import { ProjectWelcomedEvent } from '../impl/project-welcomed.event';

@EventsHandler(ProjectWelcomedEvent)
export class ProjectWelcomedHandler implements IEventHandler<ProjectWelcomedEvent> {
    handle(event: ProjectWelcomedEvent) {
        Logger.log(event.projectId, 'ProjectWelcomedEvent'); // write here
    }
}
