import { connect } from 'react-redux'
import { getOrderInfo } from 'redux/order/order.actions'
import TransactionDetailsPage from './TransactionDetailsPage.component'

const mapStateToProps = state => ({
  currentUser: state.user.currentUser,
  getInfoObj: state.order.getInfo,
})

const mapDispatchToProps = dispatch => ({
  getOrderInfo: ({ id, tokenId }) => dispatch(getOrderInfo({ id, tokenId })),
})

const TransactionDetailsPageContainer = connect(mapStateToProps, mapDispatchToProps)(TransactionDetailsPage)

export default TransactionDetailsPageContainer
