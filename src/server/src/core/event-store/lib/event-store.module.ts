import { DynamicModule, Global, Module } from '@nestjs/common';
import {
    EventStoreFeatureAsyncOptions,
    EventStoreModuleAsyncOptions,
    EventStoreModuleOptions,
    EventStoreOptionConfig
} from './contract';
import { EventStoreCoreModule } from './event-store-core.module';
import { CqrsModule } from '@nestjs/cqrs';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProjectionDto } from './adapter/projection.dto';
import { MongoStore } from './adapter/mongo-store';
import { config } from '../../../../config';

@Global()
@Module({
    imports: [
        CqrsModule,
        TypeOrmModule.forFeature([ProjectionDto], config.DATABASE,)
    ],
    providers: [MongoStore]
})
export class EventStoreModule {

    static register(option: EventStoreModuleOptions): DynamicModule {
        return {
            module: EventStoreModule,
            imports: [EventStoreCoreModule.register(option), TypeOrmModule.forFeature([ProjectionDto])],
            providers: [MongoStore]
        };
    }

    static registerAsync(option: EventStoreModuleAsyncOptions): DynamicModule {
        return {
            module: EventStoreModule,
            imports: [EventStoreCoreModule.registerAsync(option), TypeOrmModule.forFeature([ProjectionDto])],
        };
    }

    static registerFeature(config: EventStoreOptionConfig): DynamicModule {
        return {
            module: EventStoreModule,
            imports: [EventStoreCoreModule.registerFeature(config), TypeOrmModule.forFeature([ProjectionDto])],
            providers: [MongoStore]
        };
    }

    static registerFeatureAsync(options: EventStoreFeatureAsyncOptions): DynamicModule {
        return {
            module: EventStoreModule,
            imports: [EventStoreCoreModule.registerFeatureAsync(options), TypeOrmModule.forFeature([ProjectionDto])],
        };
    }
}
