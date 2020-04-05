export const CONSTANTS = {
    ROLE: {
        ADMIN: 'ADMIN',
        USER: 'USER',
        MANAGER_USER: 'MANAGER_USER',
    },
    PERMISSION: {
        CSR_USER: 'CSR_USER',
    },
    TOKEN_TYPE: {
        'FREE': 'FREE',
        '50-MINS': '50-MINS',
        '200-MINS': '200-MINS',
        '500-MINS': '500-MINS',
    },
    STATUS: {
        PENDING: 'PENDING',
        SUCCESS: 'SUCCESS',
        FAILURE: 'FAILURE',
        ACCEPTED: 'ACCEPTED',
        REJECTED: 'REJECTED',
        INVALID: 'INVALID',
    },
    STATISTICS_TYPE: {
        DATE: 'date',
        WEEK: 'week',
        MONTH: 'month',
        QUARTER: 'quarter',
        YEAR: 'year',
    },
    TOTAL_STATISTICS_TYPE: {
        TOKEN: 'token',
        USER: 'user',
        PROJECT: 'project',
        TOKEN_TYPE: 'tokenType',
    },
    BEARER_HEADER_AUTHORIZE: 'Bearer ',
    AUTH_JWT: 'jwt',
    AUTH_LOCAL: 'local',
    ASR_SERVICE: 'ASR_SERVICE',
    ONE_DAY_IN_MILISECONDS: 86400000,
};
