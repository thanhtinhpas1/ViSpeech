import { EventPublisher, ICommandHandler } from "@nestjs/cqrs";
import { RequestRepository } from "requests/repository/request.repository";
import { CallAsrCommand } from "../handler/call-asr.command";
export declare class CallAsrHandler implements ICommandHandler<CallAsrCommand> {
    private readonly repository;
    private readonly publisher;
    constructor(repository: RequestRepository, publisher: EventPublisher);
    execute(command: CallAsrCommand): Promise<void>;
}
