/* eslint-disable no-shadow */
/* eslint-disable no-underscore-dangle */
import { call, all, takeLatest, put } from 'redux-saga/effects'
import TokenService from 'services/token.service'
import { TOKEN_TYPE } from 'utils/constant'
import TokenTypes from './token.types'
import {
  getTokensSuccess,
  getTokensFailure,
  getTokenTypesSuccess,
  getTokenTypesFailure,
} from './token.actions'

// ==== get tokens
export function* getTokens({ payload: userId }) {
  try {
    const tokenList = yield TokenService.getTokens(userId)
    yield put(getTokensSuccess(tokenList || []))
  } catch (err) {
    yield put(getTokensFailure(err.message))
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
  const filterFunc = tokenType => tokenType.name !== TOKEN_TYPE.FREE
  return tokenTypeList.filter(filterFunc).map(mapFunc)
}

export function* getTokenTypes() {
  try {
    let tokenTypeList = yield TokenService.getTokenTypes()
    tokenTypeList = formatTokenTypeList(tokenTypeList)
    yield put(getTokenTypesSuccess(tokenTypeList || []))
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
