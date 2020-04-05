import { CONSTANTS } from '../common/constant';
import { StatisticalObject, StatisticalDto } from 'reports/dtos/statistics.dto';

export const ReportUtils = {
    isValidDate: miliseconds => {
        if (!miliseconds) {
            return false;
        }
        const date = new Date(parseInt(miliseconds));
        return !isNaN(date.getTime());
    },
    getOnlyDate: (date: Date) => {
        let formattedDate = JSON.parse(JSON.stringify(date)); // string
        formattedDate = new Date(formattedDate);
        formattedDate.setHours(0);
        formattedDate.setMinutes(0);
        formattedDate.setSeconds(0);
        formattedDate.setMilliseconds(0);
        return formattedDate;
    },
    addDays: (currentDate: Date, days: number) => {
        var date = new Date(currentDate.valueOf());
        date.setDate(date.getDate() + days);
        return date;
    },
    getDates: (fromDate: Date, toDate: Date) => {
        var dateArray = [];
        var currentDate = fromDate;
        while (currentDate <= toDate) {
            dateArray.push({ date: new Date(currentDate), value: 0 });
            currentDate = ReportUtils.addDays(currentDate, 1);
        }
        return dateArray;
    },
    getWeek: (date: Date) => {
        var firstDateOfYear = new Date(date.getFullYear(), 0, 1);
        date = ReportUtils.getOnlyDate(date);
        var dayNumberOfYear = (date.valueOf() - firstDateOfYear.valueOf() + CONSTANTS.ONE_DAY_IN_MILISECONDS) / CONSTANTS.ONE_DAY_IN_MILISECONDS;
        return Math.ceil((dayNumberOfYear + firstDateOfYear.getDay()) / 7);
    },
    getQuarter: month => {
        const firstQuarter = [0, 1, 2];
        const secondQuarter = [3, 4, 5];
        const thirdQuarter = [6, 7, 8];
        const fourthQuarter = [9, 10, 11];
        if (firstQuarter.indexOf(month) > -1) {
            return 1;
        }
        if (secondQuarter.indexOf(month) > -1) {
            return 2;
        }
        if (thirdQuarter.indexOf(month) > -1) {
            return 3;
        }
        if (fourthQuarter.indexOf(month) > -1) {
            return 4;
        }
    },
    getValidStatisticalQueryParams: query => {
        const fromDate = ReportUtils.isValidDate(query.fromDate) ? new Date(query.fromDate) : new Date();
        const toDate = ReportUtils.isValidDate(query.toDate) ? new Date(query.toDate) : new Date();
        const weekObj = query.weekObj || new StatisticalObject(new StatisticalDto(1, 2020), new StatisticalDto(10, 2020));
        const monthObj = query.monthObj || new StatisticalObject(new StatisticalDto(0, 2020), new StatisticalDto(11, 2020));
        const quarterObj = query.quarterObj || new StatisticalObject(new StatisticalDto(1, 2020), new StatisticalDto(10, 2020));
        const fromYear = query.fromYear;
        const toYear = query.toYear;
        return { fromDate, toDate, weekObj, monthObj, quarterObj, fromYear, toYear };
    },
    prepareStatisticalData: (type, fromDate, toDate, weekObj, monthObj, quarterObj, fromYear, toYear) => {
        let data = [];
        if (type === CONSTANTS.STATISTICS_TYPE.DATE) {
            fromDate = ReportUtils.getOnlyDate(fromDate);
            toDate = ReportUtils.getOnlyDate(toDate)
            data = ReportUtils.getDates(fromDate, toDate);
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
    },
    getStatisticalData: (type, data, reports) => {
        for (const report of reports) {
            let dateReport = new Date(report.dateReport);

            if (type === CONSTANTS.STATISTICS_TYPE.DATE) {
                dateReport = ReportUtils.getOnlyDate(dateReport);
                let dataIndex = data.findIndex(el => el.date.valueOf() === dateReport.valueOf());
                if (dataIndex > -1) {
                    data[dataIndex].value += report.usedMinutes;
                }
            } else if (type === CONSTANTS.STATISTICS_TYPE.WEEK) {
                let dataIndex = data.findIndex(el => el.week === ReportUtils.getWeek(dateReport) && el.year === dateReport.getFullYear());
                if (dataIndex > -1) {
                    data[dataIndex].value += report.usedMinutes;
                }
            } else if (type === CONSTANTS.STATISTICS_TYPE.MONTH) {
                let dataIndex = data.findIndex(el => el.month === dateReport.getMonth() && el.year === dateReport.getFullYear());
                if (dataIndex > -1) {
                    data[dataIndex].value += report.usedMinutes;
                }
            } else if (type === CONSTANTS.STATISTICS_TYPE.QUARTER) {
                let dataIndex = data.findIndex(el => el.quarter === ReportUtils.getQuarter(dateReport.getMonth()) && el.year === dateReport.getFullYear());
                if (dataIndex > -1) {
                    data[dataIndex].value += report.usedMinutes;
                }
            } else if (type === CONSTANTS.STATISTICS_TYPE.YEAR) {
                let dataIndex = data.findIndex(el => el.year === dateReport.getFullYear());
                if (dataIndex > -1) {
                    data[dataIndex].value += report.usedMinutes;
                }
            }
        }
        return data;
    }
};
