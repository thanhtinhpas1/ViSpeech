import { Injectable, Logger } from '@nestjs/common';
import { Cron, CronExpression } from '@nestjs/schedule';
import { InjectRepository } from '@nestjs/typeorm';
import { CONSTANTS } from 'common/constant';
import { ReportDto } from 'reports/dtos/reports.dto';
import { RequestDto } from 'requests/dtos/requests.dto';
import { PreviousRunStatus, TaskDto } from 'tasks/dto/task.dto';
import { TokenDto } from 'tokens/dtos/tokens.dto';
import { getMongoRepository, Repository } from 'typeorm';
import { CronUtils } from 'utils/cron.util';
import { ReportUtils } from '../../utils/report.util';

@Injectable()
export class ConstTaskService {
    constructor(
        @InjectRepository(ReportDto)
        private readonly reportRepository: Repository<ReportDto>,
        @InjectRepository(TaskDto)
        private readonly taskRepository: Repository<TaskDto>,
        @InjectRepository(TokenDto)
        private readonly tokenRepository: Repository<TokenDto>,
        @InjectRepository(RequestDto)
        private readonly requestRepository: Repository<RequestDto>,
    ) {
    }

    private readonly logger = new Logger(ConstTaskService.name);

    /* TASK REFRESH TOKEN FREE FOR USER EACH DAY */
    @Cron(CronExpression.EVERY_DAY_AT_MIDNIGHT, {
        name: CONSTANTS.TASK.REFRESH_TOKEN,
    })
    async taskRefreshTokenPerDay() {
        try {
            const freeTokens = await this.tokenRepository.find({ tokenType: CONSTANTS.TOKEN_TYPE.FREE });
            for (const token of freeTokens) {
                token.usedMinutes = 0;
                this.tokenRepository.update({_id: token._id}, {usedMinutes: Number(token.usedMinutes)});
                this.logger.log(`Refresh free token's usedMinutes ${token._id}`);
            }
        } catch (error) {
            this.logger.error('Something went wrong when refresh free token per day', error.message, 'ConstTaskService');
            const taskDto = this.generateTaskDto(CONSTANTS.TASK.REFRESH_TOKEN, PreviousRunStatus.FAILURE, CronExpression.EVERY_DAY_AT_MIDNIGHT,
                error.message);
            this.taskRepository.save(taskDto);
        }
    }

    /* TASK GENERATE REPORT FOR DAY */
    @Cron(CronExpression.EVERY_DAY_AT_MIDNIGHT, {
        name: CONSTANTS.TASK.REPORT_DATE,
    })
    async taskGenerateReportForDay() {
        const taskType = CONSTANTS.TASK.REPORT_DATE;
        const timeType = CONSTANTS.TIME_TYPE.DATE;
        const cronTime = CronExpression.EVERY_DAY_AT_MIDNIGHT;

        try {
            const currentDate = new Date();
            const previousDate = CronUtils.previousDateOfCron(cronTime, currentDate);
            this.logger.log(`Generate report day from ${previousDate} to ${currentDate}`, taskType);
            const aggregateMatchDates = CronUtils.aggregateMatchDates(previousDate, currentDate);

            this.generateReports(aggregateMatchDates, timeType, taskType);

            const taskDto = this.generateTaskDto(taskType, PreviousRunStatus.SUCCESS, cronTime, '');
            this.taskRepository.save(taskDto);
        } catch (error) {
            this.logger.error('Something went wrong when generating report day', error.message, 'ConstTaskService');
            const taskDto = this.generateTaskDto(taskType, PreviousRunStatus.FAILURE, cronTime, error.message);
            this.taskRepository.save(taskDto);
        }
    }

    /* TASK GENERATE REPORT FOR EVERY WEEK */
    @Cron(CronExpression.EVERY_WEEK, {
        name: CONSTANTS.TASK.REPORT_WEEK,
    })
    async taskGenerateReportForWeek() {
        const taskType = CONSTANTS.TASK.REPORT_WEEK;
        const timeType = CONSTANTS.TIME_TYPE.WEEK;
        const cronTime = CronExpression.EVERY_WEEK;

        try {
            const currentDate = new Date();
            const previousDate = CronUtils.previousDateOfCron(cronTime, currentDate);
            this.logger.log(`Generate report week from ${previousDate} to ${currentDate}`, taskType);
            const aggregateMatchDates = CronUtils.aggregateMatchDates(previousDate, currentDate);

            this.generateReports(aggregateMatchDates, timeType, taskType);

            const taskDto = this.generateTaskDto(taskType, PreviousRunStatus.SUCCESS, cronTime, '');
            this.taskRepository.save(taskDto);
        } catch (error) {
            this.logger.error('Something went wrong when generating report week', error.message, 'ConstTaskService');
            const taskDto = this.generateTaskDto(taskType, PreviousRunStatus.FAILURE, cronTime, error.message);
            this.taskRepository.save(taskDto);
        }
    }

