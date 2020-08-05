import { connect } from 'react-redux'
import {
  onClearUserState,
  resetPassword,
  resetPasswordSuccess,
  resetPasswordFailure,
} from '../../../redux/user/user.actions'
import ResetPassword from './ResetPassword.component'

const mapStateToProps = state => ({
  resetPasswordObj: state.user.resetPassword,
})

const mapDispatchToProps = dispatch => ({
  onClearUserState: () => dispatch(onClearUserState()),
  resetPassword: (userId, password, token) => dispatch(resetPassword(userId, password, token)),
  resetPasswordSuccess: () => dispatch(resetPasswordSuccess()),
  resetPasswordFailure: message => dispatch(resetPasswordFailure(message)),
})

const ResetPasswordContainer = connect(mapStateToProps, mapDispatchToProps)(ResetPassword)

export default ResetPasswordContainer
