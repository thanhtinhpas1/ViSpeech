/* eslint-disable no-shadow */
/* eslint-disable no-underscore-dangle */
import { call, all, takeLatest, put } from 'redux-saga/effects'
import TokenService from 'services/token.service'
import { TOKEN_TYPE } from 'utils/constant'
import Utils from 'utils'
import TokenTypes from './token.types'
import {
  getUserTokenListSuccess,
  getUserTokenListFailure,
  getProjectTokenListSuccess,
  getProjectTokenListFailure,
  getTokenTypesSuccess,
  getTokenTypesFailure,
  getFreeTokenSuccess,
  getFreeTokenFailure,
} from './token.actions'

// ==== get user token list

export function* getUserTokens({ payload: filterConditions }) {
  try {
    const userTokenList = yield TokenService.getUserTokenList(filterConditions)
    yield put(getUserTokenListSuccess(userTokenList || []))
  } catch (err) {
    yield put(getUserTokenListFailure(err.message))
  }
}

export function* getUserTokensSaga() {
  yield takeLatest(TokenTypes.GET_USER_TOKENS, getUserTokens)
}

// ==== get project tokens
const getTokenTypeByMinnutes = minutes => {
  const tokenTypes = Object.keys(TOKEN_TYPE)
  const findIndexFunc = tokenType => TOKEN_TYPE[tokenType].minutes === minutes
  const result = tokenTypes[tokenTypes.findIndex(findIndexFunc)]
  return TOKEN_TYPE[result].viText
}

const formatProjectTokenList = tokenList => {
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

export function* getProjectTokens({ payload: filterConditions }) {
  try {
    let projectTokenList = yield TokenService.getProjectTokenList(filterConditions)
    projectTokenList = formatProjectTokenList(projectTokenList || [])
    yield put(getProjectTokenListSuccess(projectTokenList))
  } catch (err) {
    yield put(getProjectTokenListFailure(err.message))
  }
}

export function* getProjectTokensSaga() {
  yield takeLatest(TokenTypes.GET_PROJECT_TOKENS, getProjectTokens)
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
  // const filterFunc = tokenType => tokenType.name !== TOKEN_TYPE.FREE.name
  return Utils.sortArr(tokenTypeList, (a, b) => a.price - b.price).map(mapFunc)
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

// ==== get free token
export function* getFreeToken({ payload: userId }) {
  try {
    const freeToken = yield TokenService.getFreeToken(userId)
    yield put(getFreeTokenSuccess(freeToken))
  } catch (err) {
    yield put(getFreeTokenFailure(err.message))
  }
}

export function* getFreeTokenSaga() {
  yield takeLatest(TokenTypes.GET_FREE_TOKEN, getFreeToken)
}

export function* tokenSaga() {
  yield all([
    call(getUserTokensSaga),
    call(getProjectTokensSaga),
    call(getTokenTypesSaga),
    call(getFreeTokenSaga),
  ])
}
