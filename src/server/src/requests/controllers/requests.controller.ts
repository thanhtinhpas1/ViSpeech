import {
    Body,
    Controller,
    HttpStatus,
    Logger,
    Post,
    Req,
    Res,
    UploadedFile,
    UseGuards,
    UseInterceptors
} from '@nestjs/common';
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
import { RequestBody, RequestDto } from 'requests/dtos/requests.dto';
import { RequestService } from 'requests/services/request.service';
import { Repository } from 'typeorm';
import { Utils } from 'utils';
import { config } from '../../../config';
import { TokenDto } from '../../tokens/dtos/tokens.dto';
import { ApiFile } from '../decorators/asr.decorator';
import { AsrServiceGuard } from 'auth/guards/asr.service.guard';

const { getAudioDurationInSeconds } = require('get-audio-duration');

@Controller('speech')
@ApiTags('speech')
@UseGuards(AuthGuard(CONSTANTS.AUTH_JWT), AsrServiceGuard)
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
    async requestAsr(@UploadedFile() file, @Body() requestBody: RequestBody, @Req() req, @Res() res) {
        // invalid file
        if (!file) return res.status(HttpStatus.BAD_REQUEST).send({ message: 'File is required' });
        // if (!['audio/wav', 'audio/wave'].includes(file.mimetype))
        //     return res.status(HttpStatus.BAD_REQUEST).send({ message: 'Only support wav mimetype' });

        const token = Utils.extractToken(req);
        const payload = this.jwtService.decode(token);
        const tokenDto = await this.tokenRepository.findOne({ where: { userId: payload['id'], value: token } });

        // invalid token
        if (!tokenDto || !tokenDto.isValid || tokenDto.usedMinutes >= tokenDto.minutes)
            return res.status(HttpStatus.FORBIDDEN).json({ message: 'Invalid token.' });

        // not enough token minutes to request
        // const duration = Utils.calculateDuration(file.size);
        const seconds = await getAudioDurationInSeconds(file.path);
        const duration = parseFloat((seconds / 60.0).toFixed(4));
        const minutes = Number(tokenDto.minutes);
        const usedMinutes = Number(tokenDto.usedMinutes || 0);
        if (duration > (minutes - usedMinutes)) {
            return res.status(HttpStatus.FORBIDDEN).json({ message: 'Not enough token\' minutes to request.' });
        }

        // call asr
        let requestStatus = CONSTANTS.STATUS.PENDING;
        const requestId = Utils.getUuid();
        const stream = fs.createReadStream(file.path);
        const formData = new FormData();
        formData.append('voice', stream);
        const url = config.ASR.PROTOCOL + '://' + config.ASR.HOST + ':' + config.ASR.PORT;
        axios.post(url, formData, { headers: formData.getHeaders() }).then(result => {
            requestStatus = CONSTANTS.STATUS.SUCCESS;
            // send back requestId
            result.data.requestId = requestId;
            return res.status(HttpStatus.OK).json(result.data);
        }).catch(err => {
            Logger.error(err.message, 'RequestCall');
            requestStatus = CONSTANTS.STATUS.FAILURE;
            return res.status(HttpStatus.BAD_REQUEST).send();
        }).finally(async () => {
            stream.close();

            if (requestStatus === CONSTANTS.STATUS.SUCCESS) {
                tokenDto.usedMinutes = usedMinutes + duration;
            }

            const requestDto = new RequestDto(tokenDto._id, tokenDto.projectId, tokenDto.userId, file.originalname, file.encoding, file.size,
                duration, file.mimetype, requestStatus, requestBody?.audioFileUrl);
            requestDto._id = requestId;
            this.requestService.createRequest(requestId, requestDto, tokenDto);
            fs.unlinkSync(file.path);
        });
    }
}