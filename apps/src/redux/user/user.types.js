const UserTypes = {
    CLEAR_USER_STATE: 'CLEAR_USER_STATE',
    LOGIN_START: 'LOGIN_START',
    LOGIN_SUCCESS: 'LOGIN_SUCCESS',
    LOGIN_FAILURE: 'LOGIN_FAILURE',
    AUTHEN_WITH_SOCIAL: 'AUTHEN_WITH_SOCIAL',

    REGISTER_START: 'REGISTER_START',
    REGISTER_SUCCESS: 'REGISTER_SUCCESS',
    REGISTER_FAILURE: 'REGISTER_FAILURE',

    ACTIVE_EMAIL: 'ACTIVE_EMAIL',
    ACTIVE_EMAIL_SUCCESS: 'ACTIVE_EMAIL_SUCCESS',
    ACTIVE_EMAIL_FAILURE: 'ACTIVE_EMAIL_FAILURE',

    SEND_EMAIL_RESET_PASSWORD: 'SEND_EMAIL_RESET_PASSWORD',
    SEND_EMAIL_RESET_PASSWORD_SUCCESS: 'SEND_EMAIL_RESET_PASSWORD_SUCCESS',
    SEND_EMAIL_RESET_PASSWORD_FAILUE: 'SEND_EMAIL_RESET_PASSWORD_FAILUE',

    VERIFY_TOKEN_RESET_PASSWORD: 'VERIFY_TOKEN_RESET_PASSWORD',
    VERIFY_TOKEN_RESET_PASSWORD_SUCCESS: 'VERIFY_TOKEN_RESET_PASSWORD_SUCCESS',
    VERIFY_TOKEN_RESET_PASSWORD_FAILURE: 'VERIFY_TOKEN_RESET_PASSWORD_FAILURE',

    RESET_PASSWORD: 'RESET_PASSWORD',
    RESET_PASSWORD_SUCCESS: 'RESET_PASSWORD_SUCCESS',
    RESET_PASSWORD_FAILURE: 'RESET_PASSWORD_FAILURE',
    LOGOUT: 'LOGOUT',
    AUTHENTICATE: 'AUTHENTICATE',
    UPDATE_CURRENT_USER: 'UPDATE_CURRENT_USER',

    CHANGE_PASSPWORD: 'CHANGE_PASSPWORD',
    CHANGE_PASSPWORD_SUCCESS: 'CHANGE_PASSPWORD_SUCCESS',
    CHANGE_PASSPWORD_FAILURE: 'CHANGE_PASSPWORD_FAILURE',
    CHANGE_PASSPWORD_CLEAR: 'CHANGE_PASSPWORD_CLEAR', // Clear state

    UPDATE_AVATAR: 'UPDATE_AVATAR',
    UPDATE_AVATAR_SUCCESS: 'UPDATE_AVATAR_SUCCESS',
    UPDATE_AVATAR_FAIILURE: 'UPDATE_AVATAR_FAIILURE',
    UPDATE_AVATAR_CLEAR: 'UPDATE_AVATAR_CLEAR',

    UPDATE_USER_INFO_SUCCESS: 'UPDATE_USER_INFO_SUCCESS',
}

export default UserTypes
