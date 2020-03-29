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
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
    result["default"] = mod;
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
const common_1 = require("@nestjs/common");
const http = __importStar(require("http"));
const xml2js = __importStar(require("xml2js"));
const config_1 = require("../../../config");
const eventStoreHostUrl = config_1.config.EVENT_STORE_SETTINGS.protocol +
    `://${config_1.config.EVENT_STORE_SETTINGS.hostname}:${config_1.config.EVENT_STORE_SETTINGS.httpPort}/streams/`;
let EventStore = class EventStore {
    constructor(eventStore) {
        this.eventStore = eventStore;
        this.category = config_1.config.EVENT_STORE_SETTINGS.category;
        this.eventStore.connect({
            hostname: config_1.config.EVENT_STORE_SETTINGS.hostname,
            port: config_1.config.EVENT_STORE_SETTINGS.tcpPort,
            credentials: config_1.config.EVENT_STORE_SETTINGS.credentials,
            poolOptions: config_1.config.EVENT_STORE_SETTINGS.poolOptions,
        });
        this.client = this.eventStore.client;
    }
    publish(event) {
        return __awaiter(this, void 0, void 0, function* () {
            const message = JSON.parse(JSON.stringify(event));
            const streamId = message.streamId;
            const streamName = `${this.category}-${streamId}`;
            const type = event.constructor.name;
            try {
                common_1.Logger.log('Write event ...', streamName);
                yield this.client.writeEvent(streamName, type, event);
            }
            catch (err) {
                console.trace(err);
            }
        });
    }
    bridgeEventsTo(subject) {
        return __awaiter(this, void 0, void 0, function* () {
            const streamName = `$ce-${this.category}`;
            const onEvent = (subscription, event) => __awaiter(this, void 0, void 0, function* () {
                try {
                    const eventUrl = eventStoreHostUrl +
                        `${event.metadata.$o}/${event.data.split('@')[0]}`;
                    const httpOptions = {
                        headers: {
                            Authorization: 'Basic YWRtaW46Y2hhbmdlaXQ=',
                        },
                    };
                    http.get(eventUrl, httpOptions, (res) => {
                        res.setEncoding('utf8');
                        let rawData = '';
                        res.on('data', (chunk) => {
                            rawData += chunk;
                        });
                        res.on('end', () => {
                            xml2js.parseString(rawData, { explicitArray: false }, (err, result) => {
                                if (err) {
                                    console.trace(err);
                                    return;
                                }
                                const content = result['atom:entry']['atom:content'];
                                const eventType = content.eventType;
                                const data = content.data;
                                if (this.eventHandlers[eventType]) {
                                    event = this.eventHandlers[eventType](...Object.values(data));
                                    subject.next(event);
                                }
                            });
                        });
                    });
                }
                catch (error) {
                    common_1.Logger.error(error, '', 'Event');
                }
            });
            const onDropped = (subscription, reason, error) => {
                console.trace(subscription, reason, error);
            };
            try {
                common_1.Logger.log('Subscribe stream ...', streamName);
                yield this.client.subscribeToStream(streamName, onEvent, onDropped, false);
            }
            catch (err) {
                console.trace(err);
            }
        });
    }
    setEventHandlers(eventHandlers) {
        this.eventHandlers = eventHandlers;
    }
};
EventStore = __decorate([
    common_1.Injectable(),
    __param(0, common_1.Inject('EVENT_STORE_PROVIDER')),
    __metadata("design:paramtypes", [Object])
], EventStore);
exports.EventStore = EventStore;
//# sourceMappingURL=event-store.js.map