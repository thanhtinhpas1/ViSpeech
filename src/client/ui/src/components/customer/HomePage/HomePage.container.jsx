import { connect } from 'react-redux'
import { getFreeToken } from 'redux/token/token.actions'
import { getUserOrderList } from 'redux/order/order.actions'
import HomePage from './HomePage.component'

const mapStateToProps = state => ({
  currentUser: state.user.currentUser,
  getFreeTokenObj: state.token.getFreeToken,
  getUserOrderListObj: state.order.getUserOrderList,
})

const mapDispatchToProps = dispatch => ({
  getFreeToken: userId => dispatch(getFreeToken(userId)),
  getUserOrderList: ({ userId }) => dispatch(getUserOrderList({ userId })),
})

const HomePageContainer = connect(mapStateToProps, mapDispatchToProps)(HomePage)

export default HomePageContainer
