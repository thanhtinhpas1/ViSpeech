import { call, all } from 'redux-saga/effects'
import { userSaga } from './user/user.sagas'
import { tokenSaga } from './token/token.sagas'
import { transactionSaga } from './transaction/transaction.sagas'

export default function* rootSagas() {
  yield all([call(userSaga), call(tokenSaga), call(transactionSaga)])
}
