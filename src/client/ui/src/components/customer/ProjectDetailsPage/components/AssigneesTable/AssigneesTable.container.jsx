import { connect } from 'react-redux'
import AssigneesTable from './AssigneesTable.component'
import { getProjectAssigneeList } from '../../../../../redux/user/user.actions'

const mapStateToProps = state => ({
  currentUser: state.user.currentUser,
  getProjectAssigneeListObj: state.user.getProjectAssigneeList,
})

const mapDispatchToProps = dispatch => ({
  getProjectAssignees: projectId => dispatch(getProjectAssigneeList(projectId)),
})

const AssigneesTableContainer = connect(mapStateToProps, mapDispatchToProps)(AssigneesTable)

export default AssigneesTableContainer
