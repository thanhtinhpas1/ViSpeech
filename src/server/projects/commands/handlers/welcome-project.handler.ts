import {CommandHandler, EventPublisher, ICommandHandler} from '@nestjs/cqrs';
import {WelcomeProjectCommand} from '../impl/welcome-project.command';
import {ProjectRepository} from '../../repository/project.repository';
import {Logger} from '@nestjs/common';

@CommandHandler(WelcomeProjectCommand)
export class WelcomeProjectHandler
    implements ICommandHandler<WelcomeProjectCommand> {
    constructor(
        private readonly repository: ProjectRepository,
        private readonly publisher: EventPublisher
    ) {
    }

    async execute(command: WelcomeProjectCommand) {
        Logger.log('Async WelcomeProjectHandler...', 'WelcomeProjectCommand');
        const {streamId, projectId} = command;
        const project = this.publisher.mergeObjectContext(
            await this.repository.welcomeProject(streamId, projectId)
        );
        project.commit();
    }
}
