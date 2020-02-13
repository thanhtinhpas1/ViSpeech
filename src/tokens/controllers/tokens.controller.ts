import { Controller, Get, Post, Param, Body, Delete, Put } from '@nestjs/common';
import { ApiTags, ApiResponse, ApiOperation } from '@nestjs/swagger';
import { TokenIdRequestParamsDto } from '../dtos/tokens.dto';
import { TokenDto } from '../dtos/tokens.dto';
import { TokensService } from '../services/tokens.service';

@Controller('tokens')
@ApiTags('Tokens')
export class TokensController {
  constructor(private readonly tokensService: TokensService) { }

  /* Create Token */
  /*--------------------------------------------*/
  @ApiOperation({ tags: ['Create Token'] })
  @ApiResponse({ status: 200, description: 'Create Token.' })
  @Post()
  async createToken(@Body() tokenDto: TokenDto): Promise<TokenDto> {
    return this.tokensService.createToken(tokenDto);
  }

  /* Update Token */
  /*--------------------------------------------*/
  @ApiOperation({ tags: ['Update Token'] })
  @ApiResponse({ status: 200, description: 'Update Token.' })
  @Put(':tokenId')
  async updateToken(@Param() tokenId: TokenIdRequestParamsDto, @Body() tokenDto: TokenDto) {
    return this.tokensService.updateToken({ ...tokenId, ...tokenDto });
  }

  /* Delete Token */
  /*--------------------------------------------*/
  @ApiOperation({ tags: ['Delete Token'] })
  @ApiResponse({ status: 200, description: 'Delete Token.' })
  @Delete(':tokenId')
  async deleteToken(@Param() tokenId: TokenIdRequestParamsDto) {
    return this.tokensService.deleteToken(tokenId);
  }

  /* List Tokens */
  /*--------------------------------------------*/
  @ApiOperation({ tags: ['List Tokens'] })
  @ApiResponse({ status: 200, description: 'List Tokens.' })
  @Get()
  async findTokens(@Param() param) {
    return this.tokensService.findTokens();
  }

  /* TODO: Find Token */
  /*--------------------------------------------*/
  @ApiOperation({ tags: ['Get Token'] })
  @ApiResponse({ status: 200, description: 'Get Token.' })
  @Get(':tokenId')
  async findOneToken(@Param() tokenId: TokenIdRequestParamsDto) {
    return this.tokensService.findOne(tokenId);
  }
}
