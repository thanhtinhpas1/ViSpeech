import { connect } from 'react-redux'
import ForgetPassword from './ForgetPassword.component'
import {
  onClearUserState,
  sendResetPasswordEmail,
  sendResetPasswordEmailSuccess,
  sendResetPasswordEmailFailure,
} from '../../../redux/user/user.actions'

const mapStateToProps = state => ({
  sendResetPasswordEmailObj: state.user.sendResetPasswordEmail,
})

const mapDispatchToProps = dispatch => ({
  onClearUserState: () => dispatch(onClearUserState()),
  sendResetPasswordEmail: email => dispatch(sendResetPasswordEmail(email)),
  sendResetPasswordEmailSuccess: () => dispatch(sendResetPasswordEmailSuccess()),
  sendResetPasswordEmailFailure: message => dispatch(sendResetPasswordEmailFailure(message)),
})

const ForgetPasswordContainer = connect(mapStateToProps, mapDispatchToProps)(ForgetPassword)

export default ForgetPasswordContainer
