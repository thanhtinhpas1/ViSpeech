import { connect } from 'react-redux'
import { createOrder, createOrderSuccess, createOrderFailure, onClearCreateOrderState } from 'redux/order/order.actions'
import CheckoutForm from './CheckoutForm.component'

const mapStateToProps = state => ({
  currentUser: state.user.currentUser,
  createOrderObj: state.order.createOrder,
})

const mapDispatchToProps = dispatch => ({
  clearCreateOrderState: () => dispatch(onClearCreateOrderState()),
  createOrder: order => dispatch(createOrder(order)),
  createOrderSuccess: ({ order, token }) => dispatch(createOrderSuccess({ order, token })),
  createOrderFailure: message => dispatch(createOrderFailure(message)),
})

const CheckoutFormContainer = connect(mapStateToProps, mapDispatchToProps)(CheckoutForm)

export default CheckoutFormContainer
