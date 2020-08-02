/* eslint-disable no-underscore-dangle */
import React, { useState, useEffect, useCallback, useRef } from 'react'
import { useParams, useHistory } from 'react-router-dom'
import { CUSTOMER_PATH, JWT_TOKEN, DEFAULT_ERR_MESSAGE, TIMEOUT_MILLISECONDS } from '../../../utils/constant'
import STORAGE from '../../../utils/storage'
import Utils from '../../../utils'
import InfoTemplatePage from '../InfoTemplatePage/InfoTemplatePage.component'
import SocketUtils from '../../../utils/socket.util'
import SocketService from '../../../services/socket.service'
import UserService from '../../../services/user.service'

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
  const loadingRef = useRef(verifyEmailObj.isLoading)
  loadingRef.current = verifyEmailObj.isLoading

  useEffect(() => {
    SocketService.socketOnListeningEvent(EMAIL_VERIFIED_SUCCESS_EVENT)
    SocketService.socketOnListeningEvent(EMAIL_VERIFIED_FAILED_EVENT)
  }, [])

  const closeInfoModal = useCallback(() => {
    setInfoModal(i => {
      return { ...i, visible: false }
    })
  }, [])

  useEffect(() => {
    const token = STORAGE.getPreferences(JWT_TOKEN)
    onAuthenticate(token)
  }, [onAuthenticate])

  const onVerifyEmail = useCallback(async () => {
    let infoObj = {
      visible: true,
      title: 'Kích hoạt tài khoản',
      message: 'Tài khoản của bạn đã được kích hoạt.',
      icon: { isSuccess: true },
      button: {
        content: 'Về trang cá nhân',
        clickFunc: () => {
          closeInfoModal()
          history.push(`${CUSTOMER_PATH}/profile`)
        },
      },
      onCancel: () => closeInfoModal(),
    }

    // 2 cases: refresh page or click verify button again
    if (
      Utils.isEmailVerified(currentUser.roles) ||
      (verifyEmailObj.isLoading === false && verifyEmailObj.isSuccess === true)
    ) {
      setInfoModal(infoObj)
      return
    }

    infoObj = {
      visible: true,
      title: 'Kích hoạt tài khoản',
      message: 'Vui lòng chờ giây lát...',
      icon: {
        isLoading: true,
      },
      onCancel: () => closeInfoModal(),
    }
    setInfoModal(infoObj)

    verifyEmail(emailToken)
    try {
      await UserService.verifyEmail(emailToken)
      const unsubscribe$ = invokeCheckSubject.EmailVerified.subscribe(data => {
        if (data.error != null) {
          verifyEmailFailure(data.errorObj)
        } else {
          verifyEmailSuccess()
          if (data.newToken) {
            STORAGE.setPreferences(JWT_TOKEN, data.newToken)
          }
        }
        unsubscribe$.unsubscribe()
        unsubscribe$.complete()
      })
    } catch (err) {
      verifyEmailFailure({ message: err.message })
    }
  }, [
    currentUser.roles,
    history,
    emailToken,
    verifyEmailObj,
    verifyEmail,
    verifyEmailSuccess,
    verifyEmailFailure,
    closeInfoModal,
  ])

  useEffect(() => {
    const decodedToken = Utils.decodeJwtToken(emailToken)
    if (decodedToken.exp && decodedToken.id) {
      if (decodedToken.id !== currentUser._id) {
        setInfoTemplate({
          title: 'Kích hoạt tài khoản',
          user: currentUser,
          content: 'Xin lỗi! Yêu cầu kích hoạt tài khoản này không phải của bạn.',
          positiveButton: {
            content: 'Về trang cá nhân',
            clickFunc: () => history.push(`${CUSTOMER_PATH}/profile`),
          },
        })
      } else if (Utils.isEmailVerified(currentUser.roles)) {
        setInfoTemplate({
          title: 'Kích hoạt tài khoản',
          user: currentUser,
          content: 'Tài khoản của bạn đã được kích hoạt.',
          positiveButton: {
            content: 'Về trang cá nhân',
            clickFunc: () => history.push(`${CUSTOMER_PATH}/profile`),
          },
        })
      } else if (Number(`${decodedToken.exp}000`) < Date.now()) {
        setInfoTemplate({
          title: 'Kích hoạt tài khoản',
          user: currentUser,
          content: 'Xin lỗi! Yêu cầu kích hoạt tài khoản của bạn đã hết hiệu lực.',
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
            'Bạn đã yêu cầu kích hoạt tài khoản.<br/>Nhấn vào nút kích hoạt tài khoản để có thể sử dụng nhiều thao tác trên VietSpeech.',
          positiveButton: {
            content: 'Kích hoạt tài khoản',
            clickFunc: () => onVerifyEmail(),
          },
        })
      }
    }
  }, [currentUser, emailToken, history, onVerifyEmail])

  useEffect(() => {
    let timer = null
    if (verifyEmailObj.isLoading === true) {
      timer = setTimeout(() => {
        if (loadingRef.current === true) {
          verifyEmailFailure({ message: DEFAULT_ERR_MESSAGE })
        }
      }, TIMEOUT_MILLISECONDS)
    }
    if (verifyEmailObj.isLoading === false && verifyEmailObj.isSuccess != null) {
      if (verifyEmailObj.isSuccess === true) {
        setInfoModal({
          visible: true,
          title: 'Kích hoạt tài khoản',
          message: 'Tài khoản của bạn đã được kích hoạt thành công.',
          icon: { isSuccess: true },
          button: {
            content: 'Về trang cá nhân',
            clickFunc: () => {
              closeInfoModal()
              history.push(`${CUSTOMER_PATH}/profile`)
            },
          },
          onCancel: () => {
            closeInfoModal()
          },
        })
      } else {
        setInfoModal({
          visible: true,
          title: 'Kích hoạt tài khoản',
          message: Utils.buildFailedMessage(verifyEmailObj.message, 'Thất bại'),
          icon: { isSuccess: false },
          button: {
            content: 'Đóng',
            clickFunc: () => {
              closeInfoModal()
            },
          },
          onCancel: () => {
            closeInfoModal()
          },
        })
      }
    }
    return () => clearTimeout(timer)
  }, [verifyEmailObj, history, closeInfoModal, verifyEmailFailure])

  return <InfoTemplatePage infoTemplate={infoTemplate} infoModal={infoModal} />
}

export default VerifyEmailPage
