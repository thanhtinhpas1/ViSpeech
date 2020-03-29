"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
const common_1 = require("@nestjs/common");
const cqrs_1 = require("@nestjs/cqrs");
const call_asr_event_1 = require("requests/events/impl/call-asr.event");
const operators_1 = require("rxjs/operators");
const update_token_command_1 = require("tokens/commands/impl/update-token.command");
let CallAsrSagas = class CallAsrSagas {
    constructor() {
        this.startCreatingUser = (events$) => {
            return events$.pipe(cqrs_1.ofType(call_asr_event_1.CallAsrEvent), operators_1.map((event) => {
                common_1.Logger.log('Inside [RequestSagas] callAsr Saga', 'RequestSagas');
                const { streamId, requestDto, tokenDto } = event;
                return new update_token_command_1.UpdateTokenCommand(streamId, tokenDto);
            }));
        };
    }
};
__decorate([
    cqrs_1.Saga(),
    __metadata("design:type", Object)
], CallAsrSagas.prototype, "startCreatingUser", void 0);
CallAsrSagas = __decorate([
    common_1.Injectable(),
    __metadata("design:paramtypes", [])
], CallAsrSagas);
exports.CallAsrSagas = CallAsrSagas;
//# sourceMappingURL=call-asr.sagas.js.map