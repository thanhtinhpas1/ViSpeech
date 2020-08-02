import { connect } from 'react-redux'
import { getOrderList } from '../../../redux/order/order.actions'
import TransactionsPage from './TransactionsPage.component'

const mapStateToProps = state => ({
  currentUser: state.user.currentUser,
  getOrderListObj: state.order.getOrderList,
})

const mapDispatchToProps = dispatch => ({
  getOrderList: ({ pagination, sortField, sortOrder, filters, advancedFilters }) =>
    dispatch(getOrderList({ pagination, sortField, sortOrder, filters, advancedFilters })),
})

const TransactionsPageContainer = connect(mapStateToProps, mapDispatchToProps)(TransactionsPage)

export default TransactionsPageContainer
