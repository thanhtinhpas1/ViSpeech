import { connect } from 'react-redux'
import Footer from './Footer.component'

const mapStateToProps = state => ({
  user: state.user,
})

const FooterContainer = connect(
  mapStateToProps
)(Footer)

export default FooterContainer
