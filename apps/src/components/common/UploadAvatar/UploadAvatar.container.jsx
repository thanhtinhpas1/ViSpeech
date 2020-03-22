import { connect } from 'react-redux'
import { updateAvatarClear, updateAvatar } from 'redux/user/user.actions'
import UploadAvatar from './UploadAvatar.component'

const mapStateToProps = state => ({
  currentUser: state.user.currentUser,
  updateAvatar: state.user.updateAvatar,
})
const mapDispatchToProps = dispatch => ({
  updateAvatarClear: () => dispatch(updateAvatarClear()),
  onUpdateAvatar: ({ avatar, token }) => dispatch(updateAvatar({ avatar, token })),
})

const UploadAvatarContainer = connect(mapStateToProps, mapDispatchToProps)(UploadAvatar)

export default UploadAvatarContainer
