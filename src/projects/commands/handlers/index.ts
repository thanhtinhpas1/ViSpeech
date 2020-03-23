import { CreateProjectHandler } from "./create-project.handler";
import { DeleteProjectHandler } from "./delete-project.handler";
import { UpdateProjectHandler } from "./update-project.handler";
import { WelcomeProjectHandler } from "./welcome-project.handler";

export const CommandHandlers = [
  CreateProjectHandler,
  DeleteProjectHandler,
  UpdateProjectHandler,
  WelcomeProjectHandler,
];
