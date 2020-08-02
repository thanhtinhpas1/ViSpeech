/* eslint-disable no-underscore-dangle */
import React, { useState, useEffect, useCallback, useRef } from 'react'
import { useParams, useHistory } from 'react-router-dom'
import { CUSTOMER_PATH, JWT_TOKEN, STATUS, TIMEOUT_MILLISECONDS, DEFAULT_ERR_MESSAGE } from '../../../utils/constant'
import STORAGE from '../../../utils/storage'
import InfoTemplatePage from '../InfoTemplatePage/InfoTemplatePage.component'
import SocketUtils from '../../../utils/socket.util'
import SocketService from '../../../services/socket.service'
import PermissionService from '../../../services/permission.service'
import Utils from '../../../utils'

const { KAFKA_TOPIC, invokeCheckSubject } = SocketUtils
const { PERMISSION_ASSIGN_REPLIED_SUCCESS_EVENT, PERMISSION_ASSIGN_REPLIED_FAILED_EVENT } = KAFKA_TOPIC

const ReplyPermissionAssignPage = ({
  currentUser,
  findPermissionByEmailTokenObj,
  replyPermissionAssignObj,
  findPermissionByEmailToken,
  replyPermissionAssign,
  replyPermissionAssignSuccess,
  replyPermissionAssignFailure,
  onAuthenticate,
}) => {
  const [infoModal, setInfoModal] = useState({})
  const [infoTemplate, setInfoTemplate] = useState({})
  const { emailToken } = useParams()
  const history = useHistory()
  const loadingRef = useRef(replyPermissionAssignObj.isLoading)
  loadingRef.current = replyPermissionAssignObj.isLoading

  useEffect(() => {
    SocketService.socketOnListeningEvent(PERMISSION_ASSIGN_REPLIED_SUCCESS_EVENT)
    SocketService.socketOnListeningEvent(PERMISSION_ASSIGN_REPLIED_FAILED_EVENT)
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

  useEffect(() => {
    if (currentUser._id) {
      const decodedToken = Utils.decodeJwtToken(emailToken)
      if (decodedToken.assigneeId === currentUser._id) {
        // time expire will be server authorize instead of client side
        findPermissionByEmailToken(emailToken)
      } else {
        setInfoTemplate({
          title: 'Phản hồi lời mời',
          user: currentUser,
          content: 'Xin lỗi! Lời mời tham gia dự án này không dành cho bạn. Bạn không có quyền phản hồi.',
          positiveButton: {
            content: 'Về trang dự án',
            clickFunc: () => history.push(`${CUSTOMER_PATH}/projects`),
          },
        })
      }
    }
  }, [currentUser, history, emailToken, findPermissionByEmailToken])

  const onReplyPermissionAssign = useCallback(
    async status => {
      let infoObj = {
        visible: true,
        title: 'Phản hồi lời mời',
        message: 'Bạn đã phản hồi lời mời tham gia dự án.',
        icon: { isSuccess: true },
        button: {
          content: 'Về trang dự án',
          clickFunc: () => {
            closeInfoModal()
            history.push(`${CUSTOMER_PATH}/projects`)
          },
        },
        onCancel: () => closeInfoModal(),
      }

      // click reply button again
      if (replyPermissionAssignObj.isLoading === false && replyPermissionAssignObj.isSuccess === true) {
        setInfoModal(infoObj)
        return
      }

      infoObj = {
        visible: true,
        title: 'Phản hồi lời mời',
        message: 'Vui lòng chờ giây lát...',
        icon: {
          isLoading: true,
        },
        onCancel: () => closeInfoModal(),
      }
      setInfoModal(infoObj)

      replyPermissionAssign({ emailToken, status })
      try {
        await PermissionService.replyPermissionAssign({ emailToken, status })
        const unsubscribe$ = invokeCheckSubject.PermissionAssignReplied.subscribe(data => {
          if (data.error != null) {
            replyPermissionAssignFailure(data.errorObj)
          } else {
            replyPermissionAssignSuccess({ emailToken, status })
          }
          unsubscribe$.unsubscribe()
          unsubscribe$.complete()
        })
      } catch (err) {
        replyPermissionAssignFailure({ message: err.message })
      }
    },
    [
      history,
      emailToken,
      replyPermissionAssignObj,
      replyPermissionAssign,
      replyPermissionAssignSuccess,
      replyPermissionAssignFailure,
      closeInfoModal,
    ]
  )

  useEffect(() => {
    // refresh page
    const { isLoading, isSuccess, data } = findPermissionByEmailTokenObj
    if (isLoading === false && isSuccess === true && data.length !== 0 && data[0].status) {
      if (data[0].status !== STATUS.PENDING.name) {
        setInfoTemplate({
          title: 'Phản hồi lời mời',
          user: currentUser,
          content: 'Bạn đã phản hồi lời mời tham gia dự án.',
          positiveButton: {
            content: 'Về trang dự án',
            clickFunc: () => history.push(`${CUSTOMER_PATH}/projects`),
          },
        })
      } else {
        setInfoTemplate({
          title: 'Phản hồi lời mời',
          user: currentUser,
          content: 'Bạn được mời tham gia dự án.<br/>Nhấn chấp nhận hoặc từ chối để phản hồi lời mời.',
          positiveButton: {
            content: STATUS.ACCEPTED.viText,
            clickFunc: () => onReplyPermissionAssign(STATUS.ACCEPTED.name),
          },
          negativeButton: {
            content: STATUS.REJECTED.viText,
            clickFunc: () => onReplyPermissionAssign(STATUS.REJECTED.name),
          },
        })
      }
    }
  }, [currentUser, findPermissionByEmailTokenObj, history, onReplyPermissionAssign])

  useEffect(() => {
    let timer = null
    if (replyPermissionAssignObj.isLoading === true) {
      timer = setTimeout(() => {
        if (loadingRef.current === true) {
          replyPermissionAssignFailure({ message: DEFAULT_ERR_MESSAGE })
        }
      }, TIMEOUT_MILLISECONDS)
    }
    if (replyPermissionAssignObj.isLoading === false && replyPermissionAssignObj.isSuccess != null) {
      if (replyPermissionAssignObj.isSuccess === true) {
        setInfoModal({
          visible: true,
          title: 'Phản hồi lời mời',
          message: 'Phản hồi lời mời tham gia dự án thành công.',
          icon: { isSuccess: true },
          button: {
            content: 'Về trang chủ',
            clickFunc: () => {
              closeInfoModal()
              history.push(`${CUSTOMER_PATH}/`)
            },
          },
          onCancel: () => closeInfoModal(),
        })
      } else {
        setInfoModal({
          visible: true,
          title: 'Phản hồi lời mời',
          message: Utils.buildFailedMessage(
            replyPermissionAssignObj.message,
            'Phản hồi lời mời tham gia dự án thất bại.'
          ),
          icon: { isSuccess: false },
          button: {
            content: 'Đóng',
            clickFunc: () => {
              closeInfoModal()
            },
          },
          onCancel: () => closeInfoModal(),
        })
      }
    }
    return () => clearTimeout(timer)
  }, [replyPermissionAssignObj, history, closeInfoModal, replyPermissionAssignFailure])

  return <InfoTemplatePage infoTemplate={infoTemplate} infoModal={infoModal} />
}

export default ReplyPermissionAssignPage
