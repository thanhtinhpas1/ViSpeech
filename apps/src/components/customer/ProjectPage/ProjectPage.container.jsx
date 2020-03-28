import { connect } from 'react-redux'
import { getMyProjectList, getAcceptedProjectList } from 'redux/project/project.actions'
import ProjectPage from './ProjectPage.component'

const mapStateToProps = state => ({
  currentUser: state.user.currentUser,
  getMyProjectListObj: state.project.getMyProjectList,
  getAcceptedProjectListObj: state.project.getAcceptedProjectList,
})

const mapDispatchToProps = dispatch => ({
  getMyProjects: ({ userId, pageIndex, pageSize }) =>
    dispatch(getMyProjectList({ userId, pageIndex, pageSize })),
  getAcceptedProjects: ({ userId, pageIndex, pageSize }) =>
    dispatch(getAcceptedProjectList({ userId, pageIndex, pageSize })),
})

const ProjectPageContainer = connect(mapStateToProps, mapDispatchToProps)(ProjectPage)

export default ProjectPageContainer
