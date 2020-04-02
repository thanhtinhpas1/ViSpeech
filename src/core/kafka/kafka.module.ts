import {DynamicModule, Global, Module} from "@nestjs/common";
import {ClientsModule} from "@nestjs/microservices";
import {config} from "../../../config";
import {kafkaClientOptions} from "../../common/kafka-client.options";

@Global()
@Module({
    imports: [
        ClientsModule.register([{
            name: config.KAFKA.NAME,
            ...kafkaClientOptions,
        }])
    ]
})
export class KafkaModule {
    static forRoot(): DynamicModule {
        return {
            module: KafkaModule
        };
    }

    static forFeature(): DynamicModule {
        return {
            module: KafkaModule,
            providers: [],
            exports: []
        }
    }
}