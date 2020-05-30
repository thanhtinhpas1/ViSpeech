import { BaseEntityDto } from 'base/base-entity.dto';
import { IsEnum, IsNotEmpty, IsNumber, IsOptional, IsPositive, IsString, IsUUID } from 'class-validator';
import { Column, Entity } from 'typeorm';
import { ErrUtil } from "../../utils/err.util";
import { ERR } from "../../common/error";

export class FindRequestsParam {
    constructor(projectId: string) {
        this.projectId = projectId;
    }

    @IsOptional()
    @IsUUID('all', ErrUtil.getMessage('projectId', ERR.IsUUID))
    @IsString(ErrUtil.getMessage('projectId', ERR.IsString))
    projectId: string;
}

export class RequestBody {
    @IsOptional()
    @IsString(ErrUtil.getMessage('urlDownload', ERR.IsString))
    urlDownload: string;
}

@Entity('requests')
export class RequestDto extends BaseEntityDto {

    constructor(tokenId: string, projectId: string, fileName: string, encoding: string, size: string,
                duration: number, mimeType: string, downloadUrl?: string) {
        super();
        this.tokenId = tokenId;
        this.fileName = fileName;
        this.encoding = encoding;
        this.size = size;
        this.projectId = projectId;
        this.duration = duration;
        this.mimeType = mimeType;
        this.downloadUrl = downloadUrl;
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
    @IsString(ErrUtil.getMessage('downloadUrl', ERR.IsString))
    @Column()
    downloadUrl: string;
}
