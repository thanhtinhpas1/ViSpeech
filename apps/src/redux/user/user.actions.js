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
export const registerStart = user => ({
  type: UserTypes.REGISTER_START,
  payload: user,
})

export const registerSuccess = user => ({
  type: UserTypes.REGISTER_SUCCESS,
  payload: user,
})

export const registerFailure = error => ({
  type: UserTypes.REGISTER_FAILURE,
  payload: error,
})

// LOGIN or REGISTER using fb/gg account
export const authenWithSocial = user => ({
  type: UserTypes.AUTHEN_WITH_SOCIAL,
  payload: user,
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

// Send email reset password
export const sendEmailResetPassword = email => ({
  type: UserTypes.SEND_EMAIL_RESET_PASSWORD,
  payload: email,
})

export const sendEmailResetPasswordSuccess = () => ({
  type: UserTypes.SEND_EMAIL_RESET_PASSWORD_SUCCESS,
})

export const sendEmailResetPasswordFailure = message => ({
  type: UserTypes.SEND_EMAIL_RESET_PASSWORD_FAILUE,
  payload: message,
})

// Verify token reset password
export const verifyTokenResetPassword = token => ({
  type: UserTypes.VERIFY_TOKEN_RESET_PASSWORD,
  payload: token,
})

export const verifyTokenResetPasswordSuccess = userId => ({
  type: UserTypes.VERIFY_TOKEN_RESET_PASSWORD_SUCCESS,
  payload: userId,
})

export const verifyTokenResetPasswordFailure = message => ({
  type: UserTypes.VERIFY_TOKEN_RESET_PASSWORD_FAILURE,
  payload: message,
})

// Reset password
export const resetPasswordStart = (password, userId) => ({
  type: UserTypes.RESET_PASSWORD,
  payload: { password, userId },
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
  type: UserTypes.AUTHENTICATE,
  payload: token,
})

export const updateCurrentUser = user => ({
  type: UserTypes.UPDATE_CURRENT_USER,
  payload: user,
})

// change password
export const changePassword = ({ password, oldPassword, token }) => ({
  type: UserTypes.CHANGE_PASSPWORD,
  payload: { password, oldPassword, token },
})

export const changePasswordSuccess = () => ({
  type: UserTypes.CHANGE_PASSPWORD_SUCCESS,
})

export const changePasswordFailure = message => ({
  type: UserTypes.CHANGE_PASSPWORD_FAILURE,
  payload: message,
})

export const clearChangePassword = () => ({
  type: UserTypes.CHANGE_PASSPWORD_CLEAR,
})

// change avatar
export const updateAvatar = ({ avatar, token }) => ({
  type: UserTypes.UPDATE_AVATAR,
  payload: { avatar, token },
})

export const updateAvatarSuccess = newAvatar => ({
  type: UserTypes.UPDATE_AVATAR_SUCCESS,
  payload: newAvatar,
})

export const updateAvatarFailure = message => ({
  type: UserTypes.UPDATE_AVATAR_FAIILURE,
  payload: message,
})

export const updateAvatarClear = () => ({
  type: UserTypes.UPDATE_AVATAR_CLEAR,
})

// get user list
export const getUserList = () => ({
  type: UserTypes.GET_USER_LIST,
})

export const getUserListSuccess = userList => ({
  type: UserTypes.GET_USER_LIST_SUCCESS,
  payload: { userList },
})

export const getUserListFailure = message => ({
  type: UserTypes.GET_USER_LIST_FAILURE,
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
export const deleteUser = id => ({
  type: UserTypes.DELETE_USER,
  payload: id,
})

export const deleteUserSuccess = info => ({
  type: UserTypes.DELETE_USER_SUCCESS,
  payload: info,
})

export const deleteUserFailure = message => ({
  type: UserTypes.DELETE_USER_FAILURE,
  payload: message,
})
