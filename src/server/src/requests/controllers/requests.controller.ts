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
import { RequestBody, RequestDto } from 'requests/dtos/requests.dto';
import { RequestService } from 'requests/services/request.service';
import { Repository } from 'typeorm';
import { Utils } from 'utils';
import { config } from '../../../config';
import { TokenDto } from '../../tokens/dtos/tokens.dto';
import { ApiFile } from '../decorators/asr.decorator';
import { AsrServiceGuard } from 'auth/guards/asr.service.guard';
import { PermissionDto } from 'permissions/dtos/permissions.dto';

@Controller('speech')
@ApiTags('speech')
@UseGuards(AuthGuard(CONSTANTS.AUTH_JWT))
export class AsrController {
    constructor(
        @InjectRepository(TokenDto)
        private readonly tokenRepository: Repository<TokenDto>,
        @InjectRepository(PermissionDto)
        private readonly permissionRepository: Repository<PermissionDto>,
        private readonly jwtService: JwtService,
        private readonly requestService: RequestService,
    ) {
    }

    /* Call Asr */

    /*--------------------------------------------*/
    @ApiOperation({ tags: ['Request ASR ViSpeech'] })
    @ApiResponse({ status: HttpStatus.OK, description: 'Request ASR ViSpeech' })
    @ApiConsumes('multipart/form-data')
    @ApiFile('voice')
    @Post()
    @UseInterceptors(
        FileInterceptor('voice')
    )
    async requestAsr(@UploadedFile() file, @Body() requestBody: RequestBody, @Req() req, @Res() res) {
        // invalid file
        if (!file) return res.status(HttpStatus.BAD_REQUEST).send({ message: 'File is required' });

        const token = Utils.extractToken(req);
        const payload = this.jwtService.decode(token);
        let tokenDto = null;
        if (payload['assignerId'] && payload['projectId'] && payload['assigneeId'] && payload['tokenId']) {
            // this is assigneeToken
            const permission = await this.permissionRepository.findOne({ assignerId: payload['assignerId'], projectId: payload['projectId'],
                assigneeId: payload['assigneeId'], status: CONSTANTS.STATUS.ACCEPTED });
            if (!permission) {
                return res.status(HttpStatus.FORBIDDEN).json({message: 'Permission not existed.'});
            }
            if (Utils.tokenExpired(permission.expiresIn)) {
                return res.status(HttpStatus.FORBIDDEN).json({message: 'Permission is expired.'});
            }
            const tokenId = permission.permissions.find(p => p.assigneeToken === token)?.tokenId
            tokenDto = await this.tokenRepository.findOne({ _id: tokenId });
        } else if (payload['id']) {
            // this is normal token
            tokenDto = await this.tokenRepository.findOne({ where: { userId: payload['id'], value: token } });
        }

        // invalid token
        if (!tokenDto || !tokenDto.isValid || Number(tokenDto.usedMinutes) >= Number(tokenDto.minutes))
            return res.status(HttpStatus.FORBIDDEN).json({message: 'Invalid API key.'});

        // not enough token minutes to request
        const duration = Utils.calculateDuration(file.size);
        const minutes = Number(tokenDto.minutes || 0);
        const usedMinutes = Number(tokenDto.usedMinutes || 0);
        if (duration > (minutes - usedMinutes)) {
            return res.status(HttpStatus.FORBIDDEN).json({message: 'Not enough API key\'s minutes to request ASR service.'});
        }

        // create pending request
        let requestStatus = CONSTANTS.STATUS.PENDING;
        let asrData = '';
        const requestId = Utils.getUuid();
        const requestDto = new RequestDto(tokenDto._id, tokenDto.tokenTypeId, tokenDto.projectId, tokenDto.userId, file.originalname, file.encoding,
            file.size, duration, file.mimetype, requestStatus, requestBody?.assigneeId, requestBody?.audioFileUrl);
        requestDto._id = requestId;
        await this.requestService.createRequest(requestId, requestDto, tokenDto);

        // call asr
        const formData = new FormData();
        formData.append('voice', file.buffer, { filename: file.originalname });
        const url = config.ASR.PROTOCOL + '://' + config.ASR.HOST + ':' + config.ASR.PORT;
        axios.post(url, formData, { headers: formData.getHeaders() }).then(result => {
            requestStatus = CONSTANTS.STATUS.IN_PROGRESS;
            asrData = result.data?.text;
            // send back requestId, tokenId
            result.data.requestId = requestId;
            result.data.tokenId = requestDto.tokenId;
            return res.status(HttpStatus.OK).json(result.data);
        }).catch(err => {
            Logger.error(err.message, '', 'RequestCall');
            requestStatus = CONSTANTS.STATUS.FAILURE;
            return res.status(HttpStatus.BAD_REQUEST).send();
        }).finally(async () => {
            requestDto.status = requestStatus;
            if (requestStatus === CONSTANTS.STATUS.IN_PROGRESS) {
                tokenDto.usedMinutes = usedMinutes + duration;
                if (!requestBody?.audioFileUrl || !asrData) {
                    requestDto.status = CONSTANTS.STATUS.SUCCESS;
                }
            }

            this.requestService.callAsr(requestId, requestDto, tokenDto);
        });
    }
}