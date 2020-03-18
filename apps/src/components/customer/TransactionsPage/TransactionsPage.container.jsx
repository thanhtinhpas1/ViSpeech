import { connect } from 'react-redux'
import { getTransactionList } from 'redux/transaction/transaction.actions'
import TransactionsPage from './TransactionsPage.component'

const mapStateToProps = state => ({
  currentUser: state.user.currentUser,
  transactionListObj: state.transaction.getList,
})

const mapDispatchToProps = dispatch => ({
  getTransactionList: ({ pageIndex, pageSize }) =>
    dispatch(getTransactionList({ pageIndex, pageSize })),
})

const TransactionsPageContainer = connect(mapStateToProps, mapDispatchToProps)(TransactionsPage)

export default TransactionsPageContainer
