import { Body, Controller, Delete, Get, Param, Post, Put, Query, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { TokenGuard, TokenQueryGuard } from 'auth/guards/token.guard';
import { Roles } from 'auth/roles.decorator';
import { CONSTANTS } from 'common/constant';
import { FindFreeTokenQuery } from 'tokens/queries/impl/find-free-token.query';
import { FindTokenQuery } from 'tokens/queries/impl/find-token.query';
import { GetTokensByUserIdQuery } from 'tokens/queries/impl/get-tokens-by-userId';
import { GetTokensByUserIdAndProjectIdQuery } from 'tokens/queries/impl/get-tokens-by-userId-projectId';
import { GetTokensQuery, GetTokenTypesQuery } from 'tokens/queries/impl/get-tokens.query';
import { TokenDto, TokenIdRequestParamsDto } from '../dtos/tokens.dto';
import { TokensService } from '../services/tokens.service';

@Controller('tokens')
@ApiTags('Tokens')
export class TokensController {
    constructor(
        private readonly tokensService: TokensService,
    ) {
    }

    /* Create Token */

    /*--------------------------------------------*/
    @ApiOperation({ tags: ['Create Token'] })
    @ApiResponse({ status: 200, description: 'Create Token.' })
    @UseGuards(AuthGuard(CONSTANTS.AUTH_JWT), TokenGuard)
    @Roles([CONSTANTS.ROLE.ADMIN])
    @Post()
    async createToken(@Body() tokenDto: TokenDto): Promise<TokenDto> {
        const streamId = tokenDto._id;
        return this.tokensService.createToken(streamId, tokenDto);
    }

    /* Update Token */

    /*--------------------------------------------*/
    @ApiOperation({ tags: ['Update Token'] })
    @ApiResponse({ status: 200, description: 'Update Token.' })
    @UseGuards(AuthGuard(CONSTANTS.AUTH_JWT), TokenGuard)
    @Roles([CONSTANTS.ROLE.ADMIN])
    @Put(':_id')
    async updateToken(
        @Param() tokenIdDto: TokenIdRequestParamsDto,
        @Body() tokenDto: TokenDto,
    ) {
        const streamId = tokenIdDto._id;
        return this.tokensService.updateToken(streamId, {
            ...tokenDto,
            _id: tokenIdDto._id,
        });
    }

    /* Delete Token */

    /*--------------------------------------------*/
    @ApiOperation({ tags: ['Delete Token'] })
    @ApiResponse({ status: 200, description: 'Delete Token.' })
    @UseGuards(AuthGuard(CONSTANTS.AUTH_JWT), TokenGuard)
    @Roles([CONSTANTS.ROLE.ADMIN, CONSTANTS.ROLE.MANAGER_USER])
    @Delete(':_id')
    async deleteToken(@Param() tokenIdDto: TokenIdRequestParamsDto) {
        const streamId = tokenIdDto._id;
        return this.tokensService.deleteToken(streamId, tokenIdDto);
    }

    /* List Tokens */

    /*--------------------------------------------*/
    @ApiOperation({ tags: ['List Tokens'] })
    @ApiResponse({ status: 200, description: 'List Tokens.' })
    @UseGuards(AuthGuard(CONSTANTS.AUTH_JWT), TokenQueryGuard)
    @Roles([CONSTANTS.ROLE.ADMIN])
    @Get()
    async getTokens(@Query() getTokensQuery: GetTokensQuery) {
        return this.tokensService.getTokens(getTokensQuery);
    }

    /* List Tokens By UserId */

    /*--------------------------------------------*/
    @ApiOperation({ tags: ['List Tokens By UserId'] })
    @ApiResponse({ status: 200, description: 'List Tokens By UserId.' })
    @UseGuards(AuthGuard(CONSTANTS.AUTH_JWT), TokenQueryGuard)
    @Get('/user-tokens')
    async getTokensByUserId(
        @Query() getTokensByUserIdQuery: GetTokensByUserIdQuery,
    ) {
        return this.tokensService.getTokensByUserId(getTokensByUserIdQuery);
    }

    /* List Tokens By UserId And ProjectId */

    /*--------------------------------------------*/
    @ApiOperation({ tags: ['List Tokens By UserId And ProjectId'] })
    @ApiResponse({ status: 200, description: 'List Tokens By UserId And ProjectId.' })
    @UseGuards(AuthGuard(CONSTANTS.AUTH_JWT), TokenQueryGuard)
    @Get('/project-tokens')
    async getTokensByUserIdAndProjectId(
        @Query() getTokensByUserIdAndProjectIdQuery: GetTokensByUserIdAndProjectIdQuery,
    ) {
        return this.tokensService.getTokensByUserIdAndProjectId(getTokensByUserIdAndProjectIdQuery);
    }

    /* List Token Types */

    /*--------------------------------------------*/
    @ApiOperation({ tags: ['List Token Types'] })
    @ApiResponse({ status: 200, description: 'List Token Types.' })
    @Get('/token-types')
    async getTokenTypes(@Query() getTokenTypesQuery: GetTokenTypesQuery) {
        return this.tokensService.findTokenTypes(getTokenTypesQuery);
    }

    /* Find Free Token */

    /*--------------------------------------------*/
    @ApiOperation({ tags: ['Find Free Token'] })
    @ApiResponse({ status: 200, description: 'Find Free Token.' })
    @UseGuards(AuthGuard(CONSTANTS.AUTH_JWT), TokenQueryGuard)
    @Get('/free-token/:userId')
    async findFreeToken(@Param() findFreeTokenQuery: FindFreeTokenQuery) {
        return this.tokensService.findFreeToken(findFreeTokenQuery);
    }

    /* Total Tokens */

    /*--------------------------------------------*/
    @ApiOperation({ tags: ['Total Tokens'] })
    @ApiResponse({ status: 200, description: 'Total Tokens.' })
    @UseGuards(AuthGuard(CONSTANTS.AUTH_JWT))
    @Roles([CONSTANTS.ROLE.ADMIN])
    @Get('/total')
    async getTotal(@Query() getTokensQuery: GetTokensQuery): Promise<number> {
        return await this.tokensService.getTotalTokens(getTokensQuery);
    }

    /* Find Token */

    /*--------------------------------------------*/
    @ApiOperation({ tags: ['Find Token'] })
    @ApiResponse({ status: 200, description: 'Find Token.' })
    @UseGuards(AuthGuard(CONSTANTS.AUTH_JWT), TokenQueryGuard)
    @Get(':id')
    async findOneToken(@Param() findTokenQuery: FindTokenQuery) {
        return this.tokensService.findOne(findTokenQuery);
    }
}
