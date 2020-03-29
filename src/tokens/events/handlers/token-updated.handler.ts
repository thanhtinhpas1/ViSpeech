import {Logger, NotFoundException} from '@nestjs/common';
import {EventsHandler, IEventHandler} from '@nestjs/cqrs';
import {InjectRepository} from '@nestjs/typeorm';
import {TokenTypeDto} from 'tokens/dtos/token-types.dto';
import {TokenDto} from 'tokens/dtos/tokens.dto';
import {Repository} from 'typeorm';
import {TokenUpdatedEvent} from '../impl/token-updated.event';

@EventsHandler(TokenUpdatedEvent)
export class TokenUpdatedHandler implements IEventHandler<TokenUpdatedEvent> {
    constructor(
        @InjectRepository(TokenDto)
        private readonly repository: Repository<TokenDto>,
        @InjectRepository(TokenTypeDto)
        private readonly repositoryTokenType: Repository<TokenTypeDto>
    ) {
    }

    async handle(event: TokenUpdatedEvent) {
        Logger.log(event.tokenDto._id, 'TokenUpdatedEvent'); // write here
        const {streamId, tokenDto} = event;
        const {_id, ...tokenInfo} = tokenDto;
        // let tokenTypeDto = null;

        try {
            // if (tokenInfo.tokenTypeId) {
            //     tokenTypeDto = await this.repositoryTokenType.findOne({_id: tokenInfo.tokenTypeId});
            //     if (!tokenTypeDto) {
            //         throw new NotFoundException(`Token type with _id ${tokenInfo.tokenTypeId} does not exist.`);
            //     }
            // } else if (tokenInfo.tokenType) {
            //     tokenTypeDto = await this.repositoryTokenType.findOne({name: tokenInfo.tokenType});
            // }
            // tokenInfo.minutes = tokenTypeDto.minutes;
            const token = await this.repository.findOne({ _id });
            if (!token) {
                throw new NotFoundException(`Token with _id ${_id} does not exist.`);
            }

            // Can only update usedMinutes
            return await this.repository.update({_id}, { usedMinutes: tokenInfo.usedMinutes });
        } catch (error) {
            Logger.error(error, '', 'TokenUpdatedEvent');
        }
    }
}
