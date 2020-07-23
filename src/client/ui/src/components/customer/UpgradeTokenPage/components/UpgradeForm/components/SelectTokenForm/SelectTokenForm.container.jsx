import { connect } from 'react-redux'
import { getMyProjectList } from 'redux/project/project.actions'
import { getProjectTokenList, onClearGetProjectTokenState } from 'redux/token/token.actions'
import SelectTokenForm from './SelectTokenForm.component'

const mapStateToProps = state => ({
  currentUser: state.user.currentUser,
  getMyProjectListObj: state.project.getMyProjectList,
  getProjectTokenListObj: state.token.getProjectTokenList,
  createOrderToUpgradeObj: state.order.createOrderToUpgrade,
})

const mapDispatchToProps = dispatch => ({
  clearGetProjectTokenState: () => dispatch(onClearGetProjectTokenState()),
  getMyProjects: ({ userId, pagination, filters }) => dispatch(getMyProjectList({ userId, pagination, filters })),
  getProjectTokenList: ({ userId, projectId, pagination, filters }) =>
    dispatch(getProjectTokenList({ userId, projectId, pagination, filters })),
})

const SelectTokenFormContainer = connect(mapStateToProps, mapDispatchToProps)(SelectTokenForm)

export default SelectTokenFormContainer
