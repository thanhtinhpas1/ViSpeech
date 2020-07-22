import { BaseEntityDto } from 'base/base-entity.dto';
import { IsIn, IsNotEmpty, IsNumber, IsOptional, IsPositive, IsString, IsUUID } from 'class-validator';
import { Column, Entity } from 'typeorm';
import { ErrorUtils } from "../../utils/errorUtils";
import { ERR } from "../../common/error";
import { CONSTANTS } from 'common/constant';

export class FindRequestsParam {
    @IsOptional()
    @IsUUID('all', ErrorUtils.getMessage('projectId', ERR.IsUUID))
    @IsString(ErrorUtils.getMessage('projectId', ERR.IsString))
    projectId: string;

    @IsOptional()
    @IsUUID('all', ErrorUtils.getMessage('userId', ERR.IsUUID))
    @IsString(ErrorUtils.getMessage('userId', ERR.IsString))
    userId: string;
}

export class UpdateRequestParamsDto {
    @IsNotEmpty(ErrorUtils.getMessage('_id', ERR.IsNotEmpty))
    @IsString(ErrorUtils.getMessage('_id', ERR.IsString))
    _id: string;

    @IsNotEmpty(ErrorUtils.getMessage('tokenId', ERR.IsNotEmpty))
    @IsString(ErrorUtils.getMessage('tokenId', ERR.IsString))
    tokenId: string;
}

export class RequestBody {
    @IsOptional()
    @IsString(ErrorUtils.getMessage('audioFileUrl', ERR.IsString))
    audioFileUrl: string;

    @IsOptional()
    @IsString(ErrorUtils.getMessage('assigneeId', ERR.IsString))
    assigneeId: string;
}

@Entity('requests')
export class RequestDto extends BaseEntityDto {

    constructor(tokenId: string, tokenTypeId: string, projectId: string, userId: string, fileName: string, encoding: string, size: string,
                duration: number, mimeType: string, status: string, assigneeId?: string, audioFileUrl?: string, transcriptFileUrl?: string) {
        super();
        this.tokenId = tokenId;
        this.tokenTypeId = tokenTypeId;
        this.projectId = projectId;
        this.userId = userId;
        this.fileName = fileName;
        this.encoding = encoding;
        this.size = size;
        this.duration = duration;
        this.mimeType = mimeType;
        this.status = status;
        this.assigneeId = assigneeId;
        this.audioFileUrl = audioFileUrl;
        this.transcriptFileUrl = transcriptFileUrl;
    }

    @IsNotEmpty(ErrorUtils.getMessage('tokenId', ERR.IsNotEmpty))
    @IsString(ErrorUtils.getMessage('tokenId', ERR.IsString))
    @Column()
    tokenId: string;

    @IsNotEmpty(ErrorUtils.getMessage('tokenTypeId', ERR.IsNotEmpty))
    @IsString(ErrorUtils.getMessage('tokenTypeId', ERR.IsString))
    @Column()
    tokenTypeId: string;

    @IsNotEmpty(ErrorUtils.getMessage('projectId', ERR.IsNotEmpty))
    @IsString(ErrorUtils.getMessage('projectId', ERR.IsString))
    @IsUUID('all', ErrorUtils.getMessage('projectId', ERR.IsUUID))
    @Column()
    projectId: string;

    @IsNotEmpty(ErrorUtils.getMessage('userId', ERR.IsNotEmpty))
    @IsString(ErrorUtils.getMessage('userId', ERR.IsString))
    @IsUUID('all', ErrorUtils.getMessage('userId', ERR.IsUUID))
    @Column()
    userId: string;

    @IsString(ErrorUtils.getMessage('fileName', ERR.IsString))
    @IsNotEmpty(ErrorUtils.getMessage('fileName', ERR.IsNotEmpty))
    @Column()
    fileName: string;

    @IsString(ErrorUtils.getMessage('encoding', ERR.IsString))
    @IsNotEmpty(ErrorUtils.getMessage('encoding', ERR.IsNotEmpty))
    @Column()
    encoding: string;

    @IsString(ErrorUtils.getMessage('size', ERR.IsString))
    @IsNotEmpty(ErrorUtils.getMessage('size', ERR.IsNotEmpty))
    @Column()
    size: string;

    @IsNumber({}, ErrorUtils.getMessage('duration', ERR.IsNumber))
    @IsPositive(ErrorUtils.getMessage('duration', ERR.IsPositive))
    @Column({
        comment: 'length of voice - minute',
        type: 'double'
    })
    duration: number;

    @IsString(ErrorUtils.getMessage('mimeType', ERR.IsString))
    @IsNotEmpty(ErrorUtils.getMessage('mimeType', ERR.IsNotEmpty))
    @Column()
    mimeType;

    @IsString(ErrorUtils.getMessage('status', ERR.IsString))
    @IsNotEmpty(ErrorUtils.getMessage('status', ERR.IsNotEmpty))
    @IsIn([
        CONSTANTS.STATUS.PENDING,
        CONSTANTS.STATUS.SUCCESS,
        CONSTANTS.STATUS.FAILURE,
    ])
    @Column()
    status: string;

    @IsOptional()
    @IsString(ErrorUtils.getMessage('assigneeId', ERR.IsString))
    @IsUUID('all', ErrorUtils.getMessage('assigneeId', ERR.IsUUID))
    @Column()
    assigneeId: string;

    @IsOptional()
    @IsString(ErrorUtils.getMessage('audioFileUrl', ERR.IsString))
    @Column()
    audioFileUrl: string;

    @IsOptional()
    @IsString(ErrorUtils.getMessage('transcriptFileUrl', ERR.IsString))
    @Column()
    transcriptFileUrl: string;
}
