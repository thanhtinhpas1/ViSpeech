import { Body, Controller, Delete, Get, Param, Post, Put, Query, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { CONSTANTS } from 'common/constant';
import { FindTokenQuery } from 'tokens/queries/impl/find-token.query';
import { GetTokensByUserIdQuery } from 'tokens/queries/impl/get-tokens-by-userId';
import { GetTokensQuery, GetTokenTypesQuery } from 'tokens/queries/impl/get-tokens.query';
import { TokenDto, TokenIdRequestParamsDto } from '../dtos/tokens.dto';
import { TokensService } from '../services/tokens.service';
import { Roles } from 'auth/roles.decorator';
import { TokenGuard, TokenQueryGuard } from 'auth/guards/token.guard';
import { GetTokensByUserIdAndProjectIdQuery } from 'tokens/queries/impl/get-tokens-by-userId-projectId';
import { FindFreeTokenQuery } from 'tokens/queries/impl/find-free-token.query';
import { AuthService } from '../../auth/auth.service';
import { OrderGuard } from '../../auth/guards/order.guard';
import { OrderDto, PaymentIntent } from '../../orders/dtos/orders.dto';

@Controller('tokens')
@ApiTags('Tokens')
export class TokensController {
    constructor(
        private readonly tokensService: TokensService,
        private readonly authService: AuthService,
    ) {
    }

    /*--------------------------------------------*/
    @ApiOperation({tags: ['Create Token']})
    @ApiResponse({status: 200, description: 'Create Token.'})
    @UseGuards(AuthGuard(CONSTANTS.AUTH_JWT), TokenGuard)
    @Roles([CONSTANTS.ROLE.ADMIN])
    @Post()
    async createToken(@Body() tokenDto: TokenDto): Promise<TokenDto> {
        const streamId = tokenDto._id;
        return this.tokensService.createToken(streamId, tokenDto);
    }

    /* Update Token */

    /*--------------------------------------------*/
    @ApiOperation({tags: ['Update Token']})
    @ApiResponse({status: 200, description: 'Update Token.'})
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
    @ApiOperation({tags: ['Delete Token']})
    @ApiResponse({status: 200, description: 'Delete Token.'})
    @UseGuards(AuthGuard(CONSTANTS.AUTH_JWT), TokenGuard)
    @Roles([CONSTANTS.ROLE.ADMIN, CONSTANTS.ROLE.MANAGER_USER])
    @Delete(':_id')
    async deleteToken(@Param() tokenIdDto: TokenIdRequestParamsDto) {
        const streamId = tokenIdDto._id;
        return this.tokensService.deleteToken(streamId, tokenIdDto);
    }

    /* List Tokens */

    /*--------------------------------------------*/
    @ApiOperation({tags: ['List Tokens']})
    @ApiResponse({status: 200, description: 'List Tokens.'})
    @UseGuards(AuthGuard(CONSTANTS.AUTH_JWT), TokenQueryGuard)
    @Roles([CONSTANTS.ROLE.ADMIN])
    @Get()
    async getTokens(@Query() getTokensQuery: GetTokensQuery) {
        return this.tokensService.getTokens(getTokensQuery);
    }

    /* List Tokens By UserId */

    /*--------------------------------------------*/
    @ApiOperation({tags: ['List Tokens By UserId']})
    @ApiResponse({status: 200, description: 'List Tokens By UserId.'})
    @UseGuards(AuthGuard(CONSTANTS.AUTH_JWT), TokenQueryGuard)
    @Get('/user-tokens')
    async getTokensByUserId(
        @Query() getTokensByUserIdQuery: GetTokensByUserIdQuery,
    ) {
        return this.tokensService.getTokensByUserId(getTokensByUserIdQuery);
    }

    /* List Tokens By UserId And ProjectId */

    /*--------------------------------------------*/
    @ApiOperation({tags: ['List Tokens By UserId And ProjectId']})
    @ApiResponse({status: 200, description: 'List Tokens By UserId And ProjectId.'})
    @UseGuards(AuthGuard(CONSTANTS.AUTH_JWT), TokenQueryGuard)
    @Get('/project-tokens')
    async getTokensByUserIdAndProjectId(
        @Query() getTokensByUserIdAndProjectIdQuery: GetTokensByUserIdAndProjectIdQuery,
    ) {
        return this.tokensService.getTokensByUserIdAndProjectId(getTokensByUserIdAndProjectIdQuery);
    }

    /* List Token Types */

    /*--------------------------------------------*/
    @ApiOperation({tags: ['List Token Types']})
    @ApiResponse({status: 200, description: 'List Token Types.'})
    @Get('/token-types')
    async getTokenTypes(@Query() getTokenTypesQuery: GetTokenTypesQuery) {
        return this.tokensService.findTokenTypes(getTokenTypesQuery);
    }

    /* Find Free Token */

    /*--------------------------------------------*/
    @ApiOperation({tags: ['Find Free Token']})
    @ApiResponse({status: 200, description: 'Find Free Token.'})
    @UseGuards(AuthGuard(CONSTANTS.AUTH_JWT), TokenQueryGuard)
    @Get('/free-token/:userId')
    async findFreeToken(@Param() findFreeTokenQuery: FindFreeTokenQuery) {
        return this.tokensService.findFreeToken(findFreeTokenQuery);
    }

    /* Find Token */

    /*--------------------------------------------*/
    @ApiOperation({tags: ['Find Token']})
    @ApiResponse({status: 200, description: 'Find Token.'})
    @UseGuards(AuthGuard(CONSTANTS.AUTH_JWT), TokenQueryGuard)
    @Get(':id')
    async findOneToken(@Param() findTokenQuery: FindTokenQuery) {
        return this.tokensService.findOne(findTokenQuery);
    }

    /* Create Upgrade Token Order */

    /*--------------------------------------------*/
    @ApiOperation({tags: ['Create Upgrade Token Order']})
    @ApiResponse({status: 200, description: 'Create Upgrade Token Order.'})
    @UseGuards(AuthGuard(CONSTANTS.AUTH_JWT), OrderGuard)
    @Post('/upgrade-token')
    async createUpgradeTokenOrder(@Body('order') orderDto: OrderDto, @Body('paymentIntent') paymentIntent: PaymentIntent): Promise<OrderDto> {
        const streamId = orderDto._id;
        return this.tokensService.createUpgradeTokenOrder(streamId, orderDto, paymentIntent);
    }
}
