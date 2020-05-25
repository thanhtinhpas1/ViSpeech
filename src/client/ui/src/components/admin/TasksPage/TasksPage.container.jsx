import { connect } from 'react-redux'
import { getTaskList } from 'redux/task/task.actions'
import TasksPage from './TasksPage.component'

const mapStateToProps = state => ({
  currentUser: state.user.currentUser,
  taskListObj: state.task.getList,
})

const mapDispatchToProps = dispatch => ({
  getTaskList: ({ pagination, sortField, sortOrder, filters }) => dispatch(getTaskList({ pagination, sortField, sortOrder, filters })),
})

const TasksPageContainer = connect(mapStateToProps, mapDispatchToProps)(TasksPage)

export default TasksPageContainer
