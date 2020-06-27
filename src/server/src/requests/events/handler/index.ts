import { AsrCalledHandler } from "./asr-called.handler";
import {
    RequestTranscriptFileUrlUpdatedFailedHandler,
    RequestTranscriptFileUrlUpdatedHandler,
    RequestTranscriptFileUrlUpdatedSuccessHandler
} from "./request-transcript-file-url-updated.handler";

export const EventHandlers = [
    AsrCalledHandler,
    // update
    RequestTranscriptFileUrlUpdatedHandler,
    RequestTranscriptFileUrlUpdatedSuccessHandler,
    RequestTranscriptFileUrlUpdatedFailedHandler
];