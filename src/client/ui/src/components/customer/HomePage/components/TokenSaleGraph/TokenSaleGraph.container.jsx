import { connect } from 'react-redux'
import { getUserOrderList } from 'redux/order/order.actions'
import TokenSaleGraph from './TokenSaleGraph.component'

const mapStateToProps = state => ({
  currentUser: state.user.currentUser,
  getUserOrderListObj: state.order.getUserOrderList,
})

const mapDispatchToProps = dispatch => ({
  getUserOrderList: ({ userId, pageIndex, pageSize }) => dispatch(getUserOrderList({ userId, pageIndex, pageSize })),
})

const TokenSaleGraphContainer = connect(mapStateToProps, mapDispatchToProps)(TokenSaleGraph)

export default TokenSaleGraphContainer
