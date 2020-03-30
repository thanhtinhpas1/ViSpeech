import TokenTypes from './token.types'

export const onClearTokenState = () => ({
  type: TokenTypes.CLEAR_TOKEN_STATE,
})

// Get token list
export const getTokenList = filterConditions => ({
  type: TokenTypes.GET_TOKENS,
  payload: filterConditions,
})

export const getTokenListSuccess = tokenList => ({
  type: TokenTypes.GET_TOKENS_SUCCESS,
  payload: { tokenList },
})

export const getTokenListFailure = message => ({
  type: TokenTypes.GET_TOKENS_FAILURE,
  payload: message,
})

// Get token types
export const getTokenTypes = () => ({
  type: TokenTypes.GET_TOKEN_TYPES,
})

export const getTokenTypesSuccess = tokenTypeList => ({
  type: TokenTypes.GET_TOKEN_TYPES_SUCCESS,
  payload: { tokenTypeList },
})

export const getTokenTypesFailure = message => ({
  type: TokenTypes.GET_TOKEN_TYPES_FAILURE,
  payload: message,
})
