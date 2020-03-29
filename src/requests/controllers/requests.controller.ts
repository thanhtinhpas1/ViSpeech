import { Controller, Get, HttpStatus, Logger, Param, Post, Query, Req, Res, UploadedFile, UseGuards, UseInterceptors } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { AuthGuard } from '@nestjs/passport';
import { FileInterceptor } from '@nestjs/platform-express';
import { ApiConsumes, ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { InjectRepository } from '@nestjs/typeorm';
import axios from 'axios';
import { CONSTANTS } from 'common/constant';
import FormData from 'form-data';
import fs from 'fs';
import { diskStorage } from 'multer';
import { extname } from 'path';
import { RequestDto } from 'requests/dtos/requests.dto';
import { RequestService } from 'requests/services/request.service';
import { Repository } from 'typeorm';
import { Utils } from 'utils';
import { config } from '../../../config';
import { TokenDto } from '../../tokens/dtos/tokens.dto';
import { ApiFile } from '../decorators/asr.decorator';
import { FindRequestsQuery } from 'requests/queries/impl/find-requests.query';

@Controller('speech')
@ApiTags('speech')
@UseGuards(AuthGuard(CONSTANTS.AUTH_JWT))
export class AsrController {
    constructor(
        @InjectRepository(TokenDto)
        private readonly tokenRepository: Repository<TokenDto>,
        private readonly jwtService: JwtService,
        private readonly requestService: RequestService,
    ) {
    }

    @ApiOperation({ tags: ['Request ASR ViSpeech'] })
    @ApiResponse({ status: HttpStatus.OK, description: 'Request ASR ViSpeech' })
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
    async requestAsr(@UploadedFile() file, @Req() req, @Res() res) {
        if (!file) return res.status(HttpStatus.BAD_REQUEST).send({ message: 'file is required' });
        if (file.mimetype !== 'audio/wave')
            return res.status(HttpStatus.BAD_REQUEST).send({ message: 'just support wav mimetype' });
        const token = Utils.extractToken(req);
        const payload = this.jwtService.decode(token);
        const tokenDto = await this.tokenRepository.findOne({ where: { userId: payload['id'], value: token } });
        if (!tokenDto || tokenDto.usedMinutes >= tokenDto.minutes)
            return res.status(HttpStatus.FORBIDDEN).json({ message: 'Token invalid.' });

        const formData = new FormData();
        const stream = fs.createReadStream(file.path);

        formData.append('voice', stream);
        const configHeader = { headers: formData.getHeaders() };
        const url = config.ASR.PROTOCOL + '://' + config.ASR.HOST + ':' + config.ASR.PORT;
        axios.post(url, formData, configHeader).then(result => {
            return res.status(HttpStatus.OK).json(result.data);
        }).catch(err => {
            Logger.error(err.message, 'RequestCall');
            return res.status(HttpStatus.BAD_REQUEST).send();
        }).finally(async () => {
            stream.close();
            const duration = Utils.calculateDuration(file.size);
            const minutes = Number(tokenDto.minutes);
            const usedMinutes = Number(tokenDto.usedMinutes || '0');
            if (duration > (minutes - usedMinutes)) tokenDto.usedMinutes = tokenDto.minutes;
            else tokenDto.usedMinutes = usedMinutes + duration;
            const uuid = Utils.getUuid();
            const requestDto = new RequestDto(uuid, tokenDto.projectId, file.originalname, file.encoding, file.size,
                duration, file.mimetype);
            this.requestService.createRequest(uuid, requestDto, tokenDto);
            fs.unlinkSync(file.path);
        });
    }
}