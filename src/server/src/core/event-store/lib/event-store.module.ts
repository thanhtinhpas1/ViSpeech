import { DynamicModule, Global, Module } from '@nestjs/common';
import {
    EventStoreFeatureAsyncOptions,
    EventStoreModuleAsyncOptions,
    EventStoreModuleOptions,
    EventStoreOptionConfig
} from './contract';
import { EventStoreCoreModule } from './event-store-core.module';
import { CqrsModule } from '@nestjs/cqrs';
import { TypeOrmModule } from "@nestjs/typeorm";
import { ProjectionDto } from "./adapter/projection.dto";

@Global()
@Module({
    imports: [
        CqrsModule,
        TypeOrmModule.forFeature([ProjectionDto])
    ],
})
export class EventStoreModule {

    static register(option: EventStoreModuleOptions): DynamicModule {
        return {
            module: EventStoreModule,
            imports: [EventStoreCoreModule.register(option)],
        };
    }

    static registerAsync(option: EventStoreModuleAsyncOptions): DynamicModule {
        return {
            module: EventStoreModule,
            imports: [EventStoreCoreModule.registerAsync(option)],
        };
    }

    static registerFeature(config: EventStoreOptionConfig): DynamicModule {
        return {
            module: EventStoreModule,
            imports: [EventStoreCoreModule.registerFeature(config)],
        };
    }

    static registerFeatureAsync(options: EventStoreFeatureAsyncOptions): DynamicModule {
        return {
            module: EventStoreModule,
            imports: [EventStoreCoreModule.registerFeatureAsync(options)],
        };
    }
}
