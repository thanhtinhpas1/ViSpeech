import { connect } from 'react-redux'
import { createProject, createProjectSuccess, createProjectFailure } from 'redux/project/project.actions'
import CreateProjectPage from './CreateProjectPage.component'

const mapStateToProps = state => ({
  currentUser: state.user.currentUser,
  createProjectObj: state.project.createProject,
})

const mapDispatchToProps = dispatch => ({
  createProject: project => dispatch(createProject(project)),
  createProjectSuccess: project => dispatch(createProjectSuccess(project)),
  createProjectFailure: message => dispatch(createProjectFailure(message)),
})

const CreateProjectPageContainer = connect(mapStateToProps, mapDispatchToProps)(CreateProjectPage)

export default CreateProjectPageContainer
