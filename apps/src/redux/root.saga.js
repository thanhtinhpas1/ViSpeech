import {all, call} from 'redux-saga/effects'
import {userSaga} from './user/user.sagas'
import {tokenSaga} from './token/token.sagas'
import {contractSaga} from './contract/contract.sagas'

export default function* rootSagas() {
    yield all([call(userSaga), call(tokenSaga), call(contractSaga)])
}
