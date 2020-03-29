"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const cqrs_1 = require("@nestjs/cqrs");
const call_asr_event_1 = require("requests/events/impl/call-asr.event");
class RequestModel extends cqrs_1.AggregateRoot {
    constructor(id) {
        super();
        this.id = id;
    }
    setData(data) {
        this.data = data;
    }
    createReport(streamId, tokenDto) {
        this.apply(new call_asr_event_1.CallAsrEvent(streamId, this.data, tokenDto));
    }
}
exports.RequestModel = RequestModel;
//# sourceMappingURL=request.model.js.map