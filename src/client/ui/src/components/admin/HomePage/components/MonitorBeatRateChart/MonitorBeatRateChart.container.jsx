import { connect } from 'react-redux'
import { getMonitorList } from 'redux/monitor/monitor.actions'
import MonitorBeatRateChart from './MonitorBeatRateChart.component'

const mapStateToProps = state => ({
  currentUser: state.user.currentUser,
  getMonitorListObj: state.monitor.getMonitorList,
})

const mapDispatchToProps = dispatch => ({
  getMonitorList: ({ pagination, sortField, sortOrder, filters }) =>
    dispatch(getMonitorList({ pagination, sortField, sortOrder, filters })),
})

const MonitorBeatRateChartContainer = connect(mapStateToProps, mapDispatchToProps)(MonitorBeatRateChart)

export default MonitorBeatRateChartContainer
