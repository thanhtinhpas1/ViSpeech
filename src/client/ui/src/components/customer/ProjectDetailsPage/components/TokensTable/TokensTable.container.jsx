import { connect } from 'react-redux'
import { getProjectTokenList, onClearGetProjectTokenState } from '../../../../../redux/token/token.actions'
import TokensTable from './TokensTable.component'

const mapStateToProps = state => ({
  currentUser: state.user.currentUser,
  getProjectTokenListObj: state.token.getProjectTokenList,
})

const mapDispatchToProps = dispatch => ({
  clearGetProjectTokenState: () => dispatch(onClearGetProjectTokenState()),
  getProjectTokens: ({ userId, projectId, assigneeId, pagination, sortField, sortOrder, filters }) =>
    dispatch(getProjectTokenList({ userId, projectId, assigneeId, pagination, sortField, sortOrder, filters })),
})

const TokensTableContainer = connect(mapStateToProps, mapDispatchToProps)(TokensTable)

export default TokensTableContainer
