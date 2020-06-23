import { CreateProjectHandler } from './create-project.handler';
import { DeleteProjectHandler } from './delete-project.handler';
import { UpdateProjectHandler } from './update-project.handler';
import { WelcomeProjectHandler } from './welcome-project.handler';
import { DeleteProjectByUserIdHandler } from './delete-project-by-userId.handler';

export const CommandHandlers = [
    CreateProjectHandler,
    DeleteProjectHandler,
    DeleteProjectByUserIdHandler,
    UpdateProjectHandler,
    WelcomeProjectHandler,
];
