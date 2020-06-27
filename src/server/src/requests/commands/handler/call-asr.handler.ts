import { Logger } from "@nestjs/common";
import { CommandHandler, EventPublisher, ICommandHandler } from "@nestjs/cqrs";
import { RequestRepository } from "requests/repository/request.repository";
import { CallAsrCommand } from "../impl/call-asr.command";

@CommandHandler(CallAsrCommand)
export class CallAsrHandler implements ICommandHandler<CallAsrCommand> {
    constructor(
        private readonly repository: RequestRepository,
        private readonly publisher: EventPublisher,
    ) {
    }

    async execute(command: CallAsrCommand) {
        Logger.log('Async CallAsrHandler...', 'CallAsrCommand');
        const {streamId, tokenDto, requestDto} = command;
        const request = this.publisher.mergeObjectContext(
            await this.repository.createRequest(streamId, requestDto, tokenDto)
        );
        request.commit();
    }
}