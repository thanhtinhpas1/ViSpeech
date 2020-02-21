import { connect } from 'react-redux'
import { authenticate, logout } from 'redux/user/user.actions'
import Header from './Header.component'

const mapStateToProps = state => ({
  currentUser: state.user.currentUser,
})

const mapDispatchToProps = dispatch => ({
  onAuthenticate: token => dispatch(authenticate(token)),
  logout: () => dispatch(logout()),
})

const HeaderContainer = connect(mapStateToProps, mapDispatchToProps)(Header)

export default HeaderContainer
