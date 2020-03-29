import { IEventHandler } from '@nestjs/cqrs';
import { ProjectWelcomedEvent } from '../impl/project-welcomed.event';
export declare class ProjectWelcomedHandler implements IEventHandler<ProjectWelcomedEvent> {
    handle(event: ProjectWelcomedEvent): void;
}
