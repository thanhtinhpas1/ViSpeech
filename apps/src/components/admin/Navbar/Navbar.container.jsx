import { connect } from 'react-redux'
import { logout } from 'redux/user/user.actions'
import Navbar from './Navbar.component'

const mapStateToProps = state => ({
  currentUser: state.user.currentUser,
})

const mapDispatchToProps = dispatch => ({
  logout: () => dispatch(logout()),
})

const NavbarContainer = connect(mapStateToProps, mapDispatchToProps)(Navbar)

export default NavbarContainer
