import { connect } from 'react-redux'
import { getOrderList } from 'redux/order/order.actions'
import TransactionsPage from './TransactionsPage.component'

const mapStateToProps = state => ({
  currentUser: state.user.currentUser,
  orderListObj: state.order.getList,
})

const mapDispatchToProps = dispatch => ({
  getOrderList: ({ userId, pageIndex, pageSize }) =>
    dispatch(getOrderList({ userId, pageIndex, pageSize })),
})

const TransactionsPageContainer = connect(mapStateToProps, mapDispatchToProps)(TransactionsPage)

export default TransactionsPageContainer
