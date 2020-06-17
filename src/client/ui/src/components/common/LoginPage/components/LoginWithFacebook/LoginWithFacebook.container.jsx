import { connect } from 'react-redux'
import LoginWithFacebook from './LoginWithFacebook.component'

const mapStateToProps = state => ({
  currentUser: state.user.currentUser,
  loginWithSocialObj: state.user.loginWithSocial,
})

const mapDispatchToProps = dispatch => ({})

const LoginWithFacebookContainer = connect(mapStateToProps, mapDispatchToProps)(LoginWithFacebook)

export default LoginWithFacebookContainer
