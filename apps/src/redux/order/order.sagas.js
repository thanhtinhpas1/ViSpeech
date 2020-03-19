/* eslint-disable no-restricted-globals */
import { call, all, takeLatest, put } from 'redux-saga/effects'
import OrderTypes from './order.types'
import { getOrderListSuccess, getOrderListFailure } from './order.actions'
import OrderService from '../../services/order.service'

// get transaction list
function* getList({ payload: filterConditions }) {
  try {
    const orderList = yield OrderService.getOrderList(filterConditions)
    // const numberOfContracts = yield TransactionService.countTransactions(filterConditions)
    // const orderList =
    //   filterConditions.pageIndex === 0
    //     ? [
    //         {
    //           id: 'TNX1001',
    //           state: { name: 'Có vấn đề', class: 'data-state-pending' },
    //           date: '2018-08-24 10:20 PM',
    //           type: { name: 'Mua', class: 'badge-success' },
    //           key: 'Trống',
    //         },
    //         {
    //           id: 'TNX1002',
    //           state: { name: 'Đang xử lý', class: 'data-state-progress' },
    //           date: '2018-08-24 10:20 PM',
    //           type: { name: 'Tặng', class: 'badge-warning' },
    //           key: 'Trống',
    //         },
    //         {
    //           id: 'TNX1003',
    //           state: { name: 'Thành công', class: 'data-state-approved' },
    //           date: '2018-08-24 10:20 PM',
    //           type: { name: 'Miễn phí', class: 'badge-warning' },
    //           key: 'eyJh...0ur8',
    //         },
    //         {
    //           id: 'TNX1004',
    //           state: { name: 'Có vấn đề', class: 'data-state-pending' },
    //           date: '2018-08-24 10:20 PM',
    //           type: { name: 'Mua', class: 'badge-success' },
    //           key: 'Trống',
    //         },
    //         {
    //           id: 'TNX1005',
    //           state: { name: 'Đang xử lý', class: 'data-state-progress' },
    //           date: '2018-08-24 10:20 PM',
    //           type: { name: 'Tặng', class: 'badge-warning' },
    //           key: 'Trống',
    //         },
    //         // {
    //         //   id: 'TNX1006',
    //         //   state: { name: 'Thành công', class: 'data-state-approved' },
    //         //   date: '2018-08-24 10:20 PM',
    //         //   type: { name: 'Miễn phí', class: 'badge-warning' },
    //         //   key: 'eyJh...0ur8',
    //         // },
    //         // {
    //         //   id: 'TNX1007',
    //         //   state: { name: 'Có vấn đề', class: 'data-state-pending' },
    //         //   date: '2018-08-24 10:20 PM',
    //         //   type: { name: 'Mua', class: 'badge-success' },
    //         //   key: 'Trống',
    //         // },
    //         // {
    //         //   id: 'TNX1008',
    //         //   state: { name: 'Đang xử lý', class: 'data-state-progress' },
    //         //   date: '2018-08-24 10:20 PM',
    //         //   type: { name: 'Tặng', class: 'badge-warning' },
    //         //   key: 'Trống',
    //         // },
    //       ]
    //     : [
    //         {
    //           id: 'TNX1006',
    //           state: { name: 'Thành công', class: 'data-state-approved' },
    //           date: '2018-08-24 10:20 PM',
    //           type: { name: 'Miễn phí', class: 'badge-warning' },
    //           key: 'eyJh...0ur8',
    //         },
    //         {
    //           id: 'TNX1007',
    //           state: { name: 'Có vấn đề', class: 'data-state-pending' },
    //           date: '2018-08-24 10:20 PM',
    //           type: { name: 'Mua', class: 'badge-success' },
    //           key: 'Trống',
    //         },
    //         {
    //           id: 'TNX1008',
    //           state: { name: 'Đang xử lý', class: 'data-state-progress' },
    //           date: '2018-08-24 10:20 PM',
    //           type: { name: 'Tặng', class: 'badge-warning' },
    //           key: 'Trống',
    //         },
    //       ]
    yield put(getOrderListSuccess(orderList))
  } catch (err) {
    yield put(getOrderListFailure(err.message))
  }
}
export function* getOrderListListSaga() {
  yield takeLatest(OrderTypes.GET_ORDER_LIST, getList)
}

// create new transaction
// function* create({ payload: transaction }) {
//   try {
//     // const newTransaction = yield TransactionService.createTransaction(transaction)
//     // yield put(updateContract(newContract))
//   } catch (err) {
//     console.log('ERR CREATE TRANSACTION ', err)
//     // yield put(updateContract(null))
//   }
// }
// export function* createTransactionSaga() {
//   yield takeLatest(OrderTypes.CREATE_TRANSACTION, create)
// }

// =================================

export function* orderSaga() {
  yield all([
    call(getOrderListListSaga),
    // call(createTransactionSaga),
  ])
}
