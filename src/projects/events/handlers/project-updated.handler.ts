import { Logger, NotFoundException } from "@nestjs/common";
import { EventsHandler, IEventHandler } from "@nestjs/cqrs";
import { InjectRepository } from "@nestjs/typeorm";
import { ProjectDto } from "projects/dtos/projects.dto";
import { Repository } from "typeorm";
import { ProjectUpdatedEvent } from "../impl/project-updated.event";
import { Utils } from "utils";

@EventsHandler(ProjectUpdatedEvent)
export class ProjectUpdatedHandler implements IEventHandler<ProjectUpdatedEvent> {
    constructor(
        @InjectRepository(ProjectDto)
        private readonly repository: Repository<ProjectDto>,
    ) {
    }

    async handle(event: ProjectUpdatedEvent) {
        Logger.log(event.projectDto._id, 'ProjectUpdatedEvent'); // write here
        const { streamId, projectDto } = event;
        const { _id, ...projectInfo } = projectDto;

        try {
            const project = await this.repository.findOne({ _id });
            if (!project) {
                throw new NotFoundException(`Project with _id ${_id} does not exist.`);
            }

            const formattedInfo = Utils.removePropertyFromObject(projectInfo, "userId");
            return await this.repository.update({ _id }, formattedInfo);
        } catch (error) {
            Logger.error(error, "", "ProjectUpdatedEvent");
        }
    }
}

// TODO: project updated success and failed