import { AsrCalledHandler } from './asr-called.handler';
import {
    RequestTranscriptFileUrlUpdatedFailedHandler,
    RequestTranscriptFileUrlUpdatedHandler,
    RequestTranscriptFileUrlUpdatedSuccessHandler
} from './request-transcript-file-url-updated.handler';
import { RequestCreatedHandler, RequestCreatedSuccessHandler, RequestCreatedFailedHandler } from './request-created.handler';

export const EventHandlers = [
    // create
    RequestCreatedHandler,
    RequestCreatedSuccessHandler,
    RequestCreatedFailedHandler,
    // call asr
    AsrCalledHandler,
    // update
    RequestTranscriptFileUrlUpdatedHandler,
    RequestTranscriptFileUrlUpdatedSuccessHandler,
    RequestTranscriptFileUrlUpdatedFailedHandler
];