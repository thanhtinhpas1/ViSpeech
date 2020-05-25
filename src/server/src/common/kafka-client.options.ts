import { KafkaOptions, Transport } from "@nestjs/microservices";
import { config } from "../../config";

export const kafkaClientOptions: KafkaOptions = {
    transport: Transport.KAFKA,
    options: {
        client: {
            clientId: 'vispeech',
            brokers: [`${config.KAFKA.HOST}:${config.KAFKA.PORT}`],
        },
        producer: {
            transactionalId: config.KAFKA.NAME,
            allowAutoTopicCreation: true,
        },
    },
}