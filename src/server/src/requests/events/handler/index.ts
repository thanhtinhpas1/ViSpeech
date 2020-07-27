import { AsrCalledRequestHandler } from './asr-called-request.handler';
import {
    RequestTranscriptFileUrlUpdatedFailedHandler,
    RequestTranscriptFileUrlUpdatedHandler,
    RequestTranscriptFileUrlUpdatedSuccessHandler
} from './request-transcript-file-url-updated.handler';
import {
    RequestCreatedFailedHandler,
    RequestCreatedHandler,
    RequestCreatedSuccessHandler
} from './request-created.handler';

export const EventHandlers = [
    // create
    RequestCreatedHandler,
    RequestCreatedSuccessHandler,
    RequestCreatedFailedHandler,
    // call asr
    AsrCalledRequestHandler,
    // update
    RequestTranscriptFileUrlUpdatedHandler,
    RequestTranscriptFileUrlUpdatedSuccessHandler,
    RequestTranscriptFileUrlUpdatedFailedHandler
];