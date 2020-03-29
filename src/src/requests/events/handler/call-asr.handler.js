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
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const common_1 = require("@nestjs/common");
const cqrs_1 = require("@nestjs/cqrs");
const typeorm_1 = require("@nestjs/typeorm");
const requests_dto_1 = require("requests/dtos/requests.dto");
const typeorm_2 = require("typeorm");
const call_asr_event_1 = require("../impl/call-asr.event");
let CallAsrHandler = class CallAsrHandler {
    constructor(requestRepository) {
        this.requestRepository = requestRepository;
    }
    handle(event) {
        return __awaiter(this, void 0, void 0, function* () {
            common_1.Logger.log(event.tokenDto._id, 'CallAsrEvent');
            const { streamId, requestDto, tokenDto } = event;
            try {
                yield this.requestRepository.save(requestDto);
            }
            catch (error) {
                common_1.Logger.error(error, '', 'CallAsrEvent');
            }
        });
    }
};
CallAsrHandler = __decorate([
    cqrs_1.EventsHandler(call_asr_event_1.CallAsrEvent),
    __param(0, typeorm_1.InjectRepository(requests_dto_1.RequestDto)),
    __metadata("design:paramtypes", [typeorm_2.Repository])
], CallAsrHandler);
exports.CallAsrHandler = CallAsrHandler;
//# sourceMappingURL=call-asr.handler.js.map