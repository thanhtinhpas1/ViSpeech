import { UpdateRequestTranscriptFileUrlHandler } from './update-request-transcript-file-url.handler';
import { CallAsrRequestHandler } from './call-asr-request.handler';
import { CreateRequestHandler } from './create-request.handler';

export const CommandHandlers = [
    CreateRequestHandler,
    CallAsrRequestHandler,
    UpdateRequestTranscriptFileUrlHandler
];