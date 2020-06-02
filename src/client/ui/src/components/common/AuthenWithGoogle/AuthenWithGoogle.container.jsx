import { connect } from 'react-redux'
import { authenWithSocial } from 'redux/user/user.actions'
import AuthenWithGoogle from './AuthenWithGoogle.component'

const mapStateToProps = state => ({
  loginObj: state.user.login,
})

const mapDispatchToProps = dispatch => ({
  authenWithSocial: user => dispatch(authenWithSocial(user)),
})

const AuthenWithGoogleContainer = connect(mapStateToProps, mapDispatchToProps)(AuthenWithGoogle)

export default AuthenWithGoogleContainer
