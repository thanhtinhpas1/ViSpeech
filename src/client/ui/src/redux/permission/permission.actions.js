import PermissionTypes from './permission.types'

export const onClearPermissionState = () => ({
  type: PermissionTypes.CLEAR_PERMISSION_STATE,
})

// assign permission
export const onClearAssignPermissionState = () => ({
  type: PermissionTypes.CLEAR_ASSIGN_PERMISSION_STATE,
})

export const assignPermission = ({ assigneeUsernames, projectId, permissions, assignerId }) => ({
  type: PermissionTypes.ASSIGN_PERMISSION,
  payload: { assigneeUsernames, projectId, permissions, assignerId },
})

export const assignPermissionSuccess = ({ assigneeUsernames, projectId, permissions, assignerId }) => ({
  type: PermissionTypes.ASSIGN_PERMISSION_SUCCESS,
  payload: { assigneeUsernames, projectId, permissions, assignerId },
})

export const assignPermissionFailure = message => ({
  type: PermissionTypes.ASSIGN_PERMISSION_FAILURE,
  payload: message,
})

// reply permission assign
export const onClearReplyPermissionAssignState = () => ({
  type: PermissionTypes.CLEAR_REPLY_PERMISSION_ASSIGN_STATE,
})

export const replyPermissionAssign = ({ emailToken, status }) => ({
  type: PermissionTypes.REPLY_PERMISSION_ASSIGN,
  payload: { emailToken, status },
})

export const replyPermissionAssignSuccess = ({ emailToken, status }) => ({
  type: PermissionTypes.REPLY_PERMISSION_ASSIGN_SUCCESS,
  payload: { emailToken, status },
})

export const replyPermissionAssignFailure = message => ({
  type: PermissionTypes.REPLY_PERMISSION_ASSIGN_FAILURE,
  payload: message,
})

// find permission by email token
export const findPermissionByEmailToken = token => ({
  type: PermissionTypes.FIND_PERMISSION_BY_EMAIL_TOKEN,
  payload: token,
})

export const findPermissionByEmailTokenSuccess = data => ({
  type: PermissionTypes.FIND_PERMISSION_BY_EMAIL_TOKEN_SUCCESS,
  payload: data,
})

export const findPermissionByEmailTokenFailure = message => ({
  type: PermissionTypes.FIND_PERMISSION_BY_EMAIL_TOKEN_FAILURE,
  payload: message,
})

// find permission for assignee
export const findPermissionForAssignee = (projectId, assignerId, assigneeId, status) => ({
  type: PermissionTypes.FIND_PERMISSION_FOR_ASSIGNEE,
  payload: { projectId, assignerId, assigneeId, status },
})

export const findPermissionForAssigneeSuccess = data => ({
  type: PermissionTypes.FIND_PERMISSION_FOR_ASSIGNEE_SUCCESS,
  payload: data,
})

export const findPermissionForAssigneeFailure = message => ({
  type: PermissionTypes.FIND_PERMISSION_FOR_ASSIGNEE_FAILURE,
  payload: message,
})

// update permission expiration date
export const onClearUpdatePermissionExpirationDateState = () => ({
  type: PermissionTypes.CLEAR_UPDATE_PERMISSION_EXPIRATION_DATE_STATE,
})

export const updatePermissionExpirationDate = (projectId, assignerId, assigneeId, expiresIn) => ({
  type: PermissionTypes.UPDATE_PERMISSION_EXPIRATION_DATE,
  payload: { projectId, assignerId, assigneeId, expiresIn },
})

export const updatePermissionExpirationDateSuccess = data => ({
  type: PermissionTypes.UPDATE_PERMISSION_EXPIRATION_DATE_SUCCESS,
  payload: data,
})

export const updatePermissionExpirationDateFailure = message => ({
  type: PermissionTypes.UPDATE_PERMISSION_EXPIRATION_DATE_FAILURE,
  payload: message,
})

// delete permission for assignee
export const onClearDeletePermissionForAssigneeState = () => ({
  type: PermissionTypes.CLEAR_DELETE_PERMISSION_FOR_ASSIGNEE_STATE,
})

export const deletePermissionForAssignee = (projectId, assignerId, assigneeId) => ({
  type: PermissionTypes.DELETE_PERMISSION_FOR_ASSIGNEE,
  payload: { projectId, assignerId, assigneeId },
})

export const deletePermissionForAssigneeSuccess = () => ({
  type: PermissionTypes.DELETE_PERMISSION_FOR_ASSIGNEE_SUCCESS,
})

export const deletePermissionForAssigneeFailure = message => ({
  type: PermissionTypes.DELETE_PERMISSION_FOR_ASSIGNEE_FAILURE,
  payload: message,
})
