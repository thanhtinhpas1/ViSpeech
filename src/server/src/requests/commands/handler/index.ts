import { UpdateRequestTranscriptFileUrlHandler } from './update-request-transcript-file-url.handler';
import { CallAsrHandler } from "./call-asr.handler";

export const CommandHandlers = [
    CallAsrHandler,
    UpdateRequestTranscriptFileUrlHandler
];