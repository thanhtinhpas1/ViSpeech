import { connect } from 'react-redux'
import {
  loginStart,
  onClearUserState,
  loginWithSocial,
  loginWithSocialSuccess,
  loginWithSocialFailure,
} from 'redux/user/user.actions'
import LoginPage from './LoginPage.component'

const mapStateToProps = state => ({
  currentUser: state.user.currentUser,
  loginObj: state.user.login,
  loginWithSocialObj: state.user.loginWithSocial,
})

const mapDispatchToProps = dispatch => ({
  login: user => dispatch(loginStart(user)),
  loginWithSocial: (accessToken, userType) => dispatch(loginWithSocial(accessToken, userType)),
  loginWithSocialSuccess: user => dispatch(loginWithSocialSuccess(user)),
  loginWithSocialFailure: message => dispatch(loginWithSocialFailure(message)),
  onClearUserState: () => dispatch(onClearUserState()),
})

const LoginPageContainer = connect(mapStateToProps, mapDispatchToProps)(LoginPage)

export default LoginPageContainer
