import TokenTypes from './token.types'

export const onClearTokenState = () => ({
  type: TokenTypes.CLEAR_TOKEN_STATE,
})

// Get token list
export const getTokenList = filterConditions => ({
  type: TokenTypes.GET_TOKENS,
  payload: filterConditions,
})

export const getTokenListSuccess = data => ({
  type: TokenTypes.GET_TOKENS_SUCCESS,
  payload: { data },
})

export const getTokenListFailure = message => ({
  type: TokenTypes.GET_TOKENS_FAILURE,
  payload: message,
})

// Get user token list
export const getUserTokenList = filterConditions => ({
  type: TokenTypes.GET_USER_TOKENS,
  payload: filterConditions,
})

export const getUserTokenListSuccess = data => ({
  type: TokenTypes.GET_USER_TOKENS_SUCCESS,
  payload: { data },
})

export const getUserTokenListFailure = message => ({
  type: TokenTypes.GET_USER_TOKENS_FAILURE,
  payload: message,
})

// Get project token list
export const getProjectTokenList = filterConditions => ({
  type: TokenTypes.GET_PROJECT_TOKENS,
  payload: filterConditions,
})

export const getProjectTokenListSuccess = data => ({
  type: TokenTypes.GET_PROJECT_TOKENS_SUCCESS,
  payload: { data },
})

export const getProjectTokenListFailure = message => ({
  type: TokenTypes.GET_PROJECT_TOKENS_FAILURE,
  payload: message,
})

// Get token types
export const getTokenTypes = () => ({
  type: TokenTypes.GET_TOKEN_TYPES,
})

export const getTokenTypesSuccess = data => ({
  type: TokenTypes.GET_TOKEN_TYPES_SUCCESS,
  payload: { data },
})

export const getTokenTypesFailure = message => ({
  type: TokenTypes.GET_TOKEN_TYPES_FAILURE,
  payload: message,
})

// Get free token
export const getFreeToken = userId => ({
  type: TokenTypes.GET_FREE_TOKEN,
  payload: userId,
})

export const getFreeTokenSuccess = data => ({
  type: TokenTypes.GET_FREE_TOKEN_SUCCESS,
  payload: { data },
})

export const getFreeTokenFailure = message => ({
  type: TokenTypes.GET_FREE_TOKEN_FAILURE,
  payload: message,
})

// delete token
export const deleteToken = id => ({
  type: TokenTypes.DELETE_TOKEN,
  payload: id,
})

export const deleteTokenSuccess = () => ({
  type: TokenTypes.DELETE_TOKEN_SUCCESS,
})

export const deleteTokenFailure = message => ({
  type: TokenTypes.DELETE_TOKEN_FAILURE,
  payload: message,
})
