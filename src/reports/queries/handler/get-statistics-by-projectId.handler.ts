import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ReportDto } from 'reports/dtos/reports.dto';
import { Repository } from 'typeorm';
import { TokenDto } from 'tokens/dtos/tokens.dto';
import { GetStatisticsByProjectIdQuery } from '../impl/get-statistics-by-projectId.query';
import { StatisticalObject, StatisticalDto } from 'reports/dtos/statistics.dto';
import { Utils } from 'utils';
import { CONSTANTS } from 'common/constant';

@QueryHandler(GetStatisticsByProjectIdQuery)
export class GetStatisticsByProjectIdHandler implements IQueryHandler<GetStatisticsByProjectIdQuery> {
    constructor(
        @InjectRepository(ReportDto)
        private readonly repository: Repository<ReportDto>,
        @InjectRepository(TokenDto)
        private readonly tokenRepository: Repository<TokenDto>,
    ) {
    }

    async execute(query: GetStatisticsByProjectIdQuery): Promise<any> {
        Logger.log('Async GetStatisticsByProjectIdQuery...', 'GetStatisticsByProjectIdQuery');
        const { id, type } = query;

        try {
            let fromDate = Utils.isValidDate(query.fromDate) ? new Date(query.fromDate) : new Date();
            let toDate = Utils.isValidDate(query.toDate) ? new Date(query.toDate) : new Date();
            const weekObj = query.weekObj || new StatisticalObject(new StatisticalDto(1, 2020), new StatisticalDto(10, 2020));
            const monthObj = query.monthObj || new StatisticalObject(new StatisticalDto(0, 2020), new StatisticalDto(11, 2020));
            const quarterObj = query.quarterObj || new StatisticalObject(new StatisticalDto(1, 2020), new StatisticalDto(10, 2020));
            const fromYear = query.fromYear;
            const toYear = query.toYear;

            const data = prepareData(type, fromDate, toDate, weekObj, monthObj, quarterObj, fromYear, toYear)
            const reports = await this.repository.find({ projectId: id });
            for (const report of reports) {
                //
            }
        } catch (error) {
            Logger.error(error, '', 'GetStatisticsByProjectIdQuery');
        }
    }
}

const prepareData = (type, fromDate, toDate, weekObj, monthObj, quarterObj, fromYear, toYear) => {
    let data = [];
    if (type === CONSTANTS.STATISTICS_TYPE.DATE) {
        fromDate = Utils.getOnlyDate(fromDate);
        toDate = Utils.getOnlyDate(toDate)
        data = Utils.getDates(fromDate, toDate);
    } else if (type === CONSTANTS.STATISTICS_TYPE.WEEK) {
        const fromWeek = weekObj.from.data;
        const toWeek = weekObj.to.data;
        const year = weekObj.from.year;
        for (let i = fromWeek; i <= toWeek; i++) {
            data.push({ week: i, year: year, value: 0 });
        }
    } else if (type === CONSTANTS.STATISTICS_TYPE.MONTH) {
        const fromMonth = monthObj.from.data;
        const toMonth = monthObj.to.data;
        const fromYear = monthObj.from.year;
        const toYear = monthObj.to.year;
        if (fromYear !== toYear) {
            for (let i = fromMonth; i < 12; i++) {
                data.push({ month: i, year: fromYear, value: 0 });
            }
            for (let j = fromYear + 1; j < toYear; j++) {
                for (let i = 0; i < 12; i++) {
                    data.push({ month: i, year: j, value: 0 });
                }
            }
            for (let i = 0; i <= toMonth; i++) {
                data.push({ month: i, year: toYear, value: 0 });
            }
        } else {
            for (let i = fromMonth; i <= toMonth; i++) {
                data.push({ month: i, year: fromYear, value: 0 });
            }
        }
    } else if (type === CONSTANTS.STATISTICS_TYPE.QUARTER) {
        const fromQuarter = quarterObj.from.data;
        const toQuarter = quarterObj.to.data;
        const fromYear = quarterObj.from.year;
        const toYear = quarterObj.to.year;
        if (fromYear !== toYear) {
            for (let i = fromQuarter; i <= 4; i++) {
                data.push({ quarter: i, year: fromYear, value: 0 });
            }
            for (let j = fromYear + 1; j < toYear; j++) {
                for (let i = 1; i <= 4; i++) {
                    data.push({ quarter: i, year: j, value: 0 });
                }
            }
            for (let i = 1; i <= toQuarter; i++) {
                data.push({ quarter: i, year: toYear, value: 0 });
            }
        } else {
            for (let i = fromQuarter; i <= toQuarter; i++) {
                data.push({ quarter: i, year: fromYear, value: 0 });
            }
        }
    } else if (type === CONSTANTS.STATISTICS_TYPE.YEAR) {
        for (let i = fromYear; i <= toYear; i++) {
            data.push({ year: i, value: 0 });
        }
    }
    return data;
}
