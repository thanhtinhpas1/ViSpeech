"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const dotenv_1 = __importDefault(require("dotenv"));
const package_json_1 = __importDefault(require("./package.json"));
dotenv_1.default.config();
const envDevelopmentName = 'development';
const env = process.env.NODE_ENV || envDevelopmentName;
const configs = {
    base: {
        ENV: env,
        DEV: env === envDevelopmentName,
        NAME: process.env.APP_NAME || package_json_1.default.name,
        TITLE: process.env.APP_TITLE || 'Users',
        DESCRIPTION: process.env.APP_DESCRIPTION || 'Users API Microservice',
        APP_ROOT_PATH: process.env.APP_ROOT_PATH || 'apps/build',
        PREFIX: process.env.APP_PREFIX || 'v1',
        VERSION: process.env.APP_VERSION || '1.0',
        API_EXPLORER_PATH: process.env.APP_API_EXPLORER_PATH || '/api',
        HOST: process.env.APP_HOST || '0.0.0.0',
        PORT: process.env.APP_PORT || 7070,
        EVENT_STORE_SETTINGS: {
            protocol: process.env.EVENT_STORE_PROTOCOL || 'http',
            hostname: process.env.EVENT_STORE_HOSTNAME || '0.0.0.0',
            tcpPort: process.env.EVENT_STORE_TCP_PORT || 1113,
            httpPort: process.env.EVENT_STORE_HTTP_PORT || 2113,
            credentials: {
                username: process.env.EVENT_STORE_CREDENTIALS_USERNAME || 'admin',
                password: process.env.EVENT_STORE_CREDENTIALS_PASSWORD || 'changeit',
            },
            poolOptions: {
                min: process.env.EVENT_STORE_POOLOPTIONS_MIN || 1,
                max: process.env.EVENT_STORE_POOLOPTIONS_MAX || 10,
            },
            category: process.env.EVENT_STORE_CATEGORY || 'vispeech'
        },
        DATABASE: {
            type: process.env.TYPEORM_CONNECTION || 'mongodb',
            host: process.env.TYPEORM_HOST || '127.0.0.1',
            username: process.env.TYPEORM_USERNAME,
            password: process.env.TYPEORM_PASSWORD,
            database: process.env.TYPEORM_DATABASE || 'vispeech',
            port: process.env.TYPEORM_PORT || 27017,
            synchronize: process.env.TYPEORM_SYNCHRONIZE || true,
            logger: process.env.TYPEORM_LOGGING || 'debug',
        },
        JWT: {
            secret: process.env.JWT_SECRET || 'vispeech',
        },
        STRIPE_SECRET_KEY: process.env.STRIPE_SECRET_KEY,
        KAFKA: {
            HOST: process.env.KAFKA_HOST || '0.0.0.0',
            PORT: process.env.KAFKA_PORT || 9092,
        },
        ASR: {
            PROTOCOL: process.env.ASR_PROTOCOL || 'http',
            HOST: process.env.ASR_HOST || '0.0.0.0',
            PORT: process.env.ASR_PORT || 5000,
        },
    },
    development: {},
    production: {
        PORT: process.env.APP_PORT || 7071,
    },
    test: {
        PORT: 7072,
    },
};
const config = Object.assign(Object.assign({}, configs.base), configs[env]);
exports.config = config;
//# sourceMappingURL=config.js.map