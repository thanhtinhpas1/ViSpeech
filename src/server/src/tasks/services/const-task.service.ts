import { Injectable, Logger } from "@nestjs/common";
import { Cron, CronExpression } from "@nestjs/schedule";
import { InjectRepository } from "@nestjs/typeorm";
import { CONSTANTS } from "common/constant";
import { ReportDto } from "reports/dtos/reports.dto";
import { RequestDto } from "requests/dtos/requests.dto";
import { PreviousRunStatus, TaskDto } from "tasks/dto/task.dto";
import { TokenDto } from "tokens/dtos/tokens.dto";
import { Repository } from "typeorm";
import { Utils } from "utils";

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
            const tokens = await this.tokenRepository.find();
            for (const token of tokens) {
                if (token.tokenType === CONSTANTS.TOKEN_TYPE.FREE) {
                    // token.minutes = Number(config.TOKEN_TYPE.TYPE_FREE_MINUTES);
                    token.usedMinutes = 0;
                }
                // this.tokenRepository.save(token);
                this.tokenRepository.update({_id: token._id}, {usedMinutes: Number(token.usedMinutes)});
                this.logger.debug(`Refresh token usedMinutes ${token._id}`);
            }
        } catch (error) {
            this.logger.error('Something went wrong when refresh token per day', error.message, 'ConstTaskService');
            const taskDto = this.generateTaskDto(CONSTANTS.TASK.REFRESH_TOKEN, PreviousRunStatus.FAILURE, CronExpression.EVERY_DAY_AT_MIDNIGHT, error.message);
            this.taskRepository.save(taskDto);
        }
    }

    /* TASK GENERATE REPORT FOR DAY */
    @Cron(CronExpression.EVERY_DAY_AT_MIDNIGHT, {
        name: CONSTANTS.TASK.REPORT_DATE,
    })
    async taskGenerateReportForDay() {
        try {
            const tokens = await this.tokenRepository.find();
            for (const token of tokens) {
                const startDate = Utils.previousDateOfCron(CronExpression.EVERY_DAY_AT_MIDNIGHT, new Date());
                const endDate = new Date();
                const result = await this.requestRepository.findAndCount({
                    where: {
                        tokenId: token._id,
                        created_date: {
                            $gte: startDate,
                            $lte: endDate,
                        }
                    }
                });
                const requests = result[0];
                const total = result[1];
                var totalDuration = 0;
                for (const request of requests) {
                    totalDuration += Number(request.duration);
                }
                const reportDto = new ReportDto(totalDuration, new Date(), token._id, token.tokenTypeId, token.projectId, token.userId, total, CONSTANTS.TASK.REPORT_DATE);
                this.reportRepository.save(reportDto);
                this.logger.log(`Generated report for tokenId: ${token._id}`, 'ReportDay');
                const taskDto = this.generateTaskDto(CONSTANTS.TASK.REPORT_DATE, PreviousRunStatus.SUCCESS, CronExpression.EVERY_DAY_AT_MIDNIGHT, '');
                this.taskRepository.save(taskDto);
            }
        } catch (error) {
            this.logger.error('Something went wrong when generate report day', error.message, 'ConstTaskService');
            const taskDto = this.generateTaskDto(CONSTANTS.TASK.REPORT_DATE, PreviousRunStatus.FAILURE, CronExpression.EVERY_DAY_AT_MIDNIGHT, error.message);
            this.taskRepository.save(taskDto);
        }
    }

    /* TASK GENERATE REPORT FOR MONTH */
    @Cron(CronExpression.EVERY_1ST_DAY_OF_MONTH_AT_MIDNIGHT, {
        name: CONSTANTS.TASK.REPORT_MONTH,
    })
    async taskGenerateReportForMonth() {
        try {
            const tokens = await this.tokenRepository.find();
            for (const token of tokens) {
                const startDate = Utils.previousDateOfCron(CronExpression.EVERY_1ST_DAY_OF_MONTH_AT_MIDNIGHT, new Date());
                const endDate = new Date();
                const result = await this.requestRepository.findAndCount({
                    where: {
                        tokenId: token._id,
                        created_date: {
                            $gte: startDate,
                            $lte: endDate,
                        }
                    }
                });
                const requests = result[0];
                const total = result[1];
                var totalDuration = 0;
                for (const request of requests) {
                    totalDuration += Number(request.duration);
                }
                const reportDto = new ReportDto(totalDuration, new Date(), token._id, token.tokenTypeId, token.projectId, token.userId, total, CONSTANTS.TASK.REPORT_MONTH);
                this.reportRepository.save(reportDto);
                this.logger.log(`Generated report for tokenId: ${token._id}`, 'ReportMonth');
                const taskDto = this.generateTaskDto(CONSTANTS.TASK.REPORT_MONTH, PreviousRunStatus.SUCCESS, CronExpression.EVERY_1ST_DAY_OF_MONTH_AT_MIDNIGHT, '');
                this.taskRepository.save(taskDto);
            }
        } catch (error) {
            this.logger.error('Something went wrong when generate report month', error.message, 'ConstTaskService');
            const taskDto = this.generateTaskDto(CONSTANTS.TASK.REPORT_MONTH, PreviousRunStatus.FAILURE, CronExpression.EVERY_1ST_DAY_OF_MONTH_AT_MIDNIGHT, error.message);
            this.taskRepository.save(taskDto);
        }
    }

    /* TASK GENERATE REPORT FOR EVERY QUARTER */
    @Cron(CronExpression.EVERY_QUARTER, {
        name: CONSTANTS.TASK.REPORT_QUARTER,
    })
    async taskGenerateReportForQuarter() {
        try {
            const tokens = await this.tokenRepository.find();
            for (const token of tokens) {
                const startDate = Utils.previousDateOfCron(CronExpression.EVERY_QUARTER, new Date());
                const endDate = new Date();
                const result = await this.requestRepository.findAndCount({
                    where: {
                        tokenId: token._id,
                        created_date: {
                            $gte: startDate,
                            $lte: endDate,
                        }
                    }
                });
                const requests = result[0];
                const total = result[1];
                let totalDuration = 0;
                for (const request of requests) {
                    totalDuration += Number(request.duration);
                }
                const reportDto = new ReportDto(totalDuration, new Date(), token._id, token.tokenTypeId, token.projectId, token.userId, total, CONSTANTS.TASK.REPORT_QUARTER);
                this.reportRepository.save(reportDto);
                this.logger.log(`Generated report for tokenId: ${token._id}`, 'ReportQuarter');
                const taskDto = this.generateTaskDto(CONSTANTS.TASK.REPORT_QUARTER, PreviousRunStatus.SUCCESS, CronExpression.EVERY_QUARTER, '');
                this.taskRepository.save(taskDto);
            }
        } catch (error) {
            this.logger.error('Something went wrong when generate report quater', error.message, 'ConstTaskService');
            const taskDto = this.generateTaskDto(CONSTANTS.TASK.REPORT_QUARTER, PreviousRunStatus.FAILURE, CronExpression.EVERY_QUARTER, error.message);
            this.taskRepository.save(taskDto);
        }
    }

    /* TASK GENERATE REPORT FOR EVERY YEAR */
    @Cron(CronExpression.EVERY_YEAR, {
        name: CONSTANTS.TASK.REPORT_YEAR,
    })
    async taskGenerateReportForYear() {
        try {
            const tokens = await this.tokenRepository.find();
            for (const token of tokens) {
                const startDate = Utils.previousDateOfCron(CronExpression.EVERY_YEAR, new Date());
                const endDate = new Date();
                const result = await this.requestRepository.findAndCount({
                    where: {
                        tokenId: token._id,
                        created_date: {
                            $gte: startDate,
                            $lte: endDate,
                        }
                    }
                });
                const requests = result[0];
                const total = result[1];
                let totalDuration = 0;
                for (const request of requests) {
                    totalDuration += Number(request.duration);
                }
                const reportDto = new ReportDto(totalDuration, new Date(), token._id, token.tokenTypeId, token.projectId, token.userId, total, CONSTANTS.TASK.REPORT_YEAR);
                this.reportRepository.save(reportDto);
                this.logger.log(`Generated report for tokenId: ${token._id}`, 'ReportYear');
                const taskDto = this.generateTaskDto(CONSTANTS.TASK.REPORT_YEAR, PreviousRunStatus.SUCCESS, CronExpression.EVERY_YEAR, '');
                this.taskRepository.save(taskDto);
            }
        } catch (error) {
            this.logger.error('Something went wrong when generate report year', error.message, 'ConstTaskService');
            const taskDto = this.generateTaskDto(CONSTANTS.TASK.REPORT_YEAR, PreviousRunStatus.FAILURE, CronExpression.EVERY_YEAR, error.message);
            this.taskRepository.save(taskDto);
        }
    }

    generateTaskDto(name: string, previousRunStatus: PreviousRunStatus, cron: string, errorLog?: string,): TaskDto {
        const taskDto = new TaskDto();
        taskDto.name = name;
        taskDto.errorLog = errorLog;
        taskDto.previousRun = new Date();
        taskDto.cron = cron;
        taskDto.nextRun = Utils.nextDateOfCron(cron);
        taskDto.previousRunStatus = previousRunStatus;
        return taskDto;
    }
}

