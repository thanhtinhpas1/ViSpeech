"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const geteventstore_promise_1 = require("geteventstore-promise");
class BaseEventStore {
    constructor() {
        this.type = 'event-store';
        this.eventFactory = new geteventstore_promise_1.EventFactory();
    }
    connect(config) {
        this.client = new geteventstore_promise_1.TCPClient(config);
        return this;
    }
    getClient() {
        return this.client;
    }
    newEvent(name, payload) {
        return this.eventFactory.newEvent(name, payload);
    }
    close() {
        this.client.close();
        return this;
    }
}
exports.BaseEventStore = BaseEventStore;
//# sourceMappingURL=base-event-store.class.js.map