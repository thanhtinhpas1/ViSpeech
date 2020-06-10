import { connect } from 'react-redux'
import { getTokenTypes, getProjectTokenList } from 'redux/token/token.actions'
import { getMyProjectList } from 'redux/project/project.actions'
import UpgradeForm from './UpgradeForm.component'

const mapStateToProps = state => ({
  currentUser: state.user.currentUser,
  getTokenTypeListObj: state.token.getTokenTypeList,
  getMyProjectListObj: state.project.getMyProjectList,
  getProjectTokenListObj: state.token.getProjectTokenList,
})

const mapDispatchToProps = dispatch => ({
  getTokenTypes: () => dispatch(getTokenTypes()),
  getMyProjects: ({ userId, pagination, filters }) => dispatch(getMyProjectList({ userId, pagination, filters })),
  getProjectTokenList: ({ userId, projectId, pagination, filters }) =>
    dispatch(getProjectTokenList({ userId, projectId, pagination, filters })),
})

const UpgradeFormContainer = connect(mapStateToProps, mapDispatchToProps)(UpgradeForm)

export default UpgradeFormContainer
