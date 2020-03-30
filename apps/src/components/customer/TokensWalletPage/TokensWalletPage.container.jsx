import { connect } from 'react-redux'
import { getTokenList } from 'redux/token/token.actions'
import { getProjectInfo } from 'redux/project/project.actions'
import TokensWalletPage from './TokensWalletPage.component'

const mapStateToProps = state => ({
  currentUser: state.user.currentUser,
  getTokenListObj: state.token.getTokenList,
  getProjectInfoObj: state.project.getInfo,
})

const mapDispatchToProps = dispatch => ({
  getProjectInfo: projectId => dispatch(getProjectInfo(projectId)),
  getTokens: ({ userId, projectId, pageIndex, pageSize }) =>
    dispatch(getTokenList({ userId, projectId, pageIndex, pageSize })),
})

const TokensWalletPageContainer = connect(mapStateToProps, mapDispatchToProps)(TokensWalletPage)

export default TokensWalletPageContainer
