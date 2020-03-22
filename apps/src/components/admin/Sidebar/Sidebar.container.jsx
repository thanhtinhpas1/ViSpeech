import { connect } from 'react-redux'
import { authenticate } from 'redux/user/user.actions'
import Sidebar from './Sidebar.component'

const mapStateToProps = state => ({
  currentUser: state.user.currentUser,
})

const mapDispatchToProps = dispatch => ({
  onAuthenticate: token => dispatch(authenticate(token)),
})

const SidebarContainer = connect(mapStateToProps, mapDispatchToProps)(Sidebar)

export default SidebarContainer
