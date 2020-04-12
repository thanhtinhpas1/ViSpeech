import { CONSTANTS } from '../common/constant';
import { StatisticalObject, StatisticalDto } from 'reports/dtos/statistics.dto';

export const ReportUtils = {
    isValidDate: milliseconds => {
        if (!milliseconds) {
            return false;
        }
        const date = new Date(parseInt(milliseconds));
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
            currentDate = ReportUtils.getOnlyDate(ReportUtils.addDays(currentDate, 1));
        }
        return dateArray;
    },
    getLastDatesOfYear: year => {
        const lastDateOfYear = new Date(year, 11, 31);
        if (lastDateOfYear.getDay() === 6) {
            return [];
        }

        let lastDatesOfYear = [];
        let count = 0;
        while (count <= lastDateOfYear.getDay()) {
            lastDatesOfYear.push(lastDateOfYear.getDate() - count);
            count += 1;
        }
        return lastDatesOfYear;
    },
    getWeek: (date: Date) => {
        const firstDateOfYear = new Date(date.getFullYear(), 0, 1);
        const onlyDate = new Date(ReportUtils.getOnlyDate(date));
        const dayNumberOfYear = (onlyDate.valueOf() - firstDateOfYear.valueOf() + CONSTANTS.ONE_DAY_IN_MILLISECONDS) / CONSTANTS.ONE_DAY_IN_MILLISECONDS;
        return Math.ceil((dayNumberOfYear + firstDateOfYear.getDay()) / 7);
    },
    getTotalWeeksOfYear: year => {
        const lastDateOfYear = new Date(year, 11, 31)
        let lastWeekOfYear = ReportUtils.getWeek(lastDateOfYear)
        if (lastDateOfYear.getDay() !== 6) {
            lastWeekOfYear -= 1
        }
        return lastWeekOfYear
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
    getMonthOfQuarter: (quarter, isStartMonth) => {
        const firstQuarter = [0, 1, 2];
        const secondQuarter = [3, 4, 5];
        const thirdQuarter = [6, 7, 8];
        const fourthQuarter = [9, 10, 11];
        if (quarter === 1) {
            return isStartMonth ? firstQuarter[0] : firstQuarter[2];
        }
        if (quarter === 2) {
            return isStartMonth ? secondQuarter[0] : secondQuarter[2];
        }
        if (quarter === 3) {
            return isStartMonth ? thirdQuarter[0] : thirdQuarter[2];
        }
        if (quarter === 4) {
            return isStartMonth ? fourthQuarter[0] : fourthQuarter[2];
        }
    },
    getStartDate: (type, queryParams) => {
        let result = null;
        const { fromDate, weekObj, monthObj, quarterObj, fromYear } = queryParams;

        if (type === CONSTANTS.TIME_TYPE.DATE) {
            result = ReportUtils.getOnlyDate(fromDate);
        } else if (type === CONSTANTS.TIME_TYPE.WEEK) {
            const { data, year } = weekObj.from;
            const firstDateOfYear = new Date(year, 0, 1);
            result = ReportUtils.addDays(firstDateOfYear, (data - 1) * 7 - firstDateOfYear.getDay());
        } else if (type === CONSTANTS.TIME_TYPE.MONTH) {
            const { data, year } = monthObj.from;
            result = new Date(year, data, 1);
        } else if (type === CONSTANTS.TIME_TYPE.QUARTER) {
            const { data, year } = quarterObj.from;
            const month = ReportUtils.getMonthOfQuarter(data, true);
            result = new Date(year, month, 1);
        } else if (type === CONSTANTS.TIME_TYPE.YEAR) {
            result = new Date(fromYear, 0, 1);
        }
        return result;
    },
    getEndDate: (type, queryParams) => {
        let result = null;
        const { toDate, weekObj, monthObj, quarterObj, toYear } = queryParams;

        if (type === CONSTANTS.TIME_TYPE.DATE) {
            result = ReportUtils.getOnlyDate(toDate);
        } else if (type === CONSTANTS.TIME_TYPE.WEEK) {
            const { data, year } = weekObj.to;
            const firstDateOfYear = new Date(year, 0, 1);
            const firstDateOfWeek = ReportUtils.addDays(firstDateOfYear, (data - 1) * 7 - firstDateOfYear.getDay());
            result = ReportUtils.addDays(firstDateOfWeek, 6);
        } else if (type === CONSTANTS.TIME_TYPE.MONTH) {
            const { data, year } = monthObj.to;
            result = new Date(year, data + 1, 0);
        } else if (type === CONSTANTS.TIME_TYPE.QUARTER) {
            const { data, year } = quarterObj.to;
            const month = ReportUtils.getMonthOfQuarter(data, false);
            result = new Date(year, month + 1, 0);
        } else if (type === CONSTANTS.TIME_TYPE.YEAR) {
            result = new Date(toYear, 11, 31);
        }
        return result;
    },
    getValidStatisticalQueryParams: query => {
        const fromDate = ReportUtils.isValidDate(query.fromDate) ? new Date(query.fromDate) : new Date();
        const toDate = ReportUtils.isValidDate(query.toDate) ? new Date(query.toDate) : ReportUtils.addDays(fromDate, 1);
        const weekObj = query.weekObj || new StatisticalObject(new StatisticalDto(1, 2020), new StatisticalDto(10, 2020));
        const monthObj = query.monthObj || new StatisticalObject(new StatisticalDto(0, 2020), new StatisticalDto(11, 2020));
        const quarterObj = query.quarterObj || new StatisticalObject(new StatisticalDto(1, 2020), new StatisticalDto(10, 2020));
        const fromYear = query.fromYear;
        const toYear = query.toYear;
        return { fromDate, toDate, weekObj, monthObj, quarterObj, fromYear, toYear };
    },
    prepareStatisticalData: (type, queryParams) => {
        let data = [];
        const { fromDate, toDate, weekObj, monthObj, quarterObj, fromYear, toYear } = queryParams;

        if (type === CONSTANTS.TIME_TYPE.DATE) {
            let from = ReportUtils.getOnlyDate(fromDate);
            let to = ReportUtils.getOnlyDate(toDate)
            data = ReportUtils.getDates(from, to);
        } else if (type === CONSTANTS.TIME_TYPE.WEEK) {
            const fromWeek = weekObj.from.data;
            const toWeek = weekObj.to.data;
            const fromYear = weekObj.from.year;
            const toYear = weekObj.to.year;
            const totalWeekOfFromYear = ReportUtils.getTotalWeeksOfYear(fromYear);
            if (fromYear !== toYear) {
                for (let i = fromWeek; i <= totalWeekOfFromYear; i++) {
                    data.push({ week: i, year: fromYear, value: 0 });
                }
                for (let j = fromYear + 1; j < toYear; j++) {
                    const totalWeekOfYear = ReportUtils.getTotalWeeksOfYear(j);
                    for (let i = 1; i <= totalWeekOfYear; i++) {
                        data.push({ week: i, year: j, value: 0 });
                    }
                }
                for (let i = 1; i <= toWeek; i++) {
                    data.push({ week: i, year: toYear, value: 0 });
                }
            } else {
                for (let i = fromWeek; i <= toWeek; i++) {
                    data.push({ week: i, year: fromYear, value: 0 });
                }
            }
        } else if (type === CONSTANTS.TIME_TYPE.MONTH) {
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
        } else if (type === CONSTANTS.TIME_TYPE.QUARTER) {
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
        } else if (type === CONSTANTS.TIME_TYPE.YEAR) {
            for (let i = fromYear; i <= toYear; i++) {
                data.push({ year: i, value: 0 });
            }
        }
        return data;
    },
    getStatisticalData: (type, data, reports) => {
        const result = JSON.parse(JSON.stringify(data));

        for (const report of reports) {
            let dateReport = new Date(report.dateReport);

            if (type === CONSTANTS.TIME_TYPE.DATE) {
                dateReport = ReportUtils.getOnlyDate(dateReport);
                let index = result.findIndex(el => {
                    const date = new Date(el.date.valueOf());
                    return date.valueOf() === dateReport.valueOf()
                });
                if (index > -1) {
                    result[index].value += report.usedMinutes;
                }
            } else if (type === CONSTANTS.TIME_TYPE.WEEK) {
                const lastDatesOfYear = ReportUtils.getLastDatesOfYear(dateReport.getFullYear());
                let index = result.findIndex(el => el.week === ReportUtils.getWeek(dateReport) && el.year === dateReport.getFullYear());
                if (lastDatesOfYear.findIndex(date => date === dateReport.getDate()) > -1) {
                    index = result.findIndex(el => el.week === 1 && el.year === dateReport.getFullYear() + 1);
                }
                if (index > -1) {
                    result[index].value += report.usedMinutes;
                }
            } else if (type === CONSTANTS.TIME_TYPE.MONTH) {
                let index = result.findIndex(el => el.month === dateReport.getMonth() && el.year === dateReport.getFullYear());
                if (index > -1) {
                    result[index].value += report.usedMinutes;
                }
            } else if (type === CONSTANTS.TIME_TYPE.QUARTER) {
                let index = result.findIndex(el => el.quarter === ReportUtils.getQuarter(dateReport.getMonth()) && el.year === dateReport.getFullYear());
                if (index > -1) {
                    result[index].value += report.usedMinutes;
                }
            } else if (type === CONSTANTS.TIME_TYPE.YEAR) {
                let index = result.findIndex(el => el.year === dateReport.getFullYear());
                if (index > -1) {
                    result[index].value += report.usedMinutes;
                }
            }
        }

        return result;
    },
    getTotalStatisticalData: (groupedReports, data, groupKey: string) => {
        const result = JSON.parse(JSON.stringify(data));

        for (const report of groupedReports) {
            const index = data.findIndex(el => el.data._id === report._id[groupKey]);
            if (index > -1) {
                result[index].usedMinutes = report.usedMinutes;
            }
        }

        return result;
    },
    aggregateMatchDates: (startDate, endDate) => {
        return {
            $match: {
                dateReport: {
                    $gte: new Date(startDate),
                    $lte: new Date(endDate)
                }
            }
        }
    }
};
