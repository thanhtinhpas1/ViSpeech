import { connect } from 'react-redux'
import { getTokenTypes } from 'redux/token/token.actions'
import { getMyProjectList } from 'redux/project/project.actions'
import TokenStatistics from './TokenStatistics.component'

const mapStateToProps = state => ({
  currentUser: state.user.currentUser,
  getTokenTypeListObj: state.token.getTokenTypeList,
  getMyProjectListObj: state.project.getMyProjectList,
})

const mapDispatchToProps = dispatch => ({
  getTokenTypes: () => dispatch(getTokenTypes()),
  getMyProjects: ({ userId }) => dispatch(getMyProjectList({ userId })),
})

const TokenStatisticsContainer = connect(mapStateToProps, mapDispatchToProps)(TokenStatistics)

export default TokenStatisticsContainer
