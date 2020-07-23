import { connect } from 'react-redux'
import { createOrder, createOrderSuccess, createOrderFailure, onClearCreateOrderState } from 'redux/order/order.actions'
import { getProjectTokenList, onClearGetProjectTokenState } from 'redux/token/token.actions'
import CheckoutForm from './CheckoutForm.component'

const mapStateToProps = state => ({
  currentUser: state.user.currentUser,
  createOrderObj: state.order.createOrder,
  getProjectTokenListObj: state.token.getProjectTokenList,
})

const mapDispatchToProps = dispatch => ({
  clearCreateOrderState: () => dispatch(onClearCreateOrderState()),
  clearGetProjectTokenState: () => dispatch(onClearGetProjectTokenState()),
  createOrder: order => dispatch(createOrder(order)),
  createOrderSuccess: ({ order, token }) => dispatch(createOrderSuccess({ order, token })),
  createOrderFailure: message => dispatch(createOrderFailure(message)),
  getProjectTokenList: ({ userId, projectId, pagination, filters }) =>
    dispatch(getProjectTokenList({ userId, projectId, pagination, filters })),
})

const CheckoutFormContainer = connect(mapStateToProps, mapDispatchToProps)(CheckoutForm)

export default CheckoutFormContainer
