import {connect} from 'react-redux'
import {getTokens} from 'redux/token/token.actions'
import TokensWalletPage from './TokensWalletPage.component'

const mapStateToProps = state => ({
    currentUser: state.user.currentUser,
    token: state.token,
})

const mapDispatchToProps = dispatch => ({
    getTokens: userId => dispatch(getTokens(userId)),
})

const TokensWalletPageContainer = connect(mapStateToProps, mapDispatchToProps)(TokensWalletPage)

export default TokensWalletPageContainer
