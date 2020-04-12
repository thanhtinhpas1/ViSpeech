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
    ONE_DAY_IN_MILLISECONDS: 86400000,

    // KAFKA TOPICS
    TOPICS: {
        // USER
        USER_CREATED_SUCCESS_EVENT: 'UserCreatedSuccessEvent',
        USER_CREATED_FAILED_EVENT: 'UserCreatedFailedEvent',
        EMAIL_VERIFIED_SUCCESS_EVENT: 'EmailVerifiedSuccessEvent',
        EMAIL_VERIFIED_FAILED_EVENT: 'EmailVerifiedFailedEvent',
        PASSWORD_CHANGED_SUCCESS_EVENT: 'PasswordChangedSuccessEvent',
        PASSWORD_CHANGED_FAILED_EVENT: 'PasswordChangedFailedEvent',
        USER_DELETED_SUCCESS_EVENT: 'UserDeletedSuccessEvent',
        USER_DELETED_FAILED_EVENT: 'UserDeletedFailedEvent',
        USER_UPDATE_SUCCESS_EVENT: 'UserUpdatedSuccessEvent',
        USER_UPDATE_FAILED_EVENT: 'UserUpdatedFailedEvent',
        VERIFY_EMAIL_SENT_SUCCESS_EVENT: 'VerifyEmailSentSuccessEvent',
        VERIFY_EMAIL_SENT_FAILED_EVENT: 'VerifyEmailSentFailedEvent',
        // TOKEN
        FREE_TOKEN_CREATED_SUCCESS_EVENT: 'FreeTokenCreatedSuccessEvent',
        FREE_TOKEN_CREATED_FAILED_EVENT: 'FreeTokenCreatedFailedEvent',
        ORDERED_TOKEN_CREATED_SUCCESS_EVENT: 'OrderedTokenCreatedSuccessEvent',
        ORDERED_TOKEN_CREATED_FAILED_EVENT: 'OrderedTokenCreatedFailedEvent',
        TOKEN_CREATED_SUCCESS_EVENT: 'TokenCreatedSuccessEvent',
        TOKEN_CREATED_FAILED_EVENT: 'TokenCreatedFailedEvent',
        TOKEN_DELETED_SUCCESS_EVENT: 'TokenDeletedSucessEvent',
        TOKEN_DELETED_FAILED_EVENT: 'TokenDeletedFailedEvent',
        PROJECT_CREATED_SUCCESS_EVENT: 'ProjectCreatedSuccessEvent',
        PROJECT_CREATED_FAILED_EVENT: 'ProjectCreatedFailedEvent',
        // PERMISSION
        PERMISSION_ASSIGN_EMAIL_SENT_SUCCESS_EVENT: 'PermissionAssignEmailSentSuccessEvent',
        PERMISSION_ASSIGN_EMAIL_SENT_FAILED_EVENT: 'PermissionAssignEmailSentFailedEvent',
        PERMISSION_CREATED_SUCCESS_EVENT: 'PermissionCreatedSuccessEvent',
        PERMISSION_CREATED_FAILED_EVENT: 'PermissionCreatedFailedEvent',
        // ORDER
        ORDER_CREATED_SUCCESS_EVENT: 'OrderCreatedSuccessEvent',
        ORDER_CREATED_FAILED_EVENT: 'OrderCreatedSuccessEvent',
    },
    TASK: {
        REPORT_DATE: 'REPORT_DATE',
        REPORT_MONTH: 'REPORT_MONTH',
        REPORT_QUARTER: 'REPORT_QUARTER',
        REPORT_YEAR: 'REPORT_YEAR',
        TIMEOUT: 30000,
    }
};
