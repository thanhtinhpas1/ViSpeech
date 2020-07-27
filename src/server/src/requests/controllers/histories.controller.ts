import { Body, Controller, Get, Param, Post, Put, Query, Req, Res, UseGuards } from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { AuthGuard } from '@nestjs/passport';
import { CONSTANTS } from 'common/constant';
import { Response } from 'express';
import { RequestService } from 'requests/services/request.service';
import { FindRequestsQuery } from 'requests/queries/impl/find-requests.query';
import { FindRequestsParam, UpdateRequestParamsDto } from 'requests/dtos/requests.dto';
import { Roles } from 'auth/roles.decorator';
import { AuthService } from 'auth/auth.service';
import { RequestGuard } from 'auth/guards/request.guard';
import { FindRequestsByUserIdQuery } from 'requests/queries/impl/find-requests-by-userId.query';
import { FindRequestQuery } from 'requests/queries/impl/find-request.query';

@Controller('requests')
@ApiTags('requests')
@UseGuards(AuthGuard(CONSTANTS.AUTH_JWT), RequestGuard)
export class HistoriesController {
    constructor(
        private readonly authService: AuthService,
        private readonly requestService: RequestService,
    ) {
    }

    /* List Requests */

    /*--------------------------------------------*/
    @ApiOperation({ tags: ['List Request'] })
    @ApiResponse({ status: 200, description: 'List Request.' })
    @Roles([CONSTANTS.ROLE.ADMIN])
    @Get()
    async findRequests(@Query() findRequestsQuery: FindRequestsQuery) {
        return this.requestService.findRequests(findRequestsQuery);
    }

    /* List Requests by projectId*/

    /*--------------------------------------------*/
    @ApiOperation({ tags: ['List Request by projectId'] })
    @ApiResponse({ status: 200, description: 'List Request by projectId.' })
    @Get('/projectId/:projectId')
    async findRequestsByProjectId(@Query() findRequestsQuery: FindRequestsQuery,
                                  @Param() requestsParam: FindRequestsParam, @Req() req) {
        const payload = this.authService.decode(req);
        findRequestsQuery.tokenId = payload['id'];
        findRequestsQuery.projectId = requestsParam.projectId;
        return this.requestService.findRequests(findRequestsQuery);
    }

    /* List Requests By UserId */

    /*--------------------------------------------*/
    @ApiOperation({ tags: ['List Request By UserId'] })
    @ApiResponse({ status: 200, description: 'List Request By UserId.' })
    @Get('/userId/:userId')
    async findRequestsByUserId(@Param() requestsParam: FindRequestsParam, @Query() query: FindRequestsByUserIdQuery) {
        query.userId = requestsParam.userId;
        return this.requestService.findRequestsByUserId(query);
    }

    /* Update Request TranscriptFileUrl */

    /*--------------------------------------------*/
    @ApiOperation({ tags: ['Update Request TranscriptFileUrl'] })
    @ApiResponse({ status: 200, description: 'Update Request TranscriptFileUrl.' })
    @Put('/transcriptFileUrl/:_id/:tokenId')
    async updateRequest(
        @Param() params: UpdateRequestParamsDto,
        @Body() body,
    ) {
        const { _id, tokenId } = params;
        const streamId = _id;
        return this.requestService.updateRequestTranscriptFileUrl(streamId, _id, tokenId, body.transcriptFileUrl);
    }

    /* Download Transcript */

    /*--------------------------------------------*/
    @ApiOperation({ tags: ['Download Transcript'] })
    @ApiResponse({ status: 200, description: 'Download Transcript.' })
    @Post('/download-transcript/:id')
    async downloadTranscript(@Body() body, @Param() findRequestQuery: FindRequestQuery, @Res() response: Response) {
        try {
            const converted = await this.requestService.downloadTranscript(body.html);
            response.setHeader('Content-Type', 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet');
            response.setHeader('Content-Disposition', `attachment; filename=vispeech-transcript.docx`);
            response.setHeader('Content-Length', converted.length);
            response.send(converted);
        } catch (err) {
            throw err;
        }
    }

    /* Find Request */

    /*--------------------------------------------*/
    @ApiOperation({ tags: ['Find Request'] })
    @ApiResponse({ status: 200, description: 'Find Request.' })
    @Get(':id')
    async findOne(@Param() findRequestQuery: FindRequestQuery) {
        return this.requestService.findOne(findRequestQuery);
    }
}