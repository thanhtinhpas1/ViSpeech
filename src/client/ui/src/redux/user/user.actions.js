import UserTypes from './user.types'

// clear isLoading, error msg, user when user start login/ register
export const onClearUserState = () => ({
  type: UserTypes.CLEAR_USER_STATE,
})

// login
export const loginStart = user => ({
  type: UserTypes.LOGIN_START,
  payload: user,
})
export const loginSuccess = user => ({
  type: UserTypes.LOGIN_SUCCESS,
  payload: user,
})
export const loginFailure = error => ({
  type: UserTypes.LOGIN_FAILURE,
  payload: error,
})

// register
export const registerStart = () => ({
  type: UserTypes.REGISTER_START,
})
export const registerSuccess = data => ({
  type: UserTypes.REGISTER_SUCCESS,
  payload: data,
})
export const registerFailure = error => ({
  type: UserTypes.REGISTER_FAILURE,
  payload: error,
})

// LOGIN or REGISTER using fb/gg account
export const loginWithSocial = (accessToken, userType) => ({
  type: UserTypes.LOGIN_WITH_SOCIAL,
  payload: { accessToken, userType },
})
export const loginWithSocialSuccess = user => ({
  type: UserTypes.LOGIN_WITH_SOCIAL_SUCCESS,
  payload: user,
})
export const loginWithSocialFailure = error => ({
  type: UserTypes.LOGIN_WITH_SOCIAL_FAILURE,
  payload: error,
})

// Send verify email
export const sendVerifyEmail = userId => ({
  type: UserTypes.SEND_VERIFY_EMAIL,
  payload: userId,
})
export const sendVerifyEmailSuccess = () => ({
  type: UserTypes.SEND_VERIFY_EMAIL_SUCCESS,
})
export const sendVerifyEmailFailure = message => ({
  type: UserTypes.SEND_VERIFY_EMAIL_FAILURE,
  payload: message,
})

// Verify email
export const verifyEmail = emailToken => ({
  type: UserTypes.VERIFY_EMAIL,
  payload: emailToken,
})
export const verifyEmailSuccess = () => ({
  type: UserTypes.VERIFY_EMAIL_SUCCESS,
})
export const verifyEmailFailure = message => ({
  type: UserTypes.VERIFY_EMAIL_FAILURE,
  payload: message,
})

// update current user
export const onClearUpdateCurrentUserState = () => ({
  type: UserTypes.CLEAR_UPDATE_CURRENT_USER_STATE,
})
export const updateCurrentUser = (id, info) => ({
  type: UserTypes.UPDATE_CURRENT_USER,
  payload: { id, info },
})
export const updateCurrentUserSuccess = user => ({
  type: UserTypes.UPDATE_CURRENT_USER_SUCCESS,
  payload: user,
})
export const updateCurrentUserFailure = message => ({
  type: UserTypes.UPDATE_CURRENT_USER_FAILURE,
  payload: message,
})

// Send reset password email
export const sendResetPasswordEmail = email => ({
  type: UserTypes.SEND_RESET_PASSWORD_EMAIL,
  payload: email,
})
export const sendResetPasswordEmailSuccess = () => ({
  type: UserTypes.SEND_RESET_PASSWORD_EMAIL_SUCCESS,
})
export const sendResetPasswordEmailFailure = message => ({
  type: UserTypes.SEND_RESET_PASSWORD_EMAIL_FAILURE,
  payload: message,
})

// Reset password
export const resetPassword = (userId, password, resetPasswordToken) => ({
  type: UserTypes.RESET_PASSWORD,
  payload: { userId, password, resetPasswordToken },
})
export const resetPasswordSuccess = () => ({
  type: UserTypes.RESET_PASSWORD_SUCCESS,
})
export const resetPasswordFailure = message => ({
  type: UserTypes.RESET_PASSWORD_FAILURE,
  payload: message,
})

// logout
export const logout = () => ({
  type: UserTypes.LOGOUT,
})

