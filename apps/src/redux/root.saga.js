import { call, all } from 'redux-saga/effects'
import { userSaga } from './user/user.sagas'
import { tokenSaga } from './token/token.sagas'
import { orderSaga } from './order/order.sagas'

export default function* rootSagas() {
  yield all([call(userSaga), call(tokenSaga), call(orderSaga)])
}