    /* TASK GENERATE REPORT FOR MONTH */
    @Cron(CronExpression.EVERY_1ST_DAY_OF_MONTH_AT_MIDNIGHT, {
        name: CONSTANTS.TASK.REPORT_MONTH,
    })
    async taskGenerateReportForMonth() {
        const taskType = CONSTANTS.TASK.REPORT_MONTH;
        const timeType = CONSTANTS.TIME_TYPE.MONTH;
        const cronTime = CronExpression.EVERY_1ST_DAY_OF_MONTH_AT_MIDNIGHT;

        try {
            const currentDate = new Date();
            const previousDate = CronUtils.previousDateOfCron(cronTime, currentDate);
            this.logger.log(`Generate report month from ${previousDate} to ${currentDate}`, taskType);
            const aggregateMatchDates = CronUtils.aggregateMatchDates(previousDate, currentDate);

            this.generateReports(aggregateMatchDates, timeType, taskType);

            const taskDto = this.generateTaskDto(taskType, PreviousRunStatus.SUCCESS, cronTime, '');
            this.taskRepository.save(taskDto);
        } catch (error) {
            this.logger.error('Something went wrong when generating report month', error.message, 'ConstTaskService');
            const taskDto = this.generateTaskDto(taskType, PreviousRunStatus.FAILURE, cronTime, error.message);
            this.taskRepository.save(taskDto);
        }
    }

    /* TASK GENERATE REPORT FOR EVERY QUARTER */
    @Cron(CronExpression.EVERY_QUARTER, {
        name: CONSTANTS.TASK.REPORT_QUARTER,
    })
    async taskGenerateReportForQuarter() {
        const taskType = CONSTANTS.TASK.REPORT_QUARTER;
        const timeType = CONSTANTS.TIME_TYPE.QUARTER;
        const cronTime = CronExpression.EVERY_QUARTER;

        try {
            const currentDate = new Date();
            const previousDate = CronUtils.previousDateOfCron(cronTime, currentDate);
            this.logger.log(`Generate report quarter from ${previousDate} to ${currentDate}`, taskType);
            const aggregateMatchDates = CronUtils.aggregateMatchDates(previousDate, currentDate);

            this.generateReports(aggregateMatchDates, timeType, taskType);

            const taskDto = this.generateTaskDto(taskType, PreviousRunStatus.SUCCESS, cronTime, '');
            this.taskRepository.save(taskDto);
        } catch (error) {
            this.logger.error('Something went wrong when generating report quarter', error.message, 'ConstTaskService');
            const taskDto = this.generateTaskDto(taskType, PreviousRunStatus.FAILURE, cronTime, error.message);
            this.taskRepository.save(taskDto);
        }
    }

    /* TASK GENERATE REPORT FOR EVERY YEAR */
    @Cron(CronExpression.EVERY_YEAR, {
        name: CONSTANTS.TASK.REPORT_YEAR,
    })
    async taskGenerateReportForYear() {
        const taskType = CONSTANTS.TASK.REPORT_YEAR;
        const timeType = CONSTANTS.TIME_TYPE.YEAR;
        const cronTime = CronExpression.EVERY_YEAR;

        try {
            const currentDate = new Date();
            const previousDate = CronUtils.previousDateOfCron(cronTime, currentDate);
            this.logger.log(`Generate report year from ${previousDate} to ${currentDate}`, taskType);
            const aggregateMatchDates = CronUtils.aggregateMatchDates(previousDate, currentDate);

            this.generateReports(aggregateMatchDates, timeType, taskType);

            const taskDto = this.generateTaskDto(taskType, PreviousRunStatus.SUCCESS, cronTime, '');
            this.taskRepository.save(taskDto);
        } catch (error) {
            this.logger.error('Something went wrong when generating report year', error.message, 'ConstTaskService');
            const taskDto = this.generateTaskDto(taskType, PreviousRunStatus.FAILURE, cronTime, error.message);
            this.taskRepository.save(taskDto);
        }
    }

