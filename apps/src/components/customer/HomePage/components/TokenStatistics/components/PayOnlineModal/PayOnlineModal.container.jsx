import { connect } from 'react-redux'
import { getMyProjectList } from 'redux/project/project.actions'
import PayOnlineModal from './PayOnlineModal.component'

const mapStateToProps = state => ({
  currentUser: state.user.currentUser,
  getMyProjectListObj: state.project.getMyProjectList,
})

const mapDispatchToProps = dispatch => ({
  getMyProjects: ({ userId }) => dispatch(getMyProjectList({ userId })),
})

const PayOnlineModalContainer = connect(mapStateToProps, mapDispatchToProps)(PayOnlineModal)

export default PayOnlineModalContainer
