import { CommandHandler, EventPublisher, ICommandHandler } from "@nestjs/cqrs";
import { DeleteProjectCommand } from "../impl/delete-project.command";
import { ProjectRepository } from "../../repository/project.repository";
import { Logger } from "@nestjs/common";

@CommandHandler(DeleteProjectCommand)
export class DeleteProjectHandler implements ICommandHandler<DeleteProjectCommand> {
  constructor(
    private readonly repository: ProjectRepository,
    private readonly publisher: EventPublisher
  ) { }

  async execute(command: DeleteProjectCommand) {
    Logger.log("Async DeleteProjectHandler...", "DeleteProjectCommand");
    const { streamId, projectIdDto } = command;
    const project = this.publisher.mergeObjectContext(
      await this.repository.deleteProject(streamId, projectIdDto._id)
    );
    project.commit();
  }
}
