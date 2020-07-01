import parser from 'cron-parser';
import { Logger } from '@nestjs/common';

export const CronUtils = {
    previousDateOfCron(cron: string, currentDate?: Date): Date {
        if (!currentDate) currentDate = new Date();
        const options = {
            currentDate,
            tz: 'Asia/Ho_Chi_Minh'
        }
        try {
            const interval = parser.parseExpression(cron, options);
            return new Date(interval.prev().toString());
        } catch (err) {
            Logger.error('Something went wrong when parse cron', err);
            return null;
        }
    },
    nextDateOfCron(cron: string, currentDate?: Date): Date {
        if (!currentDate) currentDate = new Date();
        const options = {
            currentDate,
            tz: 'Asia/Ho_Chi_Minh'
        }
        try {
            const interval = parser.parseExpression(cron, options);
            return new Date(interval.next().toString());
        } catch (err) {
            Logger.error('Something went wrong when parse cron', err);
            return null;
        }
    },
    aggregateGroup: () => {
        return {
            $group: {
                _id: {},
                duration: {$sum: '$duration'},
                totalRequests: {$sum: 1}
            }
        }
    },
    aggregateMatchDates: (startDate, endDate) => {
        return {
            $match: {
                created_date: {
                    $gte: startDate,
                    $lt: endDate
                }
            }
        }
    }
}
