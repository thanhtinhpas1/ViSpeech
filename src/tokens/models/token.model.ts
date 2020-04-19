import {AggregateRoot} from '@nestjs/cqrs';
import {TokenCreatedEvent} from '../events/impl/token-created.event';
import {TokenUpdatedEvent} from '../events/impl/token-updated.event';
import {TokenDeletedEvent} from '../events/impl/token-deleted.event';
import {TokenWelcomedEvent} from '../events/impl/token-welcomed.event';
import {FreeTokenCreatedEvent} from 'tokens/events/impl/free-token-created.event';
import {OrderedTokenCreatedEvent} from 'tokens/events/impl/ordered-token-created.event';
import { TokenDeletedByProjectIdEvent } from 'tokens/events/impl/token-deleted-by-projectId.event';
import { TokenDeletedByUserIdEvent } from 'tokens/events/impl/token-deleted-by-userId.event';

export class Token extends AggregateRoot {
    [x: string]: any;

    constructor(private readonly id: string | undefined) {
        super();
    }

    setData(data) {
        this.data = data;
    }

    createToken(streamId: string) {
        this.apply(new TokenCreatedEvent(streamId, this.data));
    }

    createFreeToken(streamId: string) {
        this.apply(new FreeTokenCreatedEvent(streamId, this.data));
    }

    createOrderedToken(streamId: string) {
        this.apply(new OrderedTokenCreatedEvent(streamId, this.data));
    }

    updateToken(streamId: string) {
        this.apply(new TokenUpdatedEvent(streamId, this.data));
    }

    welcomeToken(streamId: string) {
        this.apply(new TokenWelcomedEvent(streamId, this.id));
    }

    deleteToken(streamId: string) {
        this.apply(new TokenDeletedEvent(streamId, this.id));
    }

    deleteTokenByUserId(streamId: string) {
        this.apply(new TokenDeletedByUserIdEvent(streamId, this.data));
    }

    deleteTokenByProjectId(streamId: string) {
        this.apply(new TokenDeletedByProjectIdEvent(streamId, this.data));
    }
}
