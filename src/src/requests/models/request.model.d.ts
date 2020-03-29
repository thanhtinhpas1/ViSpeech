import { AggregateRoot } from '@nestjs/cqrs';
import { TokenDto } from 'tokens/dtos/tokens.dto';
export declare class RequestModel extends AggregateRoot {
    private readonly id;
    [x: string]: any;
    constructor(id: string | undefined);
    setData(data: any): void;
    createReport(streamId: string, tokenDto: TokenDto): void;
}
