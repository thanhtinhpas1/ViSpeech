/* eslint-disable prefer-const */
/* eslint-disable react/no-string-refs */
/* eslint-disable no-undef */
import React, { Component } from 'react'
import PropTypes from 'prop-types'
import './AuthenWithGoogle.style.scss'

class AuthenWithGoogle extends Component {
  componentDidMount() {
    this.googleSDK()
  }

  prepareLoginButton = () => {
    this.auth2.attachClickHandler(
      this.refs.googleLoginBtn,
      {},
      googleUser => {
        const profile = googleUser.getBasicProfile()
        // console.log(`Token || ${googleUser.getAuthResponse().id_token}`)
        // console.log(`ID: ${profile.getId()}`)
        // console.log(`Name: ${profile.getName()}`)
        // console.log(`Image URL: ${profile.getImageUrl()}`)
        // console.log(`Email: ${profile.getEmail()}`)

        // const token = googleUser.getAuthResponse().id_token
        const email = profile.getEmail()
        const googleID = profile.getId()
        const displayName = profile.getName()
        const avatar = profile.getImageUrl()
        const { authenWithSocial } = this.props
        console.log('google login', email, googleID, displayName, avatar)
        authenWithSocial({ email, googleID, displayName, avatar })
      },
      error => {
        console.error(error)
      }
    )
  }

  googleSDK = () => {
    window.googleSDKLoaded = () => {
      window.gapi.load('auth2', () => {
        this.auth2 = window.gapi.auth2.init({
          client_id: '72475427681-3chf7ih6ld8ma5p9h2qruatkr254i1m7.apps.googleusercontent.com',
          cookiepolicy: 'single_host_origin',
          scope: 'profile email',
        })
        this.prepareLoginButton()
      })
    }
    ;(function(d, s, id) {
      // eslint-disable-next-line one-var
      let js,
        fjs = d.getElementsByTagName(s)[0]
      if (d.getElementById(id)) {
        return
      }
      js = d.createElement(s)
      js.id = id
      js.src = 'https://apis.google.com/js/platform.js?onload=googleSDKLoaded'
      fjs.parentNode.insertBefore(js, fjs)
    })(document, 'script', 'google-jssdk')
  }

  render() {
    return (
      <button
        type="button"
        ref="googleLoginBtn"
        className="btn btn-outline btn-dark btn-google btn-block"
      >
        <em className="fab fa-google" />
        <span>Google</span>
      </button>
    )
  }
}

AuthenWithGoogle.propTypes = {
  authenWithSocial: PropTypes.func.isRequired,
}

export default AuthenWithGoogle
