import { ICommand } from "@nestjs/cqrs";
import { ProjectIdRequestParamsDto } from "../../dtos/projects.dto";

export class DeleteProjectCommand implements ICommand {
  constructor(
    public readonly streamId: string,
    public readonly projectIdDto: ProjectIdRequestParamsDto
  ) { }
}
