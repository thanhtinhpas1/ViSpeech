import { KafkaOptions, Transport } from "@nestjs/microservices";
import { config } from "../../config";

export const kafkaClientOptions: KafkaOptions = {
    transport: Transport.KAFKA,
    options: {
        client: {
            clientId: 'vispeech',
            brokers: [`${config.KAFKA.HOST}:${config.KAFKA.PORT}`],
            authenticationTimeout: 10000,
            requestTimeout: 10000,
            connectionTimeout: 30000,
        },
        producer: {
            transactionalId: config.KAFKA.NAME,
            allowAutoTopicCreation: true,
            transactionTimeout: 30000,
        },
    },
}