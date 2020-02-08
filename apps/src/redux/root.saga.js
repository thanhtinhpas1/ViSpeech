import { call, all } from 'redux-saga/effects'
import { userSaga } from './user/user.sagas'
import { contractSaga } from './contract/contract.sagas'

export default function* rootSagas() {
  yield all([
    call(userSaga),
    call(contractSaga),
  ])
}
