import { Injectable } from '@nestjs/common';
import { EventStore } from '../../core/event-store/lib';

@Injectable()
export class OrdersSagas {
    constructor(
        private readonly eventStore: EventStore,
    ) {
    }
}
