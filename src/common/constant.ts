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
    TIME_TYPE: {
        DATE: 'date',
        WEEK: 'week',
        MONTH: 'month',
        QUARTER: 'quarter',
        YEAR: 'year',
    },
    STATISTICS_TYPE: {
        TOKEN: 'token',
        USER: 'user',
        PROJECT: 'project',
        TOKEN_TYPE: 'tokenType',
        USER_TOKEN_TYPE: 'userTokenType'
    },
    BEARER_HEADER_AUTHORIZE: 'Bearer ',
    AUTH_JWT: 'jwt',
    AUTH_LOCAL: 'local',
    ASR_SERVICE: 'ASR_SERVICE',
    ONE_DAY_IN_MILLISECONDS: 86400000
};
