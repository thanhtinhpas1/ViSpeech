import { connect } from 'react-redux'
import { authenWithSocial } from 'redux/user/user.actions'
import AuthenWithFacebook from './AuthenWithFacebook.component'

const mapStateToProps = state => ({
  loginObj: state.user.login,
})

const mapDispatchToProps = dispatch => ({
  authenWithSocial: user => dispatch(authenWithSocial(user)),
})

const AuthenWithFacebookContainer = connect(mapStateToProps, mapDispatchToProps)(AuthenWithFacebook)

export default AuthenWithFacebookContainer
