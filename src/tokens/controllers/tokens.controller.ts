import {Body, Controller, Delete, Get, Param, Post, Put, Query} from '@nestjs/common';
import {ApiOperation, ApiResponse, ApiTags} from '@nestjs/swagger';
import {TokenDto, TokenIdRequestParamsDto} from '../dtos/tokens.dto';
import {TokensService} from '../services/tokens.service';
import {GetTokensQuery} from 'tokens/queries/impl/get-tokens.query';
import {GetTokensByUserIdQuery} from 'tokens/queries/impl/get-tokens-by-userId';
import {FindTokenQuery} from 'tokens/queries/impl/find-token.query';
import {ObjectID} from 'typeorm';

@Controller('tokens')
@ApiTags('Tokens')
export class TokensController {
    constructor(private readonly tokensService: TokensService) {
    }

    /* Create Token */

    /*--------------------------------------------*/
    @ApiOperation({tags: ['Create Token']})
    @ApiResponse({status: 200, description: 'Create Token.'})
    @Post()
    async createToken(@Body() tokenDto: TokenDto): Promise<TokenDto> {
        return this.tokensService.createToken(tokenDto);
    }

    /* Update Token */

    /*--------------------------------------------*/
    @ApiOperation({tags: ['Update Token']})
    @ApiResponse({status: 200, description: 'Update Token.'})
    @Put(':id')
    async updateToken(
        @Param() tokenIdDto: TokenIdRequestParamsDto,
        @Body() tokenDto: TokenDto,
    ) {
        return this.tokensService.updateToken({
            ...tokenDto,
            _id: ObjectID.createFromHexString(tokenIdDto.id),
        });
    }

    /* Delete Token */

    /*--------------------------------------------*/
    @ApiOperation({tags: ['Delete Token']})
    @ApiResponse({status: 200, description: 'Delete Token.'})
    @Delete(':id')
    async deleteToken(@Param() tokenIdDto: TokenIdRequestParamsDto) {
        return this.tokensService.deleteToken(tokenIdDto);
    }

    /* List Tokens */

    /*--------------------------------------------*/
    @ApiOperation({tags: ['List Tokens']})
    @ApiResponse({status: 200, description: 'List Tokens.'})
    @Get()
    async findTokens(@Query() getTokensQuery: GetTokensQuery) {
        return this.tokensService.findTokens(getTokensQuery);
    }

    /* List Tokens By UserId */

    /*--------------------------------------------*/
    @ApiOperation({tags: ['List Tokens By UserId']})
    @ApiResponse({status: 200, description: 'List Tokens By UserId.'})
    @Get('/userId')
    async getTokensByUserId(@Query() getTokensByUserIdQuery: GetTokensByUserIdQuery) {
        return this.tokensService.getTokensByUserId(getTokensByUserIdQuery);
    }

    /* Find Token */

    /*--------------------------------------------*/
    @ApiOperation({tags: ['Get Token']})
    @ApiResponse({status: 200, description: 'Get Token.'})
    @Get(':id')
    async findOneToken(@Param() findTokenQuery: FindTokenQuery) {
        return this.tokensService.findOne(findTokenQuery);
    }
}
