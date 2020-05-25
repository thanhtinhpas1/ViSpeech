/* eslint-disable no-underscore-dangle */
import React, { useState, useEffect, useCallback } from 'react'
import { useParams, useHistory } from 'react-router-dom'
import { CUSTOMER_PATH, JWT_TOKEN, STATUS } from 'utils/constant'
import STORAGE from 'utils/storage'
import InfoTemplatePage from 'components/customer/InfoTemplatePage/InfoTemplatePage.component'
import SocketUtils from 'utils/socket.util'
import SocketService from 'services/socket.service'
import PermissionService from 'services/permission.service'
import Utils from 'utils'

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

  useEffect(() => {
    SocketService.socketOnListeningEvent(PERMISSION_ASSIGN_REPLIED_SUCCESS_EVENT)
    SocketService.socketOnListeningEvent(PERMISSION_ASSIGN_REPLIED_FAILED_EVENT)
  }, [])

  useEffect(() => {
    const token = STORAGE.getPreferences(JWT_TOKEN)
    onAuthenticate(token)
  }, [onAuthenticate])

  useEffect(() => {
    if (currentUser._id) {
      findPermissionByEmailToken(emailToken)
    }
  }, [currentUser._id, emailToken, findPermissionByEmailToken])

  const onReplyPermissionAssign = useCallback(
    async status => {
      let infoObj = {
        title: 'Phản hồi lời mời',
        message: 'Bạn đã phản hồi lời mời tham gia dự án.',
        icon: { isSuccess: true },
        button: {
          content: 'Về trang dự án',
          clickFunc: () => {
            window.$('#info-modal').modal('hide')
            history.push(`${CUSTOMER_PATH}/projects`)
          },
        },
      }

      // 2 cases: refresh page or click verify button again
      if (replyPermissionAssignObj.isLoading === false && replyPermissionAssignObj.isSuccess === true) {
        setInfoModal(infoObj)
        window.$('#info-modal').modal('show')
        return
      }

      infoObj = {
        title: 'Phản hồi lời mời',
        message: 'Vui lòng chờ giây lát...',
        icon: {
          isLoading: true,
        },
      }
      setInfoModal(infoObj)
      window.$('#info-modal').modal('show')

      replyPermissionAssign({ emailToken, status })
      try {
        await PermissionService.replyPermissionAssign({ emailToken, status })
        invokeCheckSubject.PermissionAssignReplied.subscribe(data => {
          if (data.error != null) {
            replyPermissionAssignFailure(data.errorObj)
          } else {
            replyPermissionAssignSuccess({ emailToken, status })
          }
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
    ]
  )

  useEffect(() => {
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
    if (replyPermissionAssignObj.isLoading === false && replyPermissionAssignObj.isSuccess != null) {
      if (replyPermissionAssignObj.isSuccess === true) {
        setInfoModal({
          title: 'Phản hồi lời mời',
          message: 'Phản hồi lời mời tham gia dự án thành công.',
          icon: { isSuccess: true },
          button: {
            content: 'Về trang chủ',
            clickFunc: () => {
              window.$('#info-modal').modal('hide')
              history.push(`${CUSTOMER_PATH}/`)
            },
          },
        })
      } else {
        setInfoModal({
          title: 'Phản hồi lời mời',
          message: Utils.buildFailedMessage(
            replyPermissionAssignObj.message,
            'Phản hồi lời mời tham gia dự án thất bại'
          ),
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
  }, [replyPermissionAssignObj, history])

  return <InfoTemplatePage infoTemplate={infoTemplate} infoModal={infoModal} />
}

export default ReplyPermissionAssignPage
