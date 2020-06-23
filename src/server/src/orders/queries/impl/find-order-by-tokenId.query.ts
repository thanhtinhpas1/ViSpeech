import { IsNotEmpty, IsString } from 'class-validator';

export class FindOrderByTokenIdQuery {
    constructor(tokenId: string) {
        this.tokenId = tokenId;
    }

    @IsNotEmpty()
    @IsString()
    tokenId: string;
}
