import { Logger, ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { NestExpressApplication } from '@nestjs/platform-express';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { config } from '../config';
import { AppModule } from './app.module';
import { kafkaClientOptions } from "./common/kafka-client.options";

async function bootstrap() {
    const app = await NestFactory.create<NestExpressApplication>(AppModule);
    app.enableCors();
    app.setGlobalPrefix(config.PREFIX)
    const documentOptions = new DocumentBuilder()
        .setTitle(config.TITLE)
        .setDescription(config.DESCRIPTION)
        .setVersion(config.VERSION)
        .addTag(config.NAME)
        .addBearerAuth()
        .build();
    const document = SwaggerModule.createDocument(app, documentOptions);
    const validationOptions = {
        transform: false,
        skipMissingProperties: false,
        validationError: {target: true},
    };
    app.useGlobalPipes(new ValidationPipe(validationOptions));
    app.setGlobalPrefix(config.PREFIX);
    SwaggerModule.setup(config.API_EXPLORER_PATH, app, document);

    app.connectMicroservice(kafkaClientOptions);
    await app.listen(config.PORT, config.HOST, () => {
        Logger.log(`Application is running PORT: ${config.PORT}`, 'Bootstrap');
    });
}

bootstrap().then(r => Logger.log(`Application is running`));
