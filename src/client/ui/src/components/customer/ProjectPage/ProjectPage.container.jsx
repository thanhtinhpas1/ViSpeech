import { connect } from 'react-redux'
import { getMyProjectList, getAcceptedProjectList } from 'redux/project/project.actions'
import ProjectPage from './ProjectPage.component'

const mapStateToProps = state => ({
  currentUser: state.user.currentUser,
  getMyProjectListObj: state.project.getMyProjectList,
  getAcceptedProjectListObj: state.project.getAcceptedProjectList,
})

const mapDispatchToProps = dispatch => ({
  getMyProjects: ({ userId, pagination, sortField, sortOrder, filters }) =>
    dispatch(getMyProjectList({ userId, pagination, sortField, sortOrder, filters })),
  getAcceptedProjects: ({ userId, pagination, sortField, sortOrder, filters }) =>
    dispatch(getAcceptedProjectList({ userId, pagination, sortField, sortOrder, filters })),
})

const ProjectPageContainer = connect(mapStateToProps, mapDispatchToProps)(ProjectPage)

export default ProjectPageContainer
