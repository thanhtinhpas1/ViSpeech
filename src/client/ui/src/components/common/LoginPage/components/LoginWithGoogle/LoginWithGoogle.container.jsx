import { connect } from 'react-redux'
import LoginWithGoogle from './LoginWithGoogle.component'

const mapStateToProps = state => ({
  currentUser: state.user.currentUser,
  loginWithSocialObj: state.user.loginWithSocial,
})

const mapDispatchToProps = dispatch => ({})

const LoginWithGoogleContainer = connect(mapStateToProps, mapDispatchToProps)(LoginWithGoogle)

export default LoginWithGoogleContainer
