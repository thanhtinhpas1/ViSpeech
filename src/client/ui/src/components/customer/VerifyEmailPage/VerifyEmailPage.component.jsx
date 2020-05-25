import React, { useState, useEffect, useCallback } from 'react'
import { useParams, useHistory } from 'react-router-dom'
import { CUSTOMER_PATH, JWT_TOKEN } from 'utils/constant'
import STORAGE from 'utils/storage'
import Utils from 'utils'
import InfoTemplatePage from 'components/customer/InfoTemplatePage/InfoTemplatePage.component'
import SocketUtils from 'utils/socket.util'
import SocketService from 'services/socket.service'
import UserService from 'services/user.service'

const { KAFKA_TOPIC, invokeCheckSubject } = SocketUtils
const { EMAIL_VERIFIED_SUCCESS_EVENT, EMAIL_VERIFIED_FAILED_EVENT } = KAFKA_TOPIC

const VerifyEmailPage = ({
  currentUser,
  verifyEmailObj,
  verifyEmail,
  verifyEmailSuccess,
  verifyEmailFailure,
  onAuthenticate,
}) => {
  const [infoModal, setInfoModal] = useState({})
  const [infoTemplate, setInfoTemplate] = useState({})
  const { emailToken } = useParams()
  const history = useHistory()

  useEffect(() => {
    SocketService.socketEmitEvent(EMAIL_VERIFIED_SUCCESS_EVENT)
    SocketService.socketEmitEvent(EMAIL_VERIFIED_FAILED_EVENT)
    SocketService.socketOnListeningEvent(EMAIL_VERIFIED_SUCCESS_EVENT)
    SocketService.socketOnListeningEvent(EMAIL_VERIFIED_FAILED_EVENT)
  }, [])

  useEffect(() => {
    const token = STORAGE.getPreferences(JWT_TOKEN)
    onAuthenticate(token)
  }, [onAuthenticate])

  const onVerifyEmail = useCallback(async () => {
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
    try {
      await UserService.verifyEmail(emailToken)
      invokeCheckSubject.EmailVerified.subscribe(data => {
        if (data.error != null) {
          verifyEmailFailure(data.errorObj)
        } else {
          verifyEmailSuccess()
          if (data.newToken) {
            STORAGE.setPreferences(JWT_TOKEN, data.newToken)
          }
        }
      })
    } catch (err) {
      verifyEmailFailure({ message: err.message })
    }
  }, [currentUser.roles, history, emailToken, verifyEmailObj, verifyEmail, verifyEmailSuccess, verifyEmailFailure])

  useEffect(() => {
    if (Utils.isEmailVerified(currentUser.roles)) {
      setInfoTemplate({
        title: 'Kích hoạt tài khoản',
        user: currentUser,
        content: 'Tài khoản của bạn đã được kích hoạt.',
        positiveButton: {
          content: 'Về trang cá nhân',
          clickFunc: () => history.push(`${CUSTOMER_PATH}/profile`),
        },
      })
    } else {
      setInfoTemplate({
        title: 'Kích hoạt tài khoản',
        user: currentUser,
        content:
          'Bạn đã yêu cầu kích hoạt tài khoản.<br/>Nhấn vào nút kích hoạt tài khoản để có thể sử dụng nhiều thao tác trên ViSpeech.',
        positiveButton: {
          content: 'Kích hoạt tài khoản',
          clickFunc: () => onVerifyEmail(),
        },
      })
    }
  }, [currentUser, history, onVerifyEmail])

  useEffect(() => {
    if (verifyEmailObj.isLoading === false && verifyEmailObj.isSuccess != null) {
      if (verifyEmailObj.isSuccess === true) {
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
      } else {
        setInfoModal({
          title: 'Kích hoạt tài khoản',
          message: Utils.buildFailedMessage(verifyEmailObj.message, 'Thất bại'),
          icon: { isSuccess: false },
          button: {
            content: 'Đóng',
            clickFunc: () => {
              window.$('#info-modal').modal('hide')
            },
          },
        })
      }
    }
  }, [verifyEmailObj, history])

  return <InfoTemplatePage infoTemplate={infoTemplate} infoModal={infoModal} />
}

export default VerifyEmailPage
