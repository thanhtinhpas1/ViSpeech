import TokenTypes from './token.types'

export const onClearTokenState = () => ({
  type: TokenTypes.CLEAR_TOKEN_STATE,
})

// Get tokens
export const getTokens = userId => ({
  type: TokenTypes.GET_TOKENS,
  payload: userId,
})

export const getTokensSuccess = tokenList => ({
  type: TokenTypes.GET_TOKENS_SUCCESS,
  payload: tokenList,
})

export const getTokensFailure = message => ({
  type: TokenTypes.GET_TOKENS_FAILURE,
  payload: message,
})

// Get token types
export const getTokenTypes = () => ({
  type: TokenTypes.GET_TOKEN_TYPES,
})

export const getTokenTypesSuccess = tokenTypeList => ({
  type: TokenTypes.GET_TOKEN_TYPES_SUCCESS,
  payload: tokenTypeList,
})

export const getTokenTypesFailure = message => ({
  type: TokenTypes.GET_TOKEN_TYPES_FAILURE,
  payload: message,
})
