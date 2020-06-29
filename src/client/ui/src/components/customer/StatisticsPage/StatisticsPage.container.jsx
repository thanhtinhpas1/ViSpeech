import { connect } from 'react-redux'
import StatisticsPage from './StatisticsPage.component'

const mapStateToProps = state => ({
  currentUser: state.user.currentUser,
})

const mapDispatchToProps = dispatch => ({})

const StatisticsPageContainer = connect(mapStateToProps, mapDispatchToProps)(StatisticsPage)

export default StatisticsPageContainer
