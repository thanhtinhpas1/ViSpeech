import {CommandHandler, EventPublisher, ICommandHandler} from '@nestjs/cqrs';
import {TokenRepository} from '../../repository/token.repository';
import {Logger} from '@nestjs/common';
import { DeleteTokenByProjectIdCommand } from '../impl/delete-token-by-projectId.command';

@CommandHandler(DeleteTokenByProjectIdCommand)
export class DeleteTokenByProjectIdHandler implements ICommandHandler<DeleteTokenByProjectIdCommand> {
    constructor(
        private readonly repository: TokenRepository,
        private readonly publisher: EventPublisher
    ) {
    }

    async execute(command: DeleteTokenByProjectIdCommand) {
        Logger.log('Async DeleteTokenByProjectIdHandler...', 'DeleteTokenByProjectIdCommand');
        const {streamId, projectId} = command;
        const token = this.publisher.mergeObjectContext(
            await this.repository.deleteTokenByProjectId(streamId, projectId)
        );
        token.commit();
    }
}
