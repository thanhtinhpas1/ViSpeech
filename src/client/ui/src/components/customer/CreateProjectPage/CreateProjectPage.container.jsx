import { connect } from 'react-redux'
import {
  createProject,
  createProjectFailure,
  createProjectSuccess,
  onClearCreateProjectState,
} from 'redux/project/project.actions'
import CreateProjectPage from './CreateProjectPage.component'

const mapStateToProps = state => ({
  currentUser: state.user.currentUser,
  createProjectObj: state.project.createProject,
})

const mapDispatchToProps = dispatch => ({
  clearCreateProjectState: () => dispatch(onClearCreateProjectState()),
  createProject: project => dispatch(createProject(project)),
  createProjectSuccess: project => dispatch(createProjectSuccess(project)),
  createProjectFailure: message => dispatch(createProjectFailure(message)),
})

const CreateProjectPageContainer = connect(mapStateToProps, mapDispatchToProps)(CreateProjectPage)

export default CreateProjectPageContainer
