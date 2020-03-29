"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const base_event_store_class_1 = require("./base-event-store.class");
exports.eventStoreProviders = [
    {
        provide: 'EVENT_STORE_PROVIDER',
        useFactory: (eventStoreConfig) => {
            if (eventStoreConfig === 'EVENT_STORE_CONFIG_USE_ENV') {
                return new base_event_store_class_1.BaseEventStore();
            }
        },
        inject: ['EVENT_STORE_CONFIG'],
    },
];
//# sourceMappingURL=event-store.provider.js.map