    async taskGenerateReportForDayImmediately(date: number, month: number, year: number) {
        const taskType = CONSTANTS.TASK.REPORT_DATE;
        const timeType = CONSTANTS.TIME_TYPE.DATE;
        const cronTime = CronExpression.EVERY_DAY_AT_MIDNIGHT;

        try {
            const currentDate = new Date(year, month - 1, date);
            const nextDate = CronUtils.nextDateOfCron(cronTime, currentDate);
            this.logger.log(`Generate report day from ${currentDate} to ${nextDate}`, taskType);
            const aggregateMatchDates = CronUtils.aggregateMatchDates(currentDate, nextDate);

            this.generateReports(aggregateMatchDates, timeType, taskType);
        } catch (error) {
            this.logger.error('Something went wrong when generating report day', error.message, 'ConstTaskService');
        }
    }

    async taskGenerateReportForWeekImmediately(date: number, month: number, year: number) {
        const taskType = CONSTANTS.TASK.REPORT_WEEK;
        const timeType = CONSTANTS.TIME_TYPE.WEEK;
        const cronTime = CronExpression.EVERY_WEEK;

        try {
            const currentDate = new Date(year, month - 1, date);
            const currentWeek = ReportUtils.getWeek(currentDate);
            const firstDateOfWeek = ReportUtils.firstDateOfWeek(currentWeek, year);
            const nextDate = CronUtils.nextDateOfCron(cronTime, firstDateOfWeek);
            this.logger.log(`Generate report week from ${firstDateOfWeek} to ${nextDate}`, taskType);
            const aggregateMatchDates = CronUtils.aggregateMatchDates(firstDateOfWeek, nextDate);

            this.generateReports(aggregateMatchDates, timeType, taskType);
        } catch (error) {
            this.logger.error('Something went wrong when generating report week', error.message, 'ConstTaskService');
        }
    }

    async taskGenerateReportForMonthImmediately(month: number, year: number) {
        const taskType = CONSTANTS.TASK.REPORT_MONTH;
        const timeType = CONSTANTS.TIME_TYPE.MONTH;
        const cronTime = CronExpression.EVERY_1ST_DAY_OF_MONTH_AT_MIDNIGHT;

        try {
            const firstDateOfMonth = ReportUtils.firstDateOfMonth(month - 1, year);
            const nextDate = CronUtils.nextDateOfCron(cronTime, firstDateOfMonth);
            this.logger.log(`Generate report month from ${firstDateOfMonth} to ${nextDate}`, taskType);
            const aggregateMatchDates = CronUtils.aggregateMatchDates(firstDateOfMonth, nextDate);

            this.generateReports(aggregateMatchDates, timeType, taskType);
        } catch (error) {
            this.logger.error('Something went wrong when generating report month', error.message, 'ConstTaskService');
        }
    }

    async taskGenerateReportForQuarterImmediately(month: number, year: number) {
        const taskType = CONSTANTS.TASK.REPORT_QUARTER;
        const timeType = CONSTANTS.TIME_TYPE.QUARTER;
        const cronTime = CronExpression.EVERY_QUARTER;

        try {
            const currentQuarter = ReportUtils.getQuarter(month - 1);
            const firstDateOfQuarter = ReportUtils.firstDateOfQuarter(currentQuarter, year);
            const nextDate = CronUtils.nextDateOfCron(cronTime, firstDateOfQuarter);
            this.logger.log(`Generate report quarter from ${firstDateOfQuarter} to ${nextDate}`, taskType);
            const aggregateMatchDates = CronUtils.aggregateMatchDates(firstDateOfQuarter, nextDate);

            this.generateReports(aggregateMatchDates, timeType, taskType);
        } catch (error) {
            this.logger.error('Something went wrong when generating report quarter', error.message, 'ConstTaskService');
        }
    }

    async taskGenerateReportForYearImmediately(year: number) {
        const taskType = CONSTANTS.TASK.REPORT_YEAR;
        const timeType = CONSTANTS.TIME_TYPE.YEAR;
        const cronTime = CronExpression.EVERY_YEAR;

        try {
            const firstDateOfYear = ReportUtils.firstDateOfYear(year);
            const nextDate = CronUtils.nextDateOfCron(cronTime, firstDateOfYear);
            this.logger.log(`Generate report year from ${firstDateOfYear} to ${nextDate}`, taskType);
            const aggregateMatchDates = CronUtils.aggregateMatchDates(firstDateOfYear, nextDate);

            this.generateReports(aggregateMatchDates, timeType, taskType);
        } catch (error) {
            this.logger.error('Something went wrong when generating report year', error.message, 'ConstTaskService');
        }
    }

    generateReportsImmediately(date: number, month: number, year: number) {
        this.taskGenerateReportForDayImmediately(date, month, year);
        this.taskGenerateReportForWeekImmediately(date, month, year);
        this.taskGenerateReportForMonthImmediately(month, year);
        this.taskGenerateReportForQuarterImmediately(month, year);
        this.taskGenerateReportForYearImmediately(year);
    }

