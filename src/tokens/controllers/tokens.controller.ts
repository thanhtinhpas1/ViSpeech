import {
  Controller,
  Get,
  Post,
  Param,
  Body,
  Delete,
  Put,
  Query
} from "@nestjs/common";
import { ApiTags, ApiResponse, ApiOperation } from "@nestjs/swagger";
import { TokenIdRequestParamsDto } from "../dtos/tokens.dto";
import { TokenDto } from "../dtos/tokens.dto";
import { TokensService } from "../services/tokens.service";
import { GetTokensQuery } from 'tokens/queries/impl/get-tokens.query';
import { FindTokenQuery } from 'tokens/queries/impl/find-token.query';

@Controller("tokens")
@ApiTags("Tokens")
export class TokensController {
  constructor(private readonly tokensService: TokensService) {}

  /* Create Token */
  /*--------------------------------------------*/
  @ApiOperation({ tags: ["Create Token"] })
  @ApiResponse({ status: 200, description: "Create Token." })
  @Post()
  async createToken(@Body() tokenDto: TokenDto): Promise<TokenDto> {
    return this.tokensService.createToken(tokenDto);
  }

  /* Update Token */
  /*--------------------------------------------*/
  @ApiOperation({ tags: ["Update Token"] })
  @ApiResponse({ status: 200, description: "Update Token." })
  @Put(":tokenId")
  async updateToken(
    @Param() tokenId: TokenIdRequestParamsDto,
    @Body() tokenDto: TokenDto
  ) {
    console.log("controller token id", tokenId)
    return this.tokensService.updateToken({
      _id: tokenId.tokenId,
      ...tokenDto
    });
  }

  /* Delete Token */
  /*--------------------------------------------*/
  @ApiOperation({ tags: ["Delete Token"] })
  @ApiResponse({ status: 200, description: "Delete Token." })
  @Delete(":tokenId")
  async deleteToken(@Param() tokenId: TokenIdRequestParamsDto) {
    return this.tokensService.deleteToken(tokenId);
  }

  /* List Tokens */
  /*--------------------------------------------*/
  @ApiOperation({ tags: ['List Tokens'] })
  @ApiResponse({ status: 200, description: 'List Tokens.' })
  @Get()
  async findTokens(@Query() getTokensQuery: GetTokensQuery) {
    return this.tokensService.findTokens(getTokensQuery);
  }

  /* Find Token */
  /*--------------------------------------------*/
  @ApiOperation({ tags: ['Get Token'] })
  @ApiResponse({ status: 200, description: 'Get Token.' })
  @Get(':_id')
  async findOneToken(@Param() findTokenQuery: FindTokenQuery) {
    return this.tokensService.findOne(findTokenQuery);
  }
}
