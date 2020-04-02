/* eslint-disable no-shadow */
/* eslint-disable no-underscore-dangle */
import { call, all, takeLatest, put } from 'redux-saga/effects'
import TokenService from 'services/token.service'
import { TOKEN_TYPE } from 'utils/constant'
import TokenTypes from './token.types'
import {
  getTokenListSuccess,
  getTokenListFailure,
  getTokenTypesSuccess,
  getTokenTypesFailure,
} from './token.actions'

// ==== get tokens
const getTokenTypeByMinnutes = minutes => {
  const tokenTypes = Object.keys(TOKEN_TYPE)
  const findIndexFunc = tokenType => TOKEN_TYPE[tokenType].minutes === minutes
  const result = tokenTypes[tokenTypes.findIndex(findIndexFunc)]
  return TOKEN_TYPE[result].viText
}

const formatTokenList = tokenList => {
  const mapFunc = token => {
    return {
      ...token,
      tokenType: getTokenTypeByMinnutes(token.minutes),
      isValid: token.isValid || true,
      minutesLeft: Number(token.minutes) - Number(token.usedMinutes || 0),
    }
  }
  return tokenList.map(mapFunc)
}

export function* getTokens({ payload: filterConditions }) {
  try {
    let tokenList = yield TokenService.getTokenList(filterConditions)
    tokenList = formatTokenList(tokenList || [])
    yield put(getTokenListSuccess(tokenList))
  } catch (err) {
    yield put(getTokenListFailure(err.message))
  }
}

export function* getTokensSaga() {
  yield takeLatest(TokenTypes.GET_TOKENS, getTokens)
}

// ==== get token types
const formatTokenTypeList = tokenTypeList => {
  const mapFunc = (tokenType, index) => {
    return {
      ...tokenType,
      defaultChecked: index === 0,
      saleOff: null,
    }
  }
  const filterFunc = tokenType => tokenType.name !== TOKEN_TYPE.FREE.name
  return tokenTypeList.filter(filterFunc).map(mapFunc)
}

export function* getTokenTypes() {
  try {
    let tokenTypeList = yield TokenService.getTokenTypeList()
    tokenTypeList = formatTokenTypeList(tokenTypeList || [])
    yield put(getTokenTypesSuccess(tokenTypeList))
  } catch (err) {
    yield put(getTokenTypesFailure(err.message))
  }
}

export function* getTokenTypesSaga() {
  yield takeLatest(TokenTypes.GET_TOKEN_TYPES, getTokenTypes)
}

export function* tokenSaga() {
  yield all([call(getTokensSaga), call(getTokenTypesSaga)])
}
