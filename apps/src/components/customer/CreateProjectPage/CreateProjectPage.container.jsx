import { connect } from 'react-redux'
import { createProject } from 'redux/project/project.actions'
import CreateProjectPage from './CreateProjectPage.component'

const mapStateToProps = state => ({
  currentUser: state.user.currentUser,
  createProjectObj: state.project.createProject,
})

const mapDispatchToProps = dispatch => ({
  createProject: project => dispatch(createProject(project)),
})

const CreateProjectPageContainer = connect(mapStateToProps, mapDispatchToProps)(CreateProjectPage)

export default CreateProjectPageContainer
