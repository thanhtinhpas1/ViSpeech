import { Controller, Post, Res, UploadedFile, UseInterceptors } from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { ApiConsumes, ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { InjectRepository } from '@nestjs/typeorm';
import axios from 'axios';
import FormData from 'form-data';
import fs from 'fs';
import { diskStorage } from 'multer';
import { extname } from 'path';
import { Repository } from 'typeorm';
import { config } from '../../../config';
import { TokenDto } from '../../tokens/dtos/tokens.dto';
import { ApiFile } from '../decorators/asr.decorator';

@Controller('speech')
@ApiTags('speech')
export class AsrController {
    constructor(
        @InjectRepository(TokenDto)
        private readonly tokenRepository: Repository<TokenDto>,
    ) {
    }

    @ApiOperation({tags: ['Request ASR ViSpeech']})
    @ApiResponse({status: 200, description: 'Request ASR ViSpeech'})
    // @UseGuards(AuthGuard(CONSTANTS.AUTH_JWT))
    @Post()
    @ApiConsumes('multipart/form-data')
    @ApiFile('voice')
    @UseInterceptors(
        FileInterceptor('voice', {
            storage: diskStorage({
                destination: __dirname + '/../../uploads',
                filename: (req, file, cb) => {
                    const randomName = Array(32).fill(null).map(() =>
                        (Math.round(Math.random() * 16)).toString(16)).join('');
                    return cb(null, `${randomName}${extname(file.originalname)}`);
                },
            }),
        }),
    )
    requestAsr(@UploadedFile() file, @Res() res) {
        const formData = new FormData();
        const stream = fs.createReadStream(file.path);
        formData.append('voice', stream);
        const configHeader = {headers: formData.getHeaders()};
        const url = config.ASR.PROTOCOL + '://' + config.ASR.HOST + ':' + config.ASR.PORT;
        axios.post(url, formData, configHeader).then(result => {
            stream.close();
            res.status(200).json(result.data);
        }).catch(err => {
            stream.close();
            res.status(400).send();
        });
    }
}