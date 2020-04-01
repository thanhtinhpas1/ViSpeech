import React, { useState, useEffect, useCallback } from 'react'
import { useParams } from 'react-router-dom'
import { CUSTOMER_PATH, JWT_TOKEN } from 'utils/constant'
import STORAGE from 'utils/storage'
import Utils from 'utils'
import InfoTemplatePage from 'components/customer/InfoTemplatePage/InfoTemplatePage.component'

const VerifyEmailPage = ({ currentUser, history, verifyEmailObj, verifyEmail, onAuthenticate }) => {
  const [infoModal, setInfoModal] = useState({})
  const [infoTemplate, setInfoTemplate] = useState({})
  const { emailToken } = useParams()

  const onVerifyEmail = useCallback(() => {
    let infoObj = {
      title: 'Kích hoạt tài khoản',
      message: 'Tài khoản của bạn đã được kích hoạt.',
      icon: { isSuccess: true },
      button: {
        content: 'Về trang cá nhân',
        clickFunc: () => {
          window.$('#info-modal').modal('hide')
          history.push(`${CUSTOMER_PATH}/profile`)
        },
      },
    }

    // 2 cases: refresh page or click verify button again
    if (
      Utils.isEmailVerified(currentUser.roles) ||
      (verifyEmailObj.isLoading === false && verifyEmailObj.isSuccess === true)
    ) {
      setInfoModal(infoObj)
      window.$('#info-modal').modal('show')
      return
    }

    infoObj = {
      title: 'Kích hoạt tài khoản',
      message: 'Vui lòng chờ giây lát...',
      icon: {
        isLoading: true,
      },
    }
    setInfoModal(infoObj)
    window.$('#info-modal').modal('show')
    verifyEmail(emailToken)
  }, [currentUser.roles, history, emailToken, verifyEmail, verifyEmailObj])

  useEffect(() => {
    const token = STORAGE.getPreferences(JWT_TOKEN)
    onAuthenticate(token)
  }, [onAuthenticate])

  useEffect(() => {
    const infoTemplateObj = {
      title: 'Kích hoạt tài khoản',
      user: currentUser,
      positiveButton: {
        content: 'Kích hoạt tài khoản',
        clickFunc: () => onVerifyEmail(),
      },
    }
    setInfoTemplate(infoTemplateObj)
  }, [currentUser, onVerifyEmail])

  useEffect(() => {
    if (verifyEmailObj.isLoading === false && verifyEmailObj.isSuccess === true) {
      setInfoModal({
        title: 'Kích hoạt tài khoản',
        message: 'Tài khoản của bạn đã được kích hoạt thành công.',
        icon: { isSuccess: true },
        button: {
          content: 'Về trang cá nhân',
          clickFunc: () => {
            window.$('#info-modal').modal('hide')
            history.push(`${CUSTOMER_PATH}/profile`)
          },
        },
      })
    }
    if (verifyEmailObj.isLoading === false && verifyEmailObj.isSuccess === false) {
      setInfoModal({
        title: 'Kích hoạt tài khoản',
        message: 'Kích hoạt tài khoản thất bại. Vui lòng thử lại sau.',
        icon: { isSuccess: false },
      })
    }
  }, [verifyEmailObj, history])

  return <InfoTemplatePage infoTemplate={infoTemplate} infoModal={infoModal} />
}

export default VerifyEmailPage
