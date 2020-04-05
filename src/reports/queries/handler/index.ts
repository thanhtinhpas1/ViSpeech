import {GetReportsHandler} from './get-reports.handler';
import {FindReportHandler} from './find-report.handler';
import { GetStatisticsByProjectIdHandler } from './get-statistics-by-projectId.handler';
import { GetStatisticsByTokenIdHandler } from './get-statistics-by-tokenId.handler';
import { GetStatisticsByTokenTypeIdAndUserIdHandler } from './get-statistics-by-tokenTypeId-userId.handler';
import { GetStatisticsByTokenTypeIdHandler } from './get-statistics-by-tokenTypeId.handler';
import { GetAdminTotalStatisticsHandler } from './get-admin-total-statistics.handler';
import { GetUserTotalStatisticsHandler } from './get-user-total-statistics.handler';

export const QueryHandlers = [
    GetReportsHandler, 
    FindReportHandler, 
    GetStatisticsByProjectIdHandler,
    GetStatisticsByTokenIdHandler,
    GetStatisticsByTokenTypeIdHandler,
    GetStatisticsByTokenTypeIdAndUserIdHandler,
    GetAdminTotalStatisticsHandler,
    GetUserTotalStatisticsHandler
];
