import TokenTypes from './token.types'

const INITIAL_STATE = {
  getTokenList: {
    tokenList: [],
    isLoading: false,
    isSuccess: null,
    errorMessage: null,
  },
  getTokenTypeList: {
    tokenTypeList: [],
    isLoading: false,
    isSuccess: null,
    errorMessage: null,
  },
}

const tokenReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case TokenTypes.CLEAR_TOKEN_STATE:
      return {
        ...INITIAL_STATE,
      }
    // GET_TOKENS
    case TokenTypes.GET_TOKENS:
      return {
        ...state,
        getTokenList: {
          ...state.getTokenList,
          isLoading: true,
        },
      }
    case TokenTypes.GET_TOKENS_SUCCESS:
      return {
        ...state,
        getTokenList: {
          isLoading: false,
          isSuccess: true,
          tokenList: action.payload.tokenList,
        },
      }
    case TokenTypes.GET_TOKENS_FAILURE:
      return {
        ...state,
        getTokenList: {
          ...state.getTokenList,
          isLoading: false,
          isSuccess: false,
          message: action.payload,
        },
      }
    // GET_TOKEN_TYPES
    case TokenTypes.GET_TOKEN_TYPES:
      return {
        ...state,
        getTokenTypeList: {
          ...state.getTokenTypeList,
          isLoading: true,
        },
      }
    case TokenTypes.GET_TOKEN_TYPES_SUCCESS:
      return {
        ...state,
        getTokenTypeList: {
          isLoading: false,
          isSuccess: true,
          tokenTypeList: action.payload.tokenTypeList,
        },
      }
    case TokenTypes.GET_TOKEN_TYPES_FAILURE:
      return {
        ...state,
        getTokenTypeList: {
          ...state.getTokenTypeList,
          isLoading: false,
          isSuccess: false,
          message: action.payload,
        },
      }
    default:
      return state
  }
}

export default tokenReducer
