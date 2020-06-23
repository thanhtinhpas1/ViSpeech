import { Injectable } from '@nestjs/common';
import { CommandBus, QueryBus } from '@nestjs/cqrs';
import { TokenTypeDto } from 'tokens/dtos/token-types.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class TokenTypesService {
    constructor(
        private readonly commandBus: CommandBus,
        private readonly queryBus: QueryBus,
        @InjectRepository(TokenTypeDto)
        private readonly repository: Repository<TokenTypeDto>
    ) {
    }

    async findByName(name: string) {
        return await this.repository.findOne({name});
    }
}
