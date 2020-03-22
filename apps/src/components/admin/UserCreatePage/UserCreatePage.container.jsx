import { connect } from 'react-redux'
import { createUser } from 'redux/user/user.actions'
import UserCreatePage from './UserCreatePage.component'

const mapStateToProps = state => ({
  currentUser: state.user.currentUser,
  createUserObj: state.user.createUser,
})

const mapDispatchToProps = dispatch => ({
  createUser: data => dispatch(createUser(data)),
})

const UserCreatePageContainer = connect(mapStateToProps, mapDispatchToProps)(UserCreatePage)

export default UserCreatePageContainer
