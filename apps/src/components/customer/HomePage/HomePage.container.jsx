import { connect } from 'react-redux'
import { getFreeToken } from 'redux/token/token.actions'
import { getOrderList } from 'redux/order/order.actions'
import HomePage from './HomePage.component'

const mapStateToProps = state => ({
  currentUser: state.user.currentUser,
  getFreeTokenObj: state.token.getFreeToken,
  orderListObj: state.order.getList,
})

const mapDispatchToProps = dispatch => ({
  getFreeToken: userId => dispatch(getFreeToken(userId)),
  getOrderList: ({ userId }) => dispatch(getOrderList({ userId })),
})

const HomePageContainer = connect(mapStateToProps, mapDispatchToProps)(HomePage)

export default HomePageContainer
