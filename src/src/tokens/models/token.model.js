"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const cqrs_1 = require("@nestjs/cqrs");
const token_created_event_1 = require("../events/impl/token-created.event");
const token_updated_event_1 = require("../events/impl/token-updated.event");
const token_deleted_event_1 = require("../events/impl/token-deleted.event");
const token_welcomed_event_1 = require("../events/impl/token-welcomed.event");
const free_token_created_event_1 = require("tokens/events/impl/free-token-created.event");
const ordered_token_created_event_1 = require("tokens/events/impl/ordered-token-created.event");
class Token extends cqrs_1.AggregateRoot {
    constructor(id) {
        super();
        this.id = id;
    }
    setData(data) {
        this.data = data;
    }
    createToken(streamId) {
        this.apply(new token_created_event_1.TokenCreatedEvent(streamId, this.data));
    }
    createFreeToken(streamId) {
        this.apply(new free_token_created_event_1.FreeTokenCreatedEvent(streamId, this.data));
    }
    createOrderedToken(streamId) {
        this.apply(new ordered_token_created_event_1.OrderedTokenCreatedEvent(streamId, this.data));
    }
    updateToken(streamId) {
        this.apply(new token_updated_event_1.TokenUpdatedEvent(streamId, this.data));
    }
    welcomeToken(streamId) {
        this.apply(new token_welcomed_event_1.TokenWelcomedEvent(streamId, this.id));
    }
    deleteToken(streamId) {
        this.apply(new token_deleted_event_1.TokenDeletedEvent(streamId, this.id));
    }
    deleteTokenByUserId(streamId) {
        this.apply(new token_deleted_event_1.TokenDeletedByUserIdEvent(streamId, this.data));
    }
}
exports.Token = Token;
//# sourceMappingURL=token.model.js.map