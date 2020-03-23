import { Logger } from "@nestjs/common";
import { EventsHandler, IEventHandler } from "@nestjs/cqrs";
import { InjectRepository } from "@nestjs/typeorm";
import { ProjectDto } from "projects/dtos/projects.dto";
import { Repository } from "typeorm";
import { ProjectUpdatedEvent } from "../impl/project-updated.event";

@EventsHandler(ProjectUpdatedEvent)
export class ProjectUpdatedHandler implements IEventHandler<ProjectUpdatedEvent> {
  constructor(
    @InjectRepository(ProjectDto)
    private readonly repository: Repository<ProjectDto>,
  ) { }

  async handle(event: ProjectUpdatedEvent) {
    Logger.log(event.projectDto._id, "ProjectUpdatedEvent"); // write here
    const { streamId, projectDto } = event;
    const { _id, ...projectInfo } = projectDto;

    try {
      return await this.repository.update({ _id }, projectInfo);
    } catch (error) {
      Logger.error(error, "", "ProjectUpdatedEvent");
    }
  }
}
