import { connect } from 'react-redux'
import Footer from './Footer.component'

const mapStateToProps = state => ({
  user: state.user,
})

// const mapDispatchToProps = dispath => ({})

const FooterContainer = connect(
  mapStateToProps
  //   mapDispatchToProps
)(Footer)

export default FooterContainer
