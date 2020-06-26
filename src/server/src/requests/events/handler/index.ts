import { AsrCalledHandler } from "./asr-called.handler";
import { RequestTranscriptFileUrlUpdatedHandler, RequestTranscriptFileUrlUpdatedSuccessHandler, RequestTranscriptFileUrlUpdatedFailedHandler } from "./request-transcript-file-url-updated.handler";

export const EventHandlers = [
    AsrCalledHandler,
    // update
    RequestTranscriptFileUrlUpdatedHandler,
    RequestTranscriptFileUrlUpdatedSuccessHandler,
    RequestTranscriptFileUrlUpdatedFailedHandler
];