import TransactionTypes from './transaction.types'

const INITIAL_STATE = {
  getList: {
    transactionList: [],
    numberOfTransactions: 0,
    pageIndex: 0,
    isLoading: false,
    isSuccess: null,
    message: null,
  },
  newTransaction: {},
}

const transactionReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case TransactionTypes.CLEAR_TRANSACTION_STATE:
      return {
        ...INITIAL_STATE,
      }
    case TransactionTypes.GET_TRANSACTION_LIST:
      return {
        ...state,
        getList: {
          ...state.getList,
          isLoading: true,
        },
      }
    case TransactionTypes.GET_TRANSACTION_LIST_SUCCESS:
      return {
        ...state,
        getList: {
          isLoading: false,
          isSuccess: true,
          transactionList: action.payload.transactionList,
          numberOfTransactions: action.payload.numberOfTransactions,
          pageIndex: action.payload.pageIndex,
        },
      }
    case TransactionTypes.GET_TRANSACTION_LIST_FAILURE:
      return {
        ...state,
        getList: {
          isLoading: false,
          isSuccess: false,
          message: action.payload,
        },
      }
    default:
      return state
  }
}

export default transactionReducer
