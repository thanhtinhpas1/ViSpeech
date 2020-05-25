import { connect } from 'react-redux'
import {
  getUserList,
  deleteUser,
  deleteUserSuccess,
  deleteUserFailure,
} from 'redux/user/user.actions'
import UserListPage from './UserListPage.component'

const mapStateToProps = state => ({
  currentUser: state.user.currentUser,
  userListObj: state.user.getList,
  deleteUserObj: state.user.deleteUser,
})

const mapDispatchToProps = dispatch => ({
  getUserList: ({ pagination, sortField, sortOrder, filters }) =>
    dispatch(getUserList({ pagination, sortField, sortOrder, filters })),
  deleteUser: id => dispatch(deleteUser(id)),
  deleteUserSuccess: () => dispatch(deleteUserSuccess()),
  deleteUserFailure: message => dispatch(deleteUserFailure(message)),
})

const UserListPageContainer = connect(mapStateToProps, mapDispatchToProps)(UserListPage)

export default UserListPageContainer
