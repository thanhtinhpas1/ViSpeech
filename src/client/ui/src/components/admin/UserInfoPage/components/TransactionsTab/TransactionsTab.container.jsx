import { connect } from 'react-redux'
import { getUserOrderList } from 'redux/order/order.actions'
import TransactionsTab from './TransactionsTab.component'

const mapStateToProps = state => ({
  getUserOrderListObj: state.order.getUserOrderList,
})

const mapDispatchToProps = dispatch => ({
  getUserOrderList: ({ userId, pagination, sortField, sortOrder, filters }) =>
    dispatch(getUserOrderList({ userId, pagination, sortField, sortOrder, filters })),
})

const TransactionsTabContainer = connect(mapStateToProps, mapDispatchToProps)(TransactionsTab)

export default TransactionsTabContainer
