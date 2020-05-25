import { call, all } from 'redux-saga/effects'
import { userSaga } from './user/user.sagas'
import { tokenSaga } from './token/token.sagas'
import { orderSaga } from './order/order.sagas'
import { projectSaga } from './project/project.sagas'
import { permissionSaga } from './permission/permission.sagas'
import { reportSaga } from './report/report.sagas'
import { requestSaga } from './request/request.sagas'
import { taskSaga } from './task/task.sagas'

export default function* rootSagas() {
  yield all([
    call(userSaga),
    call(tokenSaga),
    call(orderSaga),
    call(projectSaga),
    call(permissionSaga),
    call(reportSaga),
    call(requestSaga),
    call(taskSaga),
  ])
}
