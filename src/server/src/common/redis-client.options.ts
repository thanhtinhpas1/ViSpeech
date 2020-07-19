import { RedisOptions, Transport } from '@nestjs/microservices';

export const redisClientOptions: RedisOptions = {
    transport: Transport.REDIS,
    options: {
        url: 'redis://localhost:6379',
        retryAttempts: 10,
        retryDelay: 30000,
    },
}