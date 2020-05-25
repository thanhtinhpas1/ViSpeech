import { connect } from 'react-redux'
import { getOrderList } from 'redux/order/order.actions'
import TransactionsPage from './TransactionsPage.component'

const mapStateToProps = state => ({
  currentUser: state.user.currentUser,
  getOrderListObj: state.order.getOrderList,
})

const mapDispatchToProps = dispatch => ({
  getOrderList: ({ pagination, sortField, sortOrder, filters }) =>
    dispatch(getOrderList({ pagination, sortField, sortOrder, filters })),
})

const TransactionsPageContainer = connect(mapStateToProps, mapDispatchToProps)(TransactionsPage)

export default TransactionsPageContainer
