import dotenv from 'dotenv';
import pkg from './package.json';

// Load environment variables from .env file
dotenv.config();

const envDevelopmentName = 'development';
const env = process.env.NODE_ENV || envDevelopmentName;
const configs = {
    base: {
        ENV: env,
        DEV: env === envDevelopmentName,
        // General
        NAME: process.env.APP_NAME || pkg.name,
        TITLE: process.env.APP_TITLE || 'Users',
        DESCRIPTION: process.env.APP_DESCRIPTION || 'Users API Microservice',
        APP_ROOT_PATH: process.env.APP_ROOT_PATH || 'apps/build',
        // API
        PREFIX: process.env.APP_PREFIX || 'v1',
        VERSION: process.env.APP_VERSION || '1.0',
        API_EXPLORER_PATH: process.env.APP_API_EXPLORER_PATH || '/api',
        // Server
        HOST: process.env.APP_HOST || '0.0.0.0',
        PORT: process.env.APP_PORT || 7070,
        // Event Store
        EVENTSTORE: {
            tcpEndpoint: {
                host: process.env.EVENT_STORE_HOSTNAME || '0.0.0.0',
                port: process.env.EVENT_STORE_PORT || 1113,
            },
            options: {
                maxRetries: 1000, // Optional
                maxReconnections: 1000,  // Optional
                reconnectionDelay: 1000,  // Optional
                heartbeatInterval: 1000,  // Optional
                heartbeatTimeout: 1000,  // Optional
                defaultUserCredentials: {
                    username: process.env.EVENT_STORE_CREDENTIALS_USERNAME || 'admin',
                    password: process.env.EVENT_STORE_CREDENTIALS_PASSWORD || 'changeit',
                },
            },
        },

        DATABASE: {
            type: process.env.TYPEORM_CONNECTION || 'mongodb',
            host: process.env.APP_HOST || '127.0.0.1',
            username: process.env.TYPEORM_USERNAME,
            password: process.env.TYPEORM_PASSWORD,
            database: process.env.TYPEORM_DATABASE || 'admin',
            port: process.env.TYPEORM_PORT || 27017,
            synchronize: process.env.TYPEORM_SYNCHRONIZE || true,
            logger: process.env.TYPEORM_LOGGING || 'debug',
        },
        JWT: {
            secret: process.env.JWT_SECRET || 'vispeech',
        },
        FACEBOOK: {
            clientId: process.env.FB_APP_ID || '',
            clientSecret: process.env.FB_APP_SECRET || ''
        },
        GOOGLE: {
            clientId: process.env.GG_CLIENT_ID || '',
            clientSecret: process.env.GG_CLIENT_SECRET || ''
        },
        STRIPE_SECRET_KEY: process.env.STRIPE_SECRET_KEY,
        SEND_GRID_API_KEY: process.env.SENDGRID_API_KEY || '',
        NODEMAILER: {
            userEmail: process.env.EMAIL,
            clientId: process.env.EMAIL_CLIENT_ID,
            clientSecret: process.env.EMAIL_CLIENT_SECRET,
            accessToken: process.env.EMAIL_ACCESS_TOKEN,
            refreshToken: process.env.EMAIL_REFRESH_TOKEN
        },
        KAFKA: {
            NAME: process.env.KAFKA_NAME || 'VISPEECH',
            HOST: process.env.APP_HOST || 'asr.vietspeech.com',
            PORT: process.env.KAFKA_PORT || 9092,
            TOPIC: process.env.KAFKA_TOPIC || 'vispeech',
        },
        REDIS: {
          NAME: 'REDIS',
            HOST: process.env.REDIS_HOST || '0.0.0.0',
            PORT: process.env.REDIS_PORT || 6379,
        },
        ASR: {
            PROTOCOL: process.env.ASR_PROTOCOL || 'http',
            HOST: process.env.ASR_HOST || 'asr.vietspeech.com',
            PORT: process.env.ASR_PORT || 5000,
        },
        TOKEN_TYPE: {
            TYPE_FREE_PRICE: process.env.TOKEN_FREE_PRICE || 0,
            TYPE_50_PRICE: process.env.TOKEN_50_PRICE || 5,
            TYPE_200_PRICE: process.env.TOKEN_200_PRICE || 10,
            TYPE_500_PRICE: process.env.TOKEN_500_PRICE || 20,
            TYPE_FREE_MINUTES: process.env.TOKEN_FREE_MINUTES || 10,
            TYPE_50_MINUTES: process.env.TOKEN_50_MINUTES || 50,
            TYPE_200_MINUTES: process.env.TOKEN_200_MINUTES || 200,
            TYPE_500_MINUTES: process.env.TOKEN_500_MINUTES || 500,
        },
        APPLICATION: {
            ADMIN_NAME: process.env.ADMIN_NAME || 'admin',
            ADMIN_LAST_NAME: process.env.ADMIN_LAST_NAME || 'admin',
            ADMIN_USERNAME: process.env.USERNAME || 'admin',
            ADMIN_PASSWORD: process.env.ADMIN_PASSWORD || 'admin',
            ADMIN_EMAIL: process.env.ADMIN_EMAIL || 'admin@gmail.com',
        }
    },
    development: {},
    production: {
        PORT: process.env.APP_PORT || 7071,
    },
    test: {
        PORT: 7072,
    },
};
const config = {...configs.base, ...configs[env]};

export { config };
