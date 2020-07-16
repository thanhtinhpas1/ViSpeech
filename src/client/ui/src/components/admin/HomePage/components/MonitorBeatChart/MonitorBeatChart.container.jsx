import { connect } from 'react-redux'
import { getMonitorList } from 'redux/monitor/monitor.actions'
import MonitorBeatChart from './MonitorBeatChart.component'

const mapStateToProps = state => ({
  currentUser: state.user.currentUser,
  getMonitorListObj: state.monitor.getMonitorList,
})

const mapDispatchToProps = dispatch => ({
  getMonitorList: ({ pagination, sortField, sortOrder, filters }) =>
    dispatch(getMonitorList({ pagination, sortField, sortOrder, filters })),
})

const MonitorBeatChartContainer = connect(mapStateToProps, mapDispatchToProps)(MonitorBeatChart)

export default MonitorBeatChartContainer
