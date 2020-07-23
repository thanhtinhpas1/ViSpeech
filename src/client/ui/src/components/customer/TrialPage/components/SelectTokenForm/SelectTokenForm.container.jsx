import { connect } from 'react-redux'
import { getMyProjectList, getAcceptedProjectList } from 'redux/project/project.actions'
import { getProjectTokenList, onClearGetProjectTokenState, getFreeToken } from 'redux/token/token.actions'
import SelectTokenForm from './SelectTokenForm.component'

const mapStateToProps = state => ({
  currentUser: state.user.currentUser,
  getMyProjectListObj: state.project.getMyProjectList,
  getAcceptedProjectListObj: state.project.getAcceptedProjectList,
  getProjectTokenListObj: state.token.getProjectTokenList,
  getFreeTokenObj: state.token.getFreeToken,
})

const mapDispatchToProps = dispatch => ({
  clearGetProjectTokenState: () => dispatch(onClearGetProjectTokenState()),
  getFreeToken: userId => dispatch(getFreeToken(userId)),
  getMyProjects: ({ userId, pagination, filters }) => dispatch(getMyProjectList({ userId, pagination, filters })),
  getAcceptedProjectList: ({ userId, pagination, filters }) =>
    dispatch(getAcceptedProjectList({ userId, pagination, filters })),
  getProjectTokenList: ({ userId, projectId, pagination, filters }) =>
    dispatch(getProjectTokenList({ userId, projectId, pagination, filters })),
})

const SelectTokenFormContainer = connect(mapStateToProps, mapDispatchToProps)(SelectTokenForm)

export default SelectTokenFormContainer
