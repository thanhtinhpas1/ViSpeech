/* eslint-disable prefer-const */
/* eslint-disable no-undef */
import React from 'react'
import FacebookLogin from 'react-facebook-login/dist/facebook-login-render-props'
import { FB_APP_ID, USER_TYPE } from 'utils/constant'

const LoginWithFacebook = ({ loginWithSocialObj, loginWithSocial }) => {
  const responseFacebook = response => {
    if (response.accessToken) {
      loginWithSocial(response.accessToken, USER_TYPE.FACEBOOK)
    }
  }

  return (
    <FacebookLogin
      appId={ FB_APP_ID }
      textButton="Facebook"
      fields="name, email, picture"
      callback={ responseFacebook }
      isDisabled={ loginWithSocialObj.isLoading }
      render={ renderProps => (
        <button
          type="button"
          onClick={ renderProps.onClick }
          disabled={ renderProps.isDisabled }
          className="btn btn-outline btn-dark btn-facebook btn-block"
        >
          <em className="fab fa-facebook-f"/>
          <span>Facebook</span>
        </button>
      ) }
    />
  )
}

export default LoginWithFacebook
