import { connect } from 'react-redux'
import { getProjectTokenList, onClearGetProjectTokenState } from '../../../redux/token/token.actions'
import { getProjectInfo } from '../../../redux/project/project.actions'
import ProjectDetailsPage from './ProjectDetailsPage.component'

const mapStateToProps = state => ({
  currentUser: state.user.currentUser,
  getProjectTokenListObj: state.token.getProjectTokenList,
  getProjectInfoObj: state.project.getInfo,
})

const mapDispatchToProps = dispatch => ({
  clearGetProjectTokenState: () => dispatch(onClearGetProjectTokenState()),
  getProjectInfo: projectId => dispatch(getProjectInfo(projectId)),
  getProjectTokens: ({ userId, projectId, assigneeId, pagination, sortField, sortOrder, filters }) =>
    dispatch(getProjectTokenList({ userId, projectId, assigneeId, pagination, sortField, sortOrder, filters })),
})

const ProjectDetailsPageContainer = connect(mapStateToProps, mapDispatchToProps)(ProjectDetailsPage)

export default ProjectDetailsPageContainer
