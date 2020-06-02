import { connect } from 'react-redux'
import { getMyProjectList } from 'redux/project/project.actions'
import { getProjectTokenList } from 'redux/token/token.actions'
import SelectTokenForm from './SelectTokenForm.component'

const mapStateToProps = state => ({
  currentUser: state.user.currentUser,
  getMyProjectListObj: state.project.getMyProjectList,
  getProjectTokenListObj: state.token.getProjectTokenList,
})

const mapDispatchToProps = dispatch => ({
  getMyProjects: ({ userId, pagination, filters }) => dispatch(getMyProjectList({ userId, pagination, filters })),
  getProjectTokenList: ({ userId, pagination, filters }) =>
    dispatch(getProjectTokenList({ userId, pagination, filters })),
})

const SelectTokenFormContainer = connect(mapStateToProps, mapDispatchToProps)(SelectTokenForm)

export default SelectTokenFormContainer
