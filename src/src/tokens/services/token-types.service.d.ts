import { CommandBus, QueryBus } from '@nestjs/cqrs';
import { TokenTypeDto } from 'tokens/dtos/token-types.dto';
import { Repository } from 'typeorm';
export declare class TokenTypesService {
    private readonly commandBus;
    private readonly queryBus;
    private readonly repository;
    constructor(commandBus: CommandBus, queryBus: QueryBus, repository: Repository<TokenTypeDto>);
    findByName(name: string): Promise<TokenTypeDto>;
}
