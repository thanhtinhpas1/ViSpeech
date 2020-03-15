import { Body, Controller, Delete, Get, Param, Post, Put, Query, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { CONSTANTS } from 'common/constant';
import { FindTokenQuery } from 'tokens/queries/impl/find-token.query';
import { GetTokensByUserIdQuery } from 'tokens/queries/impl/get-tokens-by-userId';
import { GetTokensQuery, GetTokenTypesQuery } from 'tokens/queries/impl/get-tokens.query';
import { Utils } from 'utils';
import { TokenDto, TokenIdRequestParamsDto } from '../dtos/tokens.dto';
import { TokensService } from '../services/tokens.service';
import { Roles } from 'auth/roles.decorator';
import { TokenGuard } from 'auth/guards/token.guard';

@Controller('tokens')
@ApiTags('Tokens')
@UseGuards(AuthGuard(CONSTANTS.AUTH_JWT), TokenGuard)
export class TokensController {
  constructor(private readonly tokensService: TokensService) { }

  /*--------------------------------------------*/
  @ApiOperation({ tags: ['Create Token'] })
  @ApiResponse({ status: 200, description: 'Create Token.' })
  // TODO: Guard to check maked payment
  @Post()
  async createToken(@Body() tokenDto: TokenDto): Promise<TokenDto> {
    const transactionId = Utils.getUuid();
    return this.tokensService.createToken(transactionId, tokenDto);
  }

  /* Update Token */
  /*--------------------------------------------*/
  // TODO: check business flow update -> upgrade type token insteed change value
  // TODO: make flow to regenerate token value
  @ApiOperation({ tags: ['Update Token'] })
  @ApiResponse({ status: 200, description: 'Update Token.' })
  @Put(':_id')
  async updateToken(
    @Param() tokenIdDto: TokenIdRequestParamsDto,
    @Body() tokenDto: TokenDto,
  ) {
    return this.tokensService.updateToken({
      ...tokenDto,
      _id: tokenIdDto._id,
    });
  }

  /* Delete Token */
  /*--------------------------------------------*/
  @ApiOperation({ tags: ['Delete Token'] })
  @ApiResponse({ status: 200, description: 'Delete Token.' })
  @Roles([CONSTANTS.ROLE.ADMIN, CONSTANTS.ROLE.MANAGER_USER])
  @Delete(':_id')
  async deleteToken(@Param() tokenIdDto: TokenIdRequestParamsDto) {
    const transactionId = Utils.getUuid();
    return this.tokensService.deleteToken(transactionId, tokenIdDto);
  }

  /* List Tokens */

  /*--------------------------------------------*/
  @ApiOperation({ tags: ['List Tokens'] })
  @ApiResponse({ status: 200, description: 'List Tokens.' })
  @Roles([CONSTANTS.ROLE.ADMIN])
  @Get()
  async findTokens(@Query() getTokensQuery: GetTokensQuery) {
    return this.tokensService.findTokens(getTokensQuery);
  }

  /* List Tokens By UserId */

  /*--------------------------------------------*/
  @ApiOperation({ tags: ['List Tokens By UserId'] })
  @ApiResponse({ status: 200, description: 'List Tokens By UserId.' })
  @Get('/userId')
  async getTokensByUserId(
    @Query() getTokensByUserIdQuery: GetTokensByUserIdQuery,
  ) {
    return this.tokensService.getTokensByUserId(getTokensByUserIdQuery);
  }

  /* Find Token */

  /*--------------------------------------------*/
  // TODO: check permission find token belong to user
  @ApiOperation({ tags: ['Find Token'] })
  @ApiResponse({ status: 200, description: 'Find Token.' })
  @Get(':id')
  async findOneToken(@Param() findTokenQuery: FindTokenQuery) {
    return this.tokensService.findOne(findTokenQuery);
  }

  /* List Token Types */
  /*--------------------------------------------*/
  @ApiOperation({ tags: ['List Token Types'] })
  @ApiResponse({ status: 200, description: 'List Token Types.' })
  @Get('/token-types')
  async getTokenTypes(@Query() getTokenTypesQuery: GetTokenTypesQuery) {
    return this.tokensService.findTokenTypes(getTokenTypesQuery);
  }
}
