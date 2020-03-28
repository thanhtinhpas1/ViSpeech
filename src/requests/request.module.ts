import {forwardRef, Module, OnModuleInit} from '@nestjs/common';
import {AsrController} from './controllers/requests.controller';
import {TypeOrmModule} from '@nestjs/typeorm';
import {TokenDto} from '../tokens/dtos/tokens.dto';
import {MulterModule} from '@nestjs/platform-express';
import {AuthModule} from '../auth/auth.module';
import {CommandBus, EventBus, QueryBus} from '@nestjs/cqrs';
import {EventStore} from '../core/event-store/event-store';
import {EventHandlers} from './events/handler';
import {CommandHandlers} from './commands/handler';
import {QueryHandlers} from './queries/handler';

@Module({
    imports: [
        TypeOrmModule.forFeature([TokenDto]),
        MulterModule.register({}),
        forwardRef(() => AuthModule),
    ],
    controllers: [
        AsrController,
    ],
    providers: [],
})

export class RequestModule implements OnModuleInit {
    constructor(
        private readonly command$: CommandBus,
        private readonly query$: QueryBus,
        private readonly event$: EventBus,
        private readonly reportsSagas: any,
        private readonly eventStore: EventStore,
    ) {
    }

    onModuleInit(): any {
        this.eventStore.setEventHandlers(this.eventHandlers);
        this.eventStore.bridgeEventsTo((this.event$ as any).subject$);
        this.event$.publisher = this.eventStore;
        /** ------------ */
        this.event$.register(EventHandlers);
        this.command$.register(CommandHandlers);
        this.query$.register(QueryHandlers);
        // this.event$.registerSagas([ReportsSagas]);
    }

    eventHandlers = {};
}