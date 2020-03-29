"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var EventStoreModule_1;
Object.defineProperty(exports, "__esModule", { value: true });
const common_1 = require("@nestjs/common");
const event_store_1 = require("./event-store");
const event_store_provider_1 = require("./event-store.provider");
let EventStoreModule = EventStoreModule_1 = class EventStoreModule {
    static forRoot() {
        return {
            module: EventStoreModule_1,
        };
    }
    static forFeature() {
        return {
            module: EventStoreModule_1,
            providers: [
                event_store_1.EventStore
            ],
            exports: [
                event_store_1.EventStore
            ],
        };
    }
};
EventStoreModule = EventStoreModule_1 = __decorate([
    common_1.Global(),
    common_1.Module({
        providers: [
            ...event_store_provider_1.eventStoreProviders,
            {
                provide: 'EVENT_STORE_CONFIG',
                useValue: 'EVENT_STORE_CONFIG_USE_ENV',
            },
        ],
        exports: [
            ...event_store_provider_1.eventStoreProviders,
            {
                provide: 'EVENT_STORE_CONFIG',
                useValue: 'EVENT_STORE_CONFIG_USE_ENV',
            },
        ],
    })
], EventStoreModule);
exports.EventStoreModule = EventStoreModule;
//# sourceMappingURL=event-store.module.js.map