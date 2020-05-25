import { connect } from 'react-redux'
import { getUserOrderList } from 'redux/order/order.actions'
import TransactionsPage from './TransactionsPage.component'

const mapStateToProps = state => ({
  currentUser: state.user.currentUser,
  getUserOrderListObj: state.order.getUserOrderList,
})

const mapDispatchToProps = dispatch => ({
  getUserOrderList: ({ userId, pagination, sortField, sortOrder, filters }) =>
    dispatch(getUserOrderList({ userId, pagination, sortField, sortOrder, filters })),
})

const TransactionsPageContainer = connect(mapStateToProps, mapDispatchToProps)(TransactionsPage)

export default TransactionsPageContainer
