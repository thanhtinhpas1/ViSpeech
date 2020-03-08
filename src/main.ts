import { Logger, ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { FastifyAdapter } from '@nestjs/platform-fastify';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { config } from '../config';
import { AppModule } from './app.module';

async function bootstrap() {
    const app = await NestFactory.create(AppModule, new FastifyAdapter({
        trustProxy: true,
    }));
    app.enableCors();
    const documentOptions = new DocumentBuilder()
        .setTitle(config.TITLE)
        .setDescription(config.DESCRIPTION)
        .setVersion(config.VERSION)
        .addTag(config.NAME)
        .setBasePath(config.PREFIX)
        .addBearerAuth()
        .build();
    const document = SwaggerModule.createDocument(app, documentOptions);
    const validationOptions = {
        transform: true,
        skipMissingProperties: true,
        validationError: { target: false }
    };
    /*--------------------------------------------*/
    app.useGlobalPipes(new ValidationPipe(validationOptions));
    app.setGlobalPrefix(config.PREFIX);
    SwaggerModule.setup(config.API_EXPLORER_PATH, app, document);
    await app.listen(config.PORT, config.HOST);
    Logger.log(`Server listening on port ${config.PORT}`, 'Bootstrap');
}

bootstrap();
