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
      appId={FB_APP_ID}
      textButton="Facebook"
      fields="name, email, picture"
      callback={responseFacebook}
      isDisabled={loginWithSocialObj.isLoading}
      render={renderProps => (
        <button
          type="button"
          onClick={renderProps.onClick}
          disabled={renderProps.isDisabled}
          className="btn btn-outline btn-dark btn-facebook btn-block"
        >
          <em className="fab fa-facebook-f" />
          <span>Facebook</span>
        </button>
      )}
    />
  )

  // const fbLibrary = () => {
  //   window.fbAsyncInit = () => {
  //     FB.init({
  //       appId: '192774708560872',
  //       cookie: true,
  //       xfbml: true,
  //       version: 'v7.0',
  //     })
  //     FB.AppEvents.logPageView()
  //   }
  //   ;(function(d, s, id) {
  //     // eslint-disable-next-line one-var
  //     let js,
  //       fjs = d.getElementsByTagName(s)[0]
  //     if (d.getElementById(id)) {
  //       return
  //     }
  //     // eslint-disable-next-line prefer-const
  //     js = d.createElement(s)
  //     js.id = id
  //     js.src = 'https://connect.facebook.net/en_US/sdk.js'
  //     fjs.parentNode.insertBefore(js, fjs)
  //   })(document, 'script', 'facebook-jssdk')
  // }
  // useEffect(() => {
  //   fbLibrary()
  // }, [fbLibrary])
  // const login = async () => {
  //   await FB.login(
  //     response => {
  //       // const token = response.authResponse.accessToken
  //       // console.log('token', token)
  //       if (response.authResponse) {
  //         FB.api(
  //           '/me',
  //           {
  //             fields: 'last_name, first_name, email, picture',
  //           },
  //           userInfo => {
  //             console.log('facebook user information')
  //             console.log(userInfo)
  //             const { email } = userInfo
  //             const facebookID = userInfo.id
  //             const displayName = userInfo.firstName + userInfo.lastName
  //             const avatar = userInfo.picture.data.url
  //             loginWithSocial({
  //               email,
  //               facebookID,
  //               displayName,
  //               avatar,
  //             })
  //           }
  //         )
  //       } else {
  //         console.log('User login failed')
  //       }
  //     },
  //     { scope: 'public_profile,email' }
  //   )
  // }
  // return (
  //   <button type="button" onClick={login} className="btn btn-outline btn-dark btn-facebook btn-block">
  //     <em className="fab fa-facebook-f" />
  //     <span>Facebook</span>
  //   </button>
  // )
}

export default LoginWithFacebook
