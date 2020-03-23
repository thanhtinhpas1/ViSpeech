import { Logger } from "@nestjs/common";
import { CommandHandler, EventPublisher, ICommandHandler } from "@nestjs/cqrs";
import { CreateProjectCommand } from "../impl/create-project.command";
import { ProjectRepository } from "../../repository/project.repository";

@CommandHandler(CreateProjectCommand)
export class CreateProjectHandler
  implements ICommandHandler<CreateProjectCommand> {
  constructor(
    private readonly repository: ProjectRepository,
    private readonly publisher: EventPublisher
  ) { }

  async execute(command: CreateProjectCommand) {
    Logger.log("Async CreateProjectHandler...", "CreateProjectCommand");

    const { streamId, projectDto } = command;
    // use mergeObjectContext for dto dispatch events
    const project = this.publisher.mergeObjectContext(
      await this.repository.createProject(streamId, projectDto)
    );
    project.commit();
  }
}
