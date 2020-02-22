/* eslint-disable no-shadow */
/* eslint-disable no-underscore-dangle */
import {all, call, put, takeLatest} from 'redux-saga/effects'
import TokenService from 'services/token.service'
import TokenTypes from './token.types'
import {getTokensFailure, getTokensSuccess} from './token.actions'

// ==== get tokens
export function* getTokens({payload: userId}) {
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

export function* tokenSaga() {
    yield all([call(getTokensSaga)])
}
