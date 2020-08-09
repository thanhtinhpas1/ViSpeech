import { GetReportsHandler } from './get-reports.handler';
import { FindReportHandler } from './find-report.handler';
import { GetStatisticsByIdHandler } from './get-statistics-by-id.handler';
import { GetStatisticsByTokenTypeIdAndUserIdHandler } from './get-statistics-by-tokenTypeId-userId.handler';
import { GetAdminTotalStatisticsHandler } from './get-admin-total-statistics.handler';
import { GetUserTotalStatisticsHandler } from './get-user-total-statistics.handler';
import { GetTotalStatisticsHandler } from './get-total-statistics.handler';
import { GetTotalStatisticsForAssignersHandler } from './get-total-statistics-for-assigners.handler';
import { GetStatisticsForAssignersHandler } from './get-statistics-for-assigners.handler';

export const QueryHandlers = [
    GetReportsHandler,
    FindReportHandler,
    GetStatisticsByIdHandler,
    GetStatisticsByTokenTypeIdAndUserIdHandler,
    GetStatisticsForAssignersHandler,
    GetAdminTotalStatisticsHandler,
    GetUserTotalStatisticsHandler,
    GetTotalStatisticsForAssignersHandler,
    GetTotalStatisticsHandler
];
