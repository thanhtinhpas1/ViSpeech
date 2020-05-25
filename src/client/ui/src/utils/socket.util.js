import { Subject } from 'rxjs'

const SocketUtils = {
  invokeCheckSubject: {},
  getSubjectName: event => {
    const success = 'SuccessEvent'
    const failed = 'FailedEvent'
    const arr = event.includes(success) ? event.split(success) : event.split(failed)
    return arr[0] || ''
  },
  createInvokeCheckSubject: event => {
    const subjectName = SocketUtils.getSubjectName(event)
    SocketUtils.invokeCheckSubject[subjectName] = new Subject()
  },
  createInvokeCheckSubjects: () => {
    const topicNames = Object.values(SocketUtils.KAFKA_TOPIC)
    topicNames.forEach(name => {
      SocketUtils.createInvokeCheckSubject(name)
    })
  },
  KAFKA_TOPIC: {
    // USER
    USER_CREATED_SUCCESS_EVENT: 'UserCreatedSuccessEvent',
    USER_CREATED_FAILED_EVENT: 'UserCreatedFailedEvent',
    EMAIL_VERIFIED_SUCCESS_EVENT: 'EmailVerifiedSuccessEvent',
    EMAIL_VERIFIED_FAILED_EVENT: 'EmailVerifiedFailedEvent',
    PASSWORD_CHANGED_SUCCESS_EVENT: 'PasswordChangedSuccessEvent',
    PASSWORD_CHANGED_FAILED_EVENT: 'PasswordChangedFailedEvent',
    USER_DELETED_SUCCESS_EVENT: 'UserDeletedSuccessEvent',
    USER_DELETED_FAILED_EVENT: 'UserDeletedFailedEvent',
    USER_UPDATED_SUCCESS_EVENT: 'UserUpdatedSuccessEvent',
    USER_UPDATED_FAILED_EVENT: 'UserUpdatedFailedEvent',
    VERIFY_EMAIL_SENT_SUCCESS_EVENT: 'VerifyEmailSentSuccessEvent',
    VERIFY_EMAIL_SENT_FAILED_EVENT: 'VerifyEmailSentFailedEvent',
    // TOKEN
    FREE_TOKEN_CREATED_SUCCESS_EVENT: 'FreeTokenCreatedSuccessEvent',
    FREE_TOKEN_CREATED_FAILED_EVENT: 'FreeTokenCreatedFailedEvent',
    ORDERED_TOKEN_CREATED_SUCCESS_EVENT: 'OrderedTokenCreatedSuccessEvent',
    ORDERED_TOKEN_CREATED_FAILED_EVENT: 'OrderedTokenCreatedFailedEvent',
    TOKEN_CREATED_SUCCESS_EVENT: 'TokenCreatedSuccessEvent',
    TOKEN_CREATED_FAILED_EVENT: 'TokenCreatedFailedEvent',
    TOKEN_DELETED_SUCCESS_EVENT: 'TokenDeletedSuccessEvent',
    TOKEN_DELETED_FAILED_EVENT: 'TokenDeletedFailedEvent',
    TOKEN_DELETED_BY_USERID_SUCCESS_EVENT: 'TokenDeletedByUserIdSuccessEvent',
    TOKEN_DELETED_BY_USERID_FAILED_EVENT: 'TokenDeletedByUserIdFailedEvent',
    TOKEN_DELETED_BY_PROJECTID_SUCCESS_EVENT: 'TokenDeletedByProjectIdSuccessEvent',
    TOKEN_DELETED_BY_PROJECTID_FAILED_EVENT: 'TokenDeletedByProjectIdFailedEvent',
    TOKEN_UPDATED_SUCCESS_EVENT: 'TokenUpdatedSuccessEvent',
    TOKEN_UPDATED_FAILED_EVENT: 'TokenUpdatedFailedEvent',
    // PROJECT
    PROJECT_CREATED_SUCCESS_EVENT: 'ProjectCreatedSuccessEvent',
    PROJECT_CREATED_FAILED_EVENT: 'ProjectCreatedFailedEvent',
    PROJECT_DELETED_SUCCESS_EVENT: 'ProjectDeletedSuccessEvent',
    PROJECT_DELETED_FAILED_EVENT: 'ProjectDeletedFailedEvent',
    PROJECT_DELETED_BY_USERID_SUCCESS_EVENT: 'ProjectDeletedByUserIdSuccessEvent',
    PROJECT_DELETED_BY_USERID_FAILED_EVENT: 'ProjectDeletedByUserIdFailedEvent',
    PROJECT_UPDATED_SUCCESS_EVENT: 'ProjectUpdatedSuccessEvent',
    PROJECT_UPDATED_FAILED_EVENT: 'ProjectUpdatedFailedEvent',
    // REPORT
    REPORT_CREATED_SUCCESS_EVENT: 'ReportCreatedSuccessEvent',
    REPORT_CREATED_FAILED_EVENT: 'ReportCreatedFailedEvent',
    REPORT_DELETED_SUCCESS_EVENT: 'ReportDeletedSuccessEvent',
    REPORT_DELETED_FAILED_EVENT: 'ReportDeletedFailedEvent',
    REPORT_UPDATED_SUCCESS_EVENT: 'ReportUpdatedSuccessEvent',
    REPORT_UPDATED_FAILED_EVENT: 'ReportUpdatedFailedEvent',
    // PERMISSION
    PERMISSION_ASSIGN_EMAIL_SENT_SUCCESS_EVENT: 'PermissionAssignEmailSentSuccessEvent',
    PERMISSION_ASSIGN_EMAIL_SENT_FAILED_EVENT: 'PermissionAssignEmailSentFailedEvent',
    PERMISSION_ASSIGN_REPLIED_SUCCESS_EVENT: 'PermissionAssignRepliedSuccessEvent',
    PERMISSION_ASSIGN_REPLIED_FAILED_EVENT: 'PermissionAssignRepliedFailedEvent',
    PERMISSION_CREATED_SUCCESS_EVENT: 'PermissionCreatedSuccessEvent',
    PERMISSION_CREATED_FAILED_EVENT: 'PermissionCreatedFailedEvent',
    PERMISSION_DELETED_SUCCESS_EVENT: 'PermissionDeletedSuccessEvent',
    PERMISSION_DELETED_FAILED_EVENT: 'PermissionDeletedFailedEvent',
    PERMISSION_DELETED_BY_USERID_SUCCESS_EVENT: 'PermissionDeletedByUserIdSuccessEvent',
    PERMISSION_DELETED_BY_USERID_FAILED_EVENT: 'PermissionDeletedByUserIdFailedEvent',
    PERMISSION_DELETED_BY_PROJECTID_SUCCESS_EVENT: 'PermissionDeletedByProjectIdSuccessEvent',
    PERMISSION_DELETED_BY_PROJECTID_FAILED_EVENT: 'PermissionDeletedByProjectIdFailedEvent',
    PERMISSION_UPDATED_SUCCESS_EVENT: 'PermissionUpdatedSuccessEvent',
    PERMISSION_UPDATED_FAILED_EVENT: 'PermissionUpdatedFailedEvent',
    // ORDER
    ORDER_CREATED_SUCCESS_EVENT: 'OrderCreatedSuccessEvent',
    ORDER_CREATED_FAILED_EVENT: 'OrderCreatedFailedEvent',
    ORDER_DELETED_SUCCESS_EVENT: 'OrderDeletedSuccessEvent',
    ORDER_DELETED_FAILED_EVENT: 'OrderDeletedFailedEvent',
    ORDER_UPDATED_SUCCESS_EVENT: 'OrderUpdatedSuccessEvent',
    ORDER_UPDATED_FAILED_EVENT: 'OrderUpdatedFailedEvent',
  },
}

SocketUtils.createInvokeCheckSubjects()

export default SocketUtils
