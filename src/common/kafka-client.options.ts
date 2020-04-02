import {KafkaOptions, Transport} from "@nestjs/microservices";
import {config} from "../../config";

export const kafkaClientOptions: KafkaOptions = {
    transport: Transport.KAFKA,
    options: {
        client: {
            clientId: '1',
            brokers: [`${config.KAFKA.HOST}:${config.KAFKA.PORT}`],
        },
        consumer: {
            groupId: 'vispeech-consumer'
        },
        subscribe: {
            fromBeginning: true,
        }
    },
}