import { CreateProjectHandler } from './create-project.handler';
import { DeleteProjectHandler } from './delete-project.handler';
import { UpdateProjectHandler } from './update-project.handler';
import { WelcomeProjectHandler } from './welcome-project.handler';
export declare const CommandHandlers: (typeof CreateProjectHandler | typeof DeleteProjectHandler | typeof UpdateProjectHandler | typeof WelcomeProjectHandler)[];
