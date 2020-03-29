"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const common_1 = require("@nestjs/common");
const jwt_1 = require("@nestjs/jwt");
const passport_1 = require("@nestjs/passport");
const platform_express_1 = require("@nestjs/platform-express");
const swagger_1 = require("@nestjs/swagger");
const typeorm_1 = require("@nestjs/typeorm");
const axios_1 = __importDefault(require("axios"));
const constant_1 = require("common/constant");
const form_data_1 = __importDefault(require("form-data"));
const fs_1 = __importDefault(require("fs"));
const multer_1 = require("multer");
const path_1 = require("path");
const request_service_1 = require("requests/services/request.service");
const typeorm_2 = require("typeorm");
const utils_1 = require("utils");
const config_1 = require("../../../config");
const tokens_dto_1 = require("../../tokens/dtos/tokens.dto");
const asr_decorator_1 = require("../decorators/asr.decorator");
const requests_dto_1 = require("requests/dtos/requests.dto");
let AsrController = class AsrController {
    constructor(tokenRepository, jwtService, requestService) {
        this.tokenRepository = tokenRepository;
        this.jwtService = jwtService;
        this.requestService = requestService;
    }
    requestAsr(file, req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            if (!file)
                return res.status(common_1.HttpStatus.BAD_REQUEST).send({ message: 'file is required' });
            if (file.mimetype !== 'audio/wave')
                return res.status(common_1.HttpStatus.BAD_REQUEST).send({ message: 'just support wav mimetype' });
            const token = utils_1.Utils.extractToken(req);
            const payload = this.jwtService.decode(token);
            const tokenDto = yield this.tokenRepository.findOne({ where: { userId: payload['id'], value: token } });
            if (!tokenDto || tokenDto.usedMinutes >= tokenDto.minutes)
                return res.status(common_1.HttpStatus.FORBIDDEN).json({ message: 'Token invalid.' });
            const formData = new form_data_1.default();
            const stream = fs_1.default.createReadStream(file.path);
            formData.append('voice', stream);
            const configHeader = { headers: formData.getHeaders() };
            const url = config_1.config.ASR.PROTOCOL + '://' + config_1.config.ASR.HOST + ':' + config_1.config.ASR.PORT;
            axios_1.default.post(url, formData, configHeader).then(result => {
                return res.status(common_1.HttpStatus.OK).json(result.data);
            }).catch(err => {
                common_1.Logger.error(err.message, 'RequestCall');
                return res.status(common_1.HttpStatus.BAD_REQUEST).send();
            }).finally(() => __awaiter(this, void 0, void 0, function* () {
                stream.close();
                const duration = utils_1.Utils.calculateDuration(file.size);
                console.log(duration);
                if (duration > tokenDto.usedMinutes)
                    tokenDto.usedMinutes = tokenDto.minutes;
                else
                    tokenDto.usedMinutes -= duration;
                fs_1.default.unlink(file.path, (err => {
                    common_1.Logger.warn(err, 'RequestRemoveFile');
                }));
                const uuid = utils_1.Utils.getUuid();
                const requestDto = new requests_dto_1.RequestDto(uuid, file.origin, duration, file.mimetype);
                this.requestService.createRequest(uuid, requestDto, tokenDto);
            }));
        });
    }
};
__decorate([
    swagger_1.ApiOperation({ tags: ['Request ASR ViSpeech'] }),
    swagger_1.ApiResponse({ status: common_1.HttpStatus.OK, description: 'Request ASR ViSpeech' }),
    common_1.Post(),
    swagger_1.ApiConsumes('multipart/form-data'),
    asr_decorator_1.ApiFile('voice'),
    common_1.UseInterceptors(platform_express_1.FileInterceptor('voice', {
        storage: multer_1.diskStorage({
            destination: __dirname + '/../../uploads',
            filename: (req, file, cb) => {
                const randomName = Array(32).fill(null).map(() => (Math.round(Math.random() * 16)).toString(16)).join('');
                return cb(null, `${randomName}${path_1.extname(file.originalname)}`);
            },
        }),
    })),
    __param(0, common_1.UploadedFile()), __param(1, common_1.Req()), __param(2, common_1.Res()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object, Object]),
    __metadata("design:returntype", Promise)
], AsrController.prototype, "requestAsr", null);
AsrController = __decorate([
    common_1.Controller('speech'),
    swagger_1.ApiTags('speech'),
    common_1.UseGuards(passport_1.AuthGuard(constant_1.CONSTANTS.AUTH_JWT)),
    __param(0, typeorm_1.InjectRepository(tokens_dto_1.TokenDto)),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        jwt_1.JwtService,
        request_service_1.RequestService])
], AsrController);
exports.AsrController = AsrController;
//# sourceMappingURL=requests.controller.js.map