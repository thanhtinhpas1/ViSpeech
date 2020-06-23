import { GetReportsHandler } from './get-reports.handler';
import { FindReportHandler } from './find-report.handler';
import { GetStatisticsByIdHandler } from './get-statistics-by-id.handler';
import { GetStatisticsByTokenTypeIdAndUserIdHandler } from './get-statistics-by-tokenTypeId-userId.handler';
import { GetAdminTotalStatisticsHandler } from './get-admin-total-statistics.handler';
import { GetUserTotalStatisticsHandler } from './get-user-total-statistics.handler';

export const QueryHandlers = [
    GetReportsHandler,
    FindReportHandler,
    GetStatisticsByIdHandler,
    GetStatisticsByTokenTypeIdAndUserIdHandler,
    GetAdminTotalStatisticsHandler,
    GetUserTotalStatisticsHandler
];
