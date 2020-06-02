import { BaseEntityDto } from 'base/base-entity.dto';
import { IsNotEmpty, IsNumber, IsOptional, IsPositive, IsString, IsUUID, IsIn } from 'class-validator';
import { Column, Entity } from 'typeorm';
import { ErrUtil } from "../../utils/err.util";
import { ERR } from "../../common/error";
import { CONSTANTS } from 'common/constant';

export class FindRequestsParam {
    @IsOptional()
    @IsUUID('all', ErrUtil.getMessage('projectId', ERR.IsUUID))
    @IsString(ErrUtil.getMessage('projectId', ERR.IsString))
    projectId: string;

    @IsOptional()
    @IsUUID('all', ErrUtil.getMessage('userId', ERR.IsUUID))
    @IsString(ErrUtil.getMessage('userId', ERR.IsString))
    userId: string;
}

export class RequestBody {
    @IsOptional()
    @IsString(ErrUtil.getMessage('audioFileUrl', ERR.IsString))
    audioFileUrl: string;
}

@Entity('requests')
export class RequestDto extends BaseEntityDto {

    constructor(tokenId: string, projectId: string, userId: string, fileName: string, encoding: string, size: string,
                duration: number, mimeType: string, status: string, audioFileUrl?: string) {
        super();
        this.tokenId = tokenId;
        this.projectId = projectId;
        this.userId = userId;
        this.fileName = fileName;
        this.encoding = encoding;
        this.size = size;
        this.duration = duration;
        this.mimeType = mimeType;
        this.audioFileUrl = audioFileUrl;
        this.status = status;
    }

    @IsNotEmpty(ErrUtil.getMessage('tokenId', ERR.IsNotEmpty))
    @IsString(ErrUtil.getMessage('tokenId', ERR.IsString))
    @Column()
    tokenId: string;

    @IsNotEmpty(ErrUtil.getMessage('projectId', ERR.IsNotEmpty))
    @IsString(ErrUtil.getMessage('projectId', ERR.IsString))
    @IsUUID('all', ErrUtil.getMessage('projectId', ERR.IsUUID))
    @Column()
    projectId: string;

    @IsNotEmpty(ErrUtil.getMessage('userId', ERR.IsNotEmpty))
    @IsString(ErrUtil.getMessage('userId', ERR.IsString))
    @IsUUID('all', ErrUtil.getMessage('userId', ERR.IsUUID))
    @Column()
    userId: string;

    @IsString(ErrUtil.getMessage('fileName', ERR.IsString))
    @IsNotEmpty(ErrUtil.getMessage('fileName', ERR.IsNotEmpty))
    @Column()
    fileName: string;

    @IsString(ErrUtil.getMessage('encoding', ERR.IsString))
    @IsNotEmpty(ErrUtil.getMessage('encoding', ERR.IsNotEmpty))
    @Column()
    encoding: string;

    @IsString(ErrUtil.getMessage('size', ERR.IsString))
    @IsNotEmpty(ErrUtil.getMessage('size', ERR.IsNotEmpty))
    @Column()
    size: string;

    @IsNumber({}, ErrUtil.getMessage('duration', ERR.IsNumber))
    @IsPositive(ErrUtil.getMessage('duration', ERR.IsPositive))
    @Column({
        comment: 'length of voice - minute',
        type: 'double'
    })
    duration: number;

    @IsString(ErrUtil.getMessage('mimeType', ERR.IsString))
    @IsNotEmpty(ErrUtil.getMessage('mimeType', ERR.IsNotEmpty))
    @Column()
    mimeType;

    @IsOptional()
    @IsString(ErrUtil.getMessage('audioFileUrl', ERR.IsString))
    @Column()
    audioFileUrl: string;

    @IsString(ErrUtil.getMessage('status', ERR.IsString))
    @IsNotEmpty(ErrUtil.getMessage('status', ERR.IsNotEmpty))
    @IsIn([
        CONSTANTS.STATUS.PENDING,
        CONSTANTS.STATUS.SUCCESS,
        CONSTANTS.STATUS.FAILURE,
    ])
    @Column()
    status: string;
}
