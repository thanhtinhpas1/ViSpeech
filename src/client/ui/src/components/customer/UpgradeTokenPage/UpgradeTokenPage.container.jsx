import { connect } from 'react-redux'
import { getTokenTypes, getProjectTokenList } from 'redux/token/token.actions'
import { getMyProjectList } from 'redux/project/project.actions'
import UpgradeTokenPage from './UpgradeTokenPage.component'

const mapStateToProps = state => ({
  currentUser: state.user.currentUser,
})

const mapDispatchToProps = dispatch => ({
  getTokenTypes: () => dispatch(getTokenTypes()),
  getMyProjects: ({ userId, pagination, filters }) => dispatch(getMyProjectList({ userId, pagination, filters })),
  getProjectTokenList: ({ userId, projectId, pagination, filters }) =>
    dispatch(getProjectTokenList({ userId, projectId, pagination, filters })),
})

const UpgradeTokenPageContainer = connect(mapStateToProps, mapDispatchToProps)(UpgradeTokenPage)

export default UpgradeTokenPageContainer
