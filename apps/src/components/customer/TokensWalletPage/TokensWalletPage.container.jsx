import { connect } from 'react-redux'
import { getTokenList } from 'redux/token/token.actions'
import TokensWalletPage from './TokensWalletPage.component'

const mapStateToProps = state => ({
  currentUser: state.user.currentUser,
  getTokenListObj: state.token.getTokenList,
})

const mapDispatchToProps = dispatch => ({
  getTokens: ({ userId, pageIndex, pageSize }) =>
    dispatch(getTokenList({ userId, pageIndex, pageSize })),
})

const TokensWalletPageContainer = connect(mapStateToProps, mapDispatchToProps)(TokensWalletPage)

export default TokensWalletPageContainer