// authenticate with jwt
export const authenticate = token => ({
  type: UserTypes.UPDATE_CURRENT_USER_ON_AUTHENTICATE,
  payload: token,
})
export const authenticateSuccess = user => ({
  type: UserTypes.UPDATE_CURRENT_USER_ON_AUTHENTICATE_SUCCESS,
  payload: user,
})
export const authenticateFailure = message => ({
  type: UserTypes.UPDATE_CURRENT_USER_ON_AUTHENTICATE_FAILURE,
  payload: message,
})

// change password
export const changePassword = ({ userId, oldPassword, newPassword }) => ({
  type: UserTypes.CHANGE_PASSWORD,
  payload: { userId, oldPassword, newPassword },
})
export const changePasswordSuccess = () => ({
  type: UserTypes.CHANGE_PASSWORD_SUCCESS,
})
export const changePasswordFailure = message => ({
  type: UserTypes.CHANGE_PASSWORD_FAILURE,
  payload: message,
})
export const onClearChangePasswordState = () => ({
  type: UserTypes.CLEAR_CHANGE_PASSWORD_STATE,
})

// get user list
export const getUserList = filterConditions => ({
  type: UserTypes.GET_USER_LIST,
  payload: filterConditions,
})
export const getUserListSuccess = data => ({
  type: UserTypes.GET_USER_LIST_SUCCESS,
  payload: { data },
})
export const getUserListFailure = message => ({
  type: UserTypes.GET_USER_LIST_FAILURE,
  payload: message,
})

// get username list
export const getUsernameList = filterConditions => ({
  type: UserTypes.GET_USERNAME_LIST,
  payload: filterConditions,
})
export const getUsernameListSuccess = data => ({
  type: UserTypes.GET_USERNAME_LIST_SUCCESS,
  payload: { data },
})
export const getUsernameListFailure = message => ({
  type: UserTypes.GET_USERNAME_LIST_FAILURE,
  payload: message,
})

// get user info
export const getUserInfo = id => ({
  type: UserTypes.GET_USER_INFO,
  payload: id,
})
export const getUserInfoSuccess = data => ({
  type: UserTypes.GET_USER_INFO_SUCCESS,
  payload: data,
})
export const getUserInfoFailure = message => ({
  type: UserTypes.GET_USER_INFO_FAILURE,
  payload: message,
})

// update user info
export const onClearUpdateUserInfoState = () => ({
  type: UserTypes.CLEAR_UPDATE_USER_INFO_STATE,
})
export const updateUserInfo = (id, userInfo) => ({
  type: UserTypes.UPDATE_USER_INFO,
  payload: { id, userInfo },
})
export const updateUserInfoSuccess = data => ({
  type: UserTypes.UPDATE_USER_INFO_SUCCESS,
  payload: data,
})
export const updateUserInfoFailure = message => ({
  type: UserTypes.UPDATE_USER_INFO_FAILURE,
  payload: message,
})

// create user
export const onClearCreateUserState = () => ({
  type: UserTypes.CLEAR_CREATE_USER_STATE,
})
export const createUser = data => ({
  type: UserTypes.CREATE_USER,
  payload: data,
})
export const createUserSuccess = data => ({
  type: UserTypes.CREATE_USER_SUCCESS,
  payload: data,
})
export const createUserFailure = message => ({
  type: UserTypes.CREATE_USER_FAILURE,
  payload: message,
})

// delete user
export const onClearDeleteUserState = () => ({
  type: UserTypes.CLEAR_DELETE_USER_STATE,
})
export const deleteUser = id => ({
  type: UserTypes.DELETE_USER,
  payload: id,
})
export const deleteUserSuccess = () => ({
  type: UserTypes.DELETE_USER_SUCCESS,
})
export const deleteUserFailure = message => ({
  type: UserTypes.DELETE_USER_FAILURE,
  payload: message,
})

// get project assignee list
export const getProjectAssigneeList = projectId => ({
  type: UserTypes.GET_PROJECT_ASSIGNEES,
  payload: projectId,
})
export const getProjectAssigneeListSuccess = data => ({
  type: UserTypes.GET_PROJECT_ASSIGNEES_SUCCESS,
  payload: data,
})
export const getProjectAssigneeListFailure = message => ({
  type: UserTypes.GET_PROJECT_ASSIGNEES_FAILURE,
  payload: message,
})
