import { UpdateRequestTranscriptFileUrlHandler } from './update-request-transcript-file-url.handler';
import { CallAsrHandler } from './call-asr.handler';
import { CreateRequestHandler } from './create-request.handler';

export const CommandHandlers = [
    CreateRequestHandler,
    CallAsrHandler,
    UpdateRequestTranscriptFileUrlHandler
];