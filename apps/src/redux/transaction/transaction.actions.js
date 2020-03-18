import TransactionTypes from './transaction.types'

export const onClearTransactionState = () => ({
  type: TransactionTypes.CLEAR_TRANSACTION_STATE,
})

// get transaction list
export const getTransactionList = filterConditions => ({
  type: TransactionTypes.GET_TRANSACTION_LIST,
  payload: filterConditions,
})
export const getTransactionListSuccess = (transactionList, numberOfTransactions, pageNumber) => ({
  type: TransactionTypes.GET_TRANSACTION_LIST_SUCCESS,
  payload: { transactionList, numberOfTransactions, pageNumber },
})
export const getTransactionListFailure = message => ({
  type: TransactionTypes.GET_TRANSACTION_LIST_FAILURE,
  payload: message,
})

export const createTransaction = data => ({
  type: TransactionTypes.CREATE_TRANSACTION,
  payload: data,
})
