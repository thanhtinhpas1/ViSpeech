import { connect } from 'react-redux'
import { getMonitorList } from '../../../../../redux/monitor/monitor.actions'
import MonitorBeatTimeChart from './MonitorBeatTimeChart.component'

const mapStateToProps = state => ({
  currentUser: state.user.currentUser,
  getMonitorListObj: state.monitor.getMonitorList,
})

const mapDispatchToProps = dispatch => ({
  getMonitorList: ({ pagination, sortField, sortOrder, filters }) =>
    dispatch(getMonitorList({ pagination, sortField, sortOrder, filters })),
})

const MonitorBeatTimeChartContainer = connect(mapStateToProps, mapDispatchToProps)(MonitorBeatTimeChart)

export default MonitorBeatTimeChartContainer
