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
    // API
    PREFIX: process.env.APP_PREFIX || 'v1',
    VERSION: process.env.APP_VERSION || '1.0',
    API_EXPLORER_PATH: process.env.APP_API_EXPLORER_PATH || '/api',
    // Server
    HOST: process.env.APP_HOST || '0.0.0.0',
    PORT: process.env.APP_PORT || 7071,
    // Event Store
    EVENT_STORE_SETTINGS: {
      protocol: process.env.EVENT_STORE_PROTOCOL || 'http',
      hostname: process.env.EVENT_STORE_HOSTNAME || '13.230.185.171',
      tcpPort: process.env.EVENT_STORE_TCP_PORT ||  1113,
      httpPort: process.env.EVENT_STORE_HTTP_PORT ||  2113,
      credentials: {
        username: process.env.EVENT_STORE_CREDENTIALS_USERNAME ||  'admin',
        password: process.env.EVENT_STORE_CREDENTIALS_PASSWORD ||  'changeit',
      },
      poolOptions: {
        min: process.env.EVENT_STORE_POOLOPTIONS_MIN || 1,
        max: process.env.EVENT_STORE_POOLOPTIONS_MAX || 10,
      },
    },
    
    // Database 
    DATABASE: {
      connection: process.env.TYPEORM_CONNECTION,
      host: process.env.TYPEORM_HOST,
      username: process.env.TYPEORM_USERNAME,
      password: process.env.TYPEORM_PASSWORD,
      database: process.env.TYPEORM_DATABASE,
      port: process.env.TYPEORM_PORT,
      synchronize: process.env.TYPEORM_SYNCHRONIZE,
      logging: process.env.TYPEORM_LOGGING,
      entities: process.env.TYPEORM_ENTITIES
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

export {config};
