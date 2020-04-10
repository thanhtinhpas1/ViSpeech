import TokenTypes from './token.types'

const INITIAL_STATE = {
  getFreeToken: {
    freeToken: null,
    isLoading: false,
    isSuccess: null,
    errorMessage: null,
  },
  getUserTokenList: {
    userTokenList: [],
    isLoading: false,
    isSuccess: null,
    errorMessage: null,
  },
  getProjectTokenList: {
    projectTokenList: [],
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
    // GET USER TOKENS
    case TokenTypes.GET_USER_TOKENS:
      return {
        ...state,
        getUserTokenList: {
          ...state.getUserTokenList,
          isLoading: true,
        },
      }
    case TokenTypes.GET_USER_TOKENS_SUCCESS:
      return {
        ...state,
        getUserTokenList: {
          isLoading: false,
          isSuccess: true,
          userTokenList: action.payload.data,
        },
      }
    case TokenTypes.GET_USER_TOKENS_FAILURE:
      return {
        ...state,
        getUserTokenList: {
          ...state.getUserTokenList,
          isLoading: false,
          isSuccess: false,
          message: action.payload,
        },
      }
    // GET PROJECT TOKENS
    case TokenTypes.GET_PROJECT_TOKENS:
      return {
        ...state,
        getProjectTokenList: {
          ...state.getProjectTokenList,
          isLoading: true,
        },
      }
    case TokenTypes.GET_PROJECT_TOKENS_SUCCESS:
      return {
        ...state,
        getProjectTokenList: {
          isLoading: false,
          isSuccess: true,
          projectTokenList: action.payload.data,
        },
      }
    case TokenTypes.GET_PROJECT_TOKENS_FAILURE:
      return {
        ...state,
        getProjectTokenList: {
          ...state.getProjectTokenList,
          isLoading: false,
          isSuccess: false,
          message: action.payload,
        },
      }
    // GET TOKEN TYPES
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
          tokenTypeList: action.payload.data,
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
    // GET FREE TOKEN
    case TokenTypes.GET_FREE_TOKEN:
      return {
        ...state,
        getFreeToken: {
          ...state.getFreeToken,
          isLoading: true,
        },
      }
    case TokenTypes.GET_FREE_TOKEN_SUCCESS:
      return {
        ...state,
        getFreeToken: {
          isLoading: false,
          isSuccess: true,
          freeToken: action.payload.data,
        },
      }
    case TokenTypes.GET_FREE_TOKEN_FAILURE:
      return {
        ...state,
        getFreeToken: {
          ...state.getFreeToken,
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
