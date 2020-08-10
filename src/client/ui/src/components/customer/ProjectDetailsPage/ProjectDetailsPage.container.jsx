import { connect } from 'react-redux'
import { getProjectInfo } from '../../../redux/project/project.actions'
import ProjectDetailsPage from './ProjectDetailsPage.component'

const mapStateToProps = state => ({
  currentUser: state.user.currentUser,
  getProjectInfoObj: state.project.getInfo,
})

const mapDispatchToProps = dispatch => ({
  getProjectInfo: projectId => dispatch(getProjectInfo(projectId)),
})

const ProjectDetailsPageContainer = connect(mapStateToProps, mapDispatchToProps)(ProjectDetailsPage)

export default ProjectDetailsPageContainer
