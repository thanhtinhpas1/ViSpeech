import {Module} from '@nestjs/common';
import {AsrController} from './controllers/requests.controller';
import {TypeOrmModule} from '@nestjs/typeorm';
import {TokenDto} from '../tokens/dtos/tokens.dto';
import {MulterModule} from '@nestjs/platform-express';

@Module({
    imports: [
        TypeOrmModule.forFeature([TokenDto]),
        MulterModule.register({
        }),
    ],
    controllers: [
        AsrController,
    ],
})

export class RequestModule {
}