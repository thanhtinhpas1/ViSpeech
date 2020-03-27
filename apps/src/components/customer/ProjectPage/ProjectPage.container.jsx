import { connect } from 'react-redux'
import { getTokens } from 'redux/token/token.actions'
import ProjectPage from './ProjectPage.component'

const mapStateToProps = state => ({
  currentUser: state.user.currentUser,
  token: state.token,
})

const mapDispatchToProps = dispatch => ({
  getTokens: userId => dispatch(getTokens(userId)),
})

const ProjectPageContainer = connect(mapStateToProps, mapDispatchToProps)(ProjectPage)

export default ProjectPageContainer
