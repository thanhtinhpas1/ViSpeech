import React, { useState, useEffect, useCallback } from 'react'
import { useParams } from 'react-router-dom'
import { CUSTOMER_PATH, JWT_TOKEN, STATUS } from 'utils/constant'
import STORAGE from 'utils/storage'
import InfoTemplatePage from 'components/customer/InfoTemplatePage/InfoTemplatePage.component'

const ReplyPermissionAssignPage = ({
  currentUser,
  history,
  replyPermissionAssignObj,
  replyPermissionAssign,
  onAuthenticate,
}) => {
  const [infoModal, setInfoModal] = useState({})
  const [infoTemplate, setInfoTemplate] = useState({})
  const { emailToken } = useParams()

  const onReplyPermissionAssign = useCallback(
    status => {
      let infoObj = {
        title: 'Phản hồi lời mời',
        message: 'Bạn đã phản hồi lời mời tham gia project.',
        icon: { isSuccess: true },
        button: {
          content: 'Về trang chủ',
          clickFunc: () => {
            window.$('#info-modal').modal('hide')
            history.push(`${CUSTOMER_PATH}/`)
          },
        },
      }

      // 2 cases: refresh page or click verify button again
      if (
        replyPermissionAssignObj.isLoading === false &&
        replyPermissionAssignObj.isSuccess === true
      ) {
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
    },
    [history, emailToken, replyPermissionAssign, replyPermissionAssignObj]
  )

  useEffect(() => {
    const token = STORAGE.getPreferences(JWT_TOKEN)
    onAuthenticate(token)
  }, [onAuthenticate])

  useEffect(() => {
    const infoTemplateObj = {
      title: 'Phản hồi lời mời',
      user: currentUser,
      positiveButton: {
        content: STATUS.ACCEPTED.viText,
        clickFunc: () => onReplyPermissionAssign(STATUS.ACCEPTED.name),
      },
      negativeButton: {
        content: STATUS.REJECTED.viText,
        clickFunc: () => onReplyPermissionAssign(STATUS.REJECTED.name),
      },
    }
    setInfoTemplate(infoTemplateObj)
  }, [currentUser, onReplyPermissionAssign])

  useEffect(() => {
    if (
      replyPermissionAssignObj.isLoading === false &&
      replyPermissionAssignObj.isSuccess === true
    ) {
      setInfoModal({
        title: 'Phản hồi lời mời',
        message: 'Phản hồi lời mời tham gia project thành công.',
        icon: { isSuccess: true },
        button: {
          content: 'Về trang chủ',
          clickFunc: () => {
            window.$('#info-modal').modal('hide')
            history.push(`${CUSTOMER_PATH}/`)
          },
        },
      })
    }
    if (
      replyPermissionAssignObj.isLoading === false &&
      replyPermissionAssignObj.isSuccess === false
    ) {
      setInfoModal({
        title: 'Phản hồi lời mời',
        message: 'Phản hồi lời mời tham gia project thất bại. Vui lòng thử lại sau.',
        icon: { isSuccess: false },
      })
    }
  }, [replyPermissionAssignObj, history])

  return <InfoTemplatePage infoTemplate={infoTemplate} infoModal={infoModal} />
}

export default ReplyPermissionAssignPage
