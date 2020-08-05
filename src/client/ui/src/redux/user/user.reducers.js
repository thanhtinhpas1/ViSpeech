import UserTypes from './user.types'

const INITIAL_STATE = {
  currentUser: null,
  login: {
    user: {},
    isLoading: false,
    isSuccess: null,
    message: null,
  },
  loginWithSocial: {
    user: {},
    isLoading: false,
    isSuccess: null,
    message: null,
  },
  register: {
    data: null,
    isLoading: false,
    isSuccess: null,
    message: null,
  },
  getList: {
    userList: { data: [], count: 0 },
    isLoading: false,
    isSuccess: null,
    message: null,
  },
  getUsernameList: {
    usernameList: { data: [], count: 0 },
    isLoading: false,
    isSuccess: null,
    message: null,
  },
  getInfo: {
    user: {},
    isLoading: false,
    isSuccess: null,
    message: null,
  },
  updateInfo: {
    isLoading: false,
    isSuccess: null,
    message: null,
  },
  updateCurrentUser: {
    isLoading: false,
    isSuccess: null,
    message: null,
  },
  updateCurrentUserOnAuthenticate: {
    isLoading: false,
    isSuccess: null,
    message: null,
  },
  createUser: {
    isLoading: false,
    isSuccess: null,
    message: null,
  },
  deleteUser: {
    isLoading: false,
    isSuccess: null,
    message: null,
  },
  sendVerifyEmail: {
    isSuccess: null,
    isLoading: false,
    message: null,
  },
  verifyEmail: {
    isSuccess: null,
    isLoading: false,
    message: null,
  },
  sendResetPasswordEmail: {
    isSuccess: null,
    isLoading: false,
    message: null,
  },
  resetPassword: {
    isSuccess: null,
    isLoading: false,
    message: null,
  },
  changePassword: {
    isSuccess: null,
    isLoading: false,
    message: null,
  },
  updateAvatar: {
    isSuccess: null,
    isLoading: null,
    message: null,
  },
}

const userReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case UserTypes.CLEAR_USER_STATE:
      return {
        ...INITIAL_STATE,
      }
    // LOGIN
    case UserTypes.LOGIN_START:
      return {
        ...state,
        login: {
          ...INITIAL_STATE.login,
          isLoading: true,
        },
      }
    case UserTypes.LOGIN_SUCCESS:
      return {
        ...state,
        currentUser: action.payload,
        login: {
          ...INITIAL_STATE.login,
          isLoading: false,
          isSuccess: true,
        },
      }
    case UserTypes.LOGIN_FAILURE:
      return {
        ...state,
        login: {
          ...INITIAL_STATE.login,
          isLoading: false,
          isSuccess: false,
          message: action.payload,
        },
      }
    // LOGIN WITH SOCIAL
    case UserTypes.LOGIN_WITH_SOCIAL:
      return {
        ...state,
        loginWithSocial: {
          ...INITIAL_STATE.loginWithSocial,
          isLoading: true,
        },
      }
    case UserTypes.LOGIN_WITH_SOCIAL_SUCCESS:
      return {
        ...state,
        currentUser: action.payload,
        loginWithSocial: {
          ...INITIAL_STATE.loginWithSocial,
          isLoading: false,
          isSuccess: true,
        },
      }
    case UserTypes.LOGIN_WITH_SOCIAL_FAILURE:
      return {
        ...state,
        loginWithSocial: {
          ...INITIAL_STATE.loginWithSocial,
          isLoading: false,
          isSuccess: false,
          message: action.payload,
        },
      }
    // REGISTER
    case UserTypes.REGISTER_START:
      return {
        ...state,
        register: {
          ...INITIAL_STATE.register,
          isLoading: true,
        },
      }
    case UserTypes.REGISTER_SUCCESS:
      return {
        ...state,
        register: {
          ...INITIAL_STATE.register,
          data: action.payload,
          isLoading: false,
          isSuccess: true,
        },
      }
    case UserTypes.REGISTER_FAILURE:
      return {
        ...state,
        register: {
          ...INITIAL_STATE.register,
          isLoading: false,
          isSuccess: false,
          message: action.payload,
        },
      }
    // GET USER LIST
    case UserTypes.GET_USER_LIST:
      return {
        ...state,
        getList: {
          ...INITIAL_STATE.getList,
          isLoading: true,
        },
      }
    case UserTypes.GET_USER_LIST_SUCCESS:
      return {
        ...state,
        getList: {
          ...INITIAL_STATE.getList,
          isLoading: false,
          isSuccess: true,
          userList: action.payload.data,
        },
      }
    case UserTypes.GET_USER_LIST_FAILURE:
      return {
        ...state,
        getList: {
          ...INITIAL_STATE.getList,
          isLoading: false,
          isSuccess: false,
          message: action.payload,
        },
      }
    // GET USERNAME LIST
    case UserTypes.GET_USERNAME_LIST:
      return {
        ...state,
        getUsernameList: {
          ...INITIAL_STATE.getUsernameList,
          isLoading: true,
        },
      }
    case UserTypes.GET_USERNAME_LIST_SUCCESS:
      return {
        ...state,
        getUsernameList: {
          ...INITIAL_STATE.getUsernameList,
          isLoading: false,
          isSuccess: true,
          usernameList: action.payload.data,
        },
      }
    case UserTypes.GET_USERNAME_LIST_FAILURE:
      return {
        ...state,
        getUsernameList: {
          ...INITIAL_STATE.getUsernameList,
          isLoading: false,
          isSuccess: false,
          message: action.payload,
        },
      }
    // GET INFO
    case UserTypes.GET_USER_INFO:
      return {
        ...state,
        getInfo: {
          ...INITIAL_STATE.getInfo,
          isLoading: true,
        },
      }
    case UserTypes.GET_USER_INFO_SUCCESS:
      return {
        ...state,
        getInfo: {
          ...INITIAL_STATE.getInfo,
          user: action.payload,
          isLoading: false,
          isSuccess: true,
        },
      }
    case UserTypes.GET_USER_INFO_FAILURE:
      return {
        ...state,
        getInfo: {
          ...INITIAL_STATE.getInfo,
          isLoading: false,
          isSuccess: false,
          message: action.payload,
        },
      }
    // UPDATE CURRENT USER
    case UserTypes.CLEAR_UPDATE_CURRENT_USER_STATE:
      return {
        ...state,
        updateCurrentUser: {
          ...INITIAL_STATE.updateCurrentUser,
        },
      }
    case UserTypes.UPDATE_CURRENT_USER:
      return {
        ...state,
        updateCurrentUser: {
          ...INITIAL_STATE.updateCurrentUser,
          isLoading: true,
        },
      }
    case UserTypes.UPDATE_CURRENT_USER_SUCCESS:
      return {
        ...state,
        currentUser: action.payload,
        updateCurrentUser: {
          ...INITIAL_STATE.updateCurrentUser,
          isLoading: false,
          isSuccess: true,
        },
      }
    case UserTypes.UPDATE_CURRENT_USER_FAILURE:
      return {
        ...state,
        updateCurrentUser: {
          ...INITIAL_STATE.updateCurrentUser,
          isLoading: false,
          isSuccess: false,
          message: action.payload,
        },
      }
    // UPDATE CURRENT USER ON AUTHENTICATE
    case UserTypes.UPDATE_CURRENT_USER_ON_AUTHENTICATE:
      return {
        ...state,
        updateCurrentUserOnAuthenticate: {
          ...INITIAL_STATE.updateCurrentUserOnAuthenticate,
          isLoading: true,
        },
      }
    case UserTypes.UPDATE_CURRENT_USER_ON_AUTHENTICATE_SUCCESS:
      return {
        ...state,
        currentUser: action.payload,
        updateCurrentUserOnAuthenticate: {
          ...INITIAL_STATE.updateCurrentUserOnAuthenticate,
          isLoading: false,
          isSuccess: true,
        },
      }
    case UserTypes.UPDATE_CURRENT_USER_ON_AUTHENTICATE_FAILURE:
      return {
        ...state,
        currentUser: null,
        updateCurrentUserOnAuthenticate: {
          ...INITIAL_STATE.updateCurrentUserOnAuthenticate,
          isLoading: false,
          isSuccess: false,
          message: action.payload,
        },
      }
    // UPDATE INFO
    case UserTypes.CLEAR_UPDATE_USER_INFO_STATE:
      return {
        ...state,
        updateInfo: {
          ...INITIAL_STATE.updateInfo,
        },
      }
    case UserTypes.UPDATE_USER_INFO:
      return {
        ...state,
        updateInfo: {
          ...INITIAL_STATE.updateInfo,
          isLoading: true,
        },
      }
    case UserTypes.UPDATE_USER_INFO_SUCCESS:
      return {
        ...state,
        updateInfo: {
          ...INITIAL_STATE.updateInfo,
          isLoading: false,
          isSuccess: true,
        },
      }
    case UserTypes.UPDATE_USER_INFO_FAILURE:
      return {
        ...state,
        updateInfo: {
          ...INITIAL_STATE.updateInfo,
          isLoading: false,
          isSuccess: false,
          message: action.payload,
        },
      }
    // CREATE USER
    case UserTypes.CLEAR_CREATE_USER_STATE:
      return {
        ...state,
        createUser: {
          ...INITIAL_STATE.createUser,
        },
      }
    case UserTypes.CREATE_USER:
      return {
        ...state,
        createUser: {
          ...INITIAL_STATE.createUser,
          isLoading: true,
        },
      }
    case UserTypes.CREATE_USER_SUCCESS:
      return {
        ...state,
        createUser: {
          ...INITIAL_STATE.createUser,
          isLoading: false,
          isSuccess: true,
        },
      }
    case UserTypes.CREATE_USER_FAILURE:
      return {
        ...state,
        createUser: {
          ...INITIAL_STATE.createUser,
          isLoading: false,
          isSuccess: false,
          message: action.payload,
        },
      }
    // DELETE USER
    case UserTypes.CLEAR_DELETE_USER_STATE:
      return {
        ...state,
        deleteUser: {
          ...INITIAL_STATE.deleteUser,
        },
      }
    case UserTypes.DELETE_USER:
      return {
        ...state,
        deleteUser: {
          ...INITIAL_STATE.deleteUser,
          isLoading: true,
        },
      }
    case UserTypes.DELETE_USER_SUCCESS:
      return {
        ...state,
        deleteUser: {
          ...INITIAL_STATE.deleteUser,
          isLoading: false,
          isSuccess: true,
        },
      }
    case UserTypes.DELETE_USER_FAILURE:
      return {
        ...state,
        deleteUser: {
          ...INITIAL_STATE.deleteUser,
          isLoading: false,
          isSuccess: false,
          message: action.payload,
        },
      }
    // SEND VERIFY EMAIL
    case UserTypes.SEND_VERIFY_EMAIL:
      return {
        ...state,
        sendVerifyEmail: {
          ...INITIAL_STATE.sendVerifyEmail,
          isLoading: true,
        },
      }
    case UserTypes.SEND_VERIFY_EMAIL_SUCCESS:
      return {
        ...state,
        sendVerifyEmail: {
          ...INITIAL_STATE.sendVerifyEmail,
          isLoading: false,
          isSuccess: true,
        },
      }
    case UserTypes.SEND_VERIFY_EMAIL_FAILURE:
      return {
        ...state,
        sendVerifyEmail: {
          ...INITIAL_STATE.sendVerifyEmail,
          isLoading: false,
          isSuccess: false,
          message: action.payload,
        },
      }
    // VERIFY EMAIL
    case UserTypes.VERIFY_EMAIL:
      return {
        ...state,
        verifyEmail: {
          ...INITIAL_STATE.verifyEmail,
          isLoading: true,
        },
      }
    case UserTypes.VERIFY_EMAIL_SUCCESS:
      return {
        ...state,
        verifyEmail: {
          ...INITIAL_STATE.verifyEmail,
          isLoading: false,
          isSuccess: true,
        },
      }
    case UserTypes.VERIFY_EMAIL_FAILURE:
      return {
        ...state,
        verifyEmail: {
          ...INITIAL_STATE.verifyEmail,
          isLoading: false,
          isSuccess: false,
          message: action.payload,
        },
      }
    // SEND RESET PASSWORD EMAIL
    case UserTypes.SEND_RESET_PASSWORD_EMAIL:
      return {
        ...state,
        sendResetPasswordEmail: {
          ...INITIAL_STATE.sendResetPasswordEmail,
          isLoading: true,
        },
      }
    case UserTypes.SEND_RESET_PASSWORD_EMAIL_SUCCESS:
      return {
        ...state,
        sendResetPasswordEmail: {
          ...INITIAL_STATE.sendResetPasswordEmail,
          isLoading: false,
          isSuccess: true,
        },
      }
    case UserTypes.SEND_RESET_PASSWORD_EMAIL_FAILURE:
      return {
        ...state,
        sendResetPasswordEmail: {
          ...INITIAL_STATE.sendResetPasswordEmail,
          isLoading: false,
          isSuccess: false,
          message: action.payload,
        },
      }
    // RESET PASSWORD
    case UserTypes.RESET_PASSWORD:
      return {
        ...state,
        resetPassword: {
          ...INITIAL_STATE.resetPassword,
          isLoading: true,
        },
      }
    case UserTypes.RESET_PASSWORD_SUCCESS:
      return {
        ...state,
        resetPassword: {
          ...INITIAL_STATE.resetPassword,
          isLoading: false,
          isSuccess: true,
        },
      }
    case UserTypes.RESET_PASSWORD_FAILURE:
      return {
        ...state,
        resetPassword: {
          ...INITIAL_STATE.resetPassword,
          isLoading: false,
          isSuccess: false,
          message: action.payload,
        },
      }
    // Change password
    case UserTypes.CHANGE_PASSWORD:
      return {
        ...state,
        changePassword: {
          ...INITIAL_STATE.changePassword,
          isLoading: true,
        },
      }
    case UserTypes.CHANGE_PASSWORD_SUCCESS:
      return {
        ...state,
        changePassword: {
          ...INITIAL_STATE.changePassword,
          isLoading: false,
          isSuccess: true,
        },
      }
    case UserTypes.CHANGE_PASSWORD_FAILURE:
      return {
        ...state,
        changePassword: {
          ...INITIAL_STATE.changePassword,
          isLoading: false,
          isSuccess: false,
          message: action.payload,
        },
      }
    case UserTypes.CLEAR_CHANGE_PASSWORD_STATE:
      return {
        ...state,
        changePassword: {
          ...INITIAL_STATE.changePassword,
        },
      }
    default:
      return state
  }
}

export default userReducer
