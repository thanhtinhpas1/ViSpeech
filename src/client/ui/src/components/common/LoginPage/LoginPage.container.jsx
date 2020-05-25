import { connect } from 'react-redux'
import LoginPage from './LoginPage.component'
import { loginStart, onClearUserState } from '../../../redux/user/user.actions'

const mapStateToProps = state => ({
  currentUser: state.user.currentUser,
  loginObj: state.user.login,
})

const mapDispatchToProps = dispatch => ({
  login: user => dispatch(loginStart(user)),
  onClearUserState: () => dispatch(onClearUserState()),
})

const LoginPageContainer = connect(mapStateToProps, mapDispatchToProps)(LoginPage)

export default LoginPageContainer
