import { connect } from 'react-redux'
import { getUserOrderList } from 'redux/order/order.actions'
import TokenTransaction from './TokenTransaction.component'

const mapStateToProps = state => ({
  currentUser: state.user.currentUser,
  getUserOrderListObj: state.order.getUserOrderList,
})

const mapDispatchToProps = dispatch => ({
  getUserOrderList: ({ userId, pageIndex, pageSize }) => dispatch(getUserOrderList({ userId, pageIndex, pageSize })),
})

const TokenTransactionContainer = connect(mapStateToProps, mapDispatchToProps)(TokenTransaction)

export default TokenTransactionContainer
