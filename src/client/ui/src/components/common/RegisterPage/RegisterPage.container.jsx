import { connect } from 'react-redux'
import {
  registerStart,
  registerSuccess,
  registerFailure,
  onClearUserState,
} from 'redux/user/user.actions'
import RegisterPage from './RegisterPage.component'

const mapStateToProps = state => ({
  currentUser: state.user.currentUser,
  registerObj: state.user.register,
})

const mapDispatchToProps = dispatch => ({
  registerStart: () => dispatch(registerStart()),
  registerSuccess: user => dispatch(registerSuccess(user)),
  registerFailure: message => dispatch(registerFailure(message)),
  onClearUserState: () => dispatch(onClearUserState()),
})

const RegisterPageContainer = connect(mapStateToProps, mapDispatchToProps)(RegisterPage)

export default RegisterPageContainer
