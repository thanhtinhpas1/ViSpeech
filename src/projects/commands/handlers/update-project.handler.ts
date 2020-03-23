import { CommandHandler, EventPublisher, ICommandHandler } from "@nestjs/cqrs";
import { UpdateProjectCommand } from "../impl/update-project.command";
import { ProjectRepository } from "../../repository/project.repository";
import { Logger } from "@nestjs/common";

@CommandHandler(UpdateProjectCommand)
export class UpdateProjectHandler implements ICommandHandler<UpdateProjectCommand> {
  constructor(
    private readonly repository: ProjectRepository,
    private readonly publisher: EventPublisher
  ) { }

  async execute(command: UpdateProjectCommand) {
    Logger.log("Async UpdateProjectHandler...", "UpdateProjectCommand");

    const { streamId, projectDto } = command;
    const project = this.publisher.mergeObjectContext(
      await this.repository.updateProject(streamId, projectDto)
    );
    project.commit();
  }
}
