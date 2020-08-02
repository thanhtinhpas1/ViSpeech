import { connect } from 'react-redux'
import { getUsernameList } from '../../../../../redux/user/user.actions'
import { getProjectNameList } from '../../../../../redux/project/project.actions'
import FilterForm from './FilterForm.component'

const mapStateToProps = state => ({
  currentUser: state.user.currentUser,
  getUsernameListObj: state.user.getUsernameList,
  getProjectNameListObj: state.project.getProjectNameList,
})

const mapDispatchToProps = dispatch => ({
  getUsernameList: ({ pagination, sortField, sortOrder, filters }) =>
    dispatch(getUsernameList({ pagination, sortField, sortOrder, filters })),
  getProjectNameList: ({ pagination, sortField, sortOrder, filters }) =>
    dispatch(getProjectNameList({ pagination, sortField, sortOrder, filters })),
})

const FilterFormContainer = connect(mapStateToProps, mapDispatchToProps)(FilterForm)

export default FilterFormContainer
