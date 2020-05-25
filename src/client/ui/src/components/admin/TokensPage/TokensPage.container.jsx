import { connect } from 'react-redux'
import { getTokenList, deleteToken, deleteTokenSuccess, deleteTokenFailure } from 'redux/token/token.actions'
import TokensPage from './TokensPage.component'

const mapStateToProps = state => ({
  currentUser: state.user.currentUser,
  getTokenListObj: state.token.getTokenList,
  deleteTokenObj: state.token.deleteToken,
})

const mapDispatchToProps = dispatch => ({
  getTokenList: ({ pagination, sortField, sortOrder, filters }) =>
    dispatch(getTokenList({ pagination, sortField, sortOrder, filters })),
  deleteToken: id => dispatch(deleteToken(id)),
  deleteTokenSuccess: () => dispatch(deleteTokenSuccess()),
  deleteTokenFailure: message => dispatch(deleteTokenFailure(message)),
})

const TokensPageContainer = connect(mapStateToProps, mapDispatchToProps)(TokensPage)

export default TokensPageContainer
