import { connect } from 'react-redux'
import { getMyProjectList, getAcceptedProjectList } from 'redux/project/project.actions'
import ProjectsTab from './ProjectsTab.component'

const mapStateToProps = state => ({
  getMyProjectListObj: state.project.getMyProjectList,
  getAcceptedProjectListObj: state.project.getAcceptedProjectList,
})

const mapDispatchToProps = dispatch => ({
  getMyProjects: ({ userId, pagination, sortField, sortOrder, filters }) =>
    dispatch(getMyProjectList({ userId, pagination, sortField, sortOrder, filters })),
  getAcceptedProjects: ({ userId, pagination, sortField, sortOrder, filters }) =>
    dispatch(getAcceptedProjectList({ userId, pagination, sortField, sortOrder, filters })),
})

const ProjectsTabContainer = connect(mapStateToProps, mapDispatchToProps)(ProjectsTab)

export default ProjectsTabContainer