    async generateReports(aggregateMatchDates, timeType, taskType) {
        // report for userId, tokenId
        await this.createReports(CONSTANTS.STATISTICS_TYPE.TOKEN, aggregateMatchDates, timeType, taskType);

        // report for userId, projectId
        await this.createReports(CONSTANTS.STATISTICS_TYPE.PROJECT, aggregateMatchDates, timeType, taskType);

        // report for userId, tokenTypeId
        await this.createReports(CONSTANTS.STATISTICS_TYPE.USER_TOKEN_TYPE, aggregateMatchDates, timeType, taskType);

        // report for userId
        await this.createReportsForAdmin(CONSTANTS.STATISTICS_TYPE.USER, aggregateMatchDates, timeType, taskType);

        // report for tokenTypeId
        await this.createReportsForAdmin(CONSTANTS.STATISTICS_TYPE.TOKEN_TYPE, aggregateMatchDates, timeType, taskType);
    }

    generateTaskDto(name: string, previousRunStatus: PreviousRunStatus, cron: string, errorLog?: string,): TaskDto {
        const taskDto = new TaskDto();
        taskDto.name = name;
        taskDto.errorLog = errorLog;
        taskDto.previousRun = new Date();
        taskDto.cron = cron;
        taskDto.nextRun = CronUtils.nextDateOfCron(cron);
        taskDto.previousRunStatus = previousRunStatus;
        return taskDto;
    }

    async deleteRelatedReports(aggregateMatchDates, timeType, reportType) {
        await this.reportRepository.delete({ createdDate: aggregateMatchDates.$match.created_date, timeType, reportType });
    }

    // report for users and tokenTypes
    async createReportsForAdmin(reportType: string, aggregateMatchDates, timeType: string, taskType: string) {
        if (![CONSTANTS.STATISTICS_TYPE.USER, CONSTANTS.STATISTICS_TYPE.TOKEN_TYPE].includes(reportType)) {
            return;
        }

        await this.deleteRelatedReports(aggregateMatchDates, timeType, reportType);

        // create reports
        const aggregateGroup = CronUtils.aggregateGroup();
        aggregateGroup.$group._id[`${reportType}Id`] = `$${reportType}Id`

        // only create report for successful requests
        aggregateMatchDates.$match.status = CONSTANTS.STATUS.SUCCESS;
        const groupedRequests = await getMongoRepository(RequestDto).aggregate([
            aggregateMatchDates,
            aggregateGroup
        ]).toArray();

        for (const request of groupedRequests) {
            const id = request._id[`${reportType}Id`];
            const reportDto = new ReportDto(request.duration, new Date(), request.totalRequests, reportType, timeType);
            reportDto.totalRequests = Number(reportDto.totalRequests);
            reportDto[`${reportType}Id`] = id;
            this.reportRepository.save(reportDto);
            this.logger.log(`Report generated for ${reportType}Id=${id}`, `${taskType} AdminReportType=${reportType}`);
        }
    }

    async createReports(reportType: string, aggregateMatchDates, timeType: string, taskType: string) {
        await this.deleteRelatedReports(aggregateMatchDates, timeType, reportType);

        // create reports
        const aggregateGroup = CronUtils.aggregateGroup();
        aggregateGroup.$group._id[`userId`] = `$userId`
        aggregateGroup.$group._id[`${reportType}Id`] = `$${reportType}Id`

        // only create report for successful requests
        aggregateMatchDates.$match.status = CONSTANTS.STATUS.SUCCESS;
        const groupedRequests = await getMongoRepository(RequestDto).aggregate([
            aggregateMatchDates,
            aggregateGroup
        ]).toArray();

        for (const request of groupedRequests) {
            const userId = request._id[`userId`];
            const id = request._id[`${reportType}Id`];
            const reportDto = new ReportDto(request.duration, new Date(), request.totalRequests, reportType, timeType);
            if (reportType === CONSTANTS.STATISTICS_TYPE.TOKEN_TYPE) {
                reportDto.reportType = CONSTANTS.STATISTICS_TYPE.USER_TOKEN_TYPE;
            }
            reportDto.totalRequests = Number(reportDto.totalRequests);
            reportDto.userId = userId;
            reportDto[`${reportType}Id`] = id;
            this.reportRepository.save(reportDto);
            this.logger.log(`Report generated for userId=${userId}, ${reportType}Id=${id}`, `${taskType} ReportType=${reportType}`);
        }
    }
}
