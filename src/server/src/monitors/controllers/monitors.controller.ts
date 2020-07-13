import { Controller, Get, Query, UseGuards } from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { AuthGuard } from '@nestjs/passport';
import { CONSTANTS } from '../../common/constant';
import { Roles } from '../../auth/roles.decorator';
import { MonitorsService } from '../services/monitors.service';
import { GetMonitorsQuery } from '../queries/impl/get-monitors.query';

@Controller('monitors')
@ApiTags('monitors')
export class MonitorsController {
    constructor(
        private readonly monitorsService: MonitorsService,
    ) {
    }

    /* List Monitors */

    /*--------------------------------------------*/
    @ApiOperation({ tags: [ 'List Monitors' ] })
    @ApiResponse({ status: 200, description: 'List Monitors.' })
    @UseGuards(AuthGuard(CONSTANTS.AUTH_JWT))
    @Roles([ CONSTANTS.ROLE.ADMIN ])
    @Get()
    async getOrders(@Query() getMonitorsQuery: GetMonitorsQuery) {
        return this.monitorsService.getMonitors(getMonitorsQuery);
    }
}
