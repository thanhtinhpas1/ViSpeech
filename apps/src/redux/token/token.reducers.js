import TokenTypes from './token.types'

const INITIAL_STATE = {
  tokenList: null,
  errorMessage: null,
  isSuccess: null,
  isLoading: false,
}

const userReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case TokenTypes.CLEAR_TOKEN_STATE:
      return {
        ...INITIAL_STATE,
      }
    // GET_TOKENS
    case TokenTypes.GET_TOKENS:
      return {
        ...state,
        isLoading: true,
      }
    case TokenTypes.GET_TOKENS_SUCCESS:
      return {
        ...state,
        tokenList: action.payload,
        isLoading: false,
        isSuccess: true,
        message: null,
      }
    case TokenTypes.GET_TOKENS_FAILURE:
      return {
        ...state,
        isLoading: false,
        isSuccess: false,
        message: action.payload,
      }
    default:
      return state
  }
}

export default userReducer
