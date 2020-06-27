/* eslint-disable react/jsx-props-no-spreading */
/* eslint-disable prefer-promise-reject-errors */
/* eslint-disable no-underscore-dangle */
import React, { useState, useEffect } from 'react'
import { useHistory } from 'react-router-dom'
import { Upload } from 'antd'
import { InboxOutlined } from '@ant-design/icons'
import storage from 'firebaseStorage'
import { FILE_PATH, DEFAULT_PAGINATION, SORT_ORDER, STATUS, CUSTOMER_PATH } from 'utils/constant'
import SpeechService from 'services/speech.service'
import SocketService from 'services/socket.service'
import RequestService from 'services/request.service'
import SocketUtils from 'utils/socket.util'
import InfoModal from 'components/customer/InfoModal/InfoModal.component'
import SelectTokenForm from './components/SelectTokenForm/SelectTokenForm.container'
import RequestTable from './components/RequestTable/RequestTable.container'

const { Dragger } = Upload

const { KAFKA_TOPIC, invokeCheckSubject } = SocketUtils
const { REQUEST_UPDATED_SUCCESS_EVENT, REQUEST_UPDATED_FAILED_EVENT } = KAFKA_TOPIC

const TrialPage = ({
  currentUser,
  getRequestListByUserId,
  updateRequestInfo,
  updateRequestInfoSuccess,
  updateRequestInfoFailure,
}) => {
  const history = useHistory()
  const [draggerDisabled, setDraggerDisabled] = useState(true)
  const [tokenValue, setTokenValue] = useState(null)
  const [uploading, setUploading] = useState(false)
  const [projectName, setProjectName] = useState('')
  const [tokenName, setTokenName] = useState('')
  const [newRequest, setNewRequest] = useState({})
  const [infoModal, setInfoModal] = useState({})

  useEffect(() => {
    SocketService.socketOnListeningEvent(REQUEST_UPDATED_SUCCESS_EVENT)
    SocketService.socketOnListeningEvent(REQUEST_UPDATED_FAILED_EVENT)
  }, [])

  const refreshRequestList = () => {
    setUploading(false)
    setNewRequest({})
    getRequestListByUserId(currentUser._id, {
      pagination: DEFAULT_PAGINATION,
      sortField: 'createdDate',
      sortOrder: SORT_ORDER.DESC,
    })
  }

  const updateRequest = async (requestId, transcriptFileUrl) => {
    if (!requestId) return

    updateRequestInfo(requestId, transcriptFileUrl)
    try {
      await RequestService.updateRequest(requestId, transcriptFileUrl)
      invokeCheckSubject.RequestUpdated.subscribe(data => {
        if (data.error != null) {
          updateRequestInfoFailure(data.errorObj)
        } else {
          updateRequestInfoSuccess(transcriptFileUrl)
        }
        refreshRequestList()
        window.$('#uploadAudioFile-modal').modal('hide')
        history.push(`${CUSTOMER_PATH}/request-details/${requestId}`)
      })
    } catch (err) {
      refreshRequestList()
      updateRequestInfoFailure({ message: err.message })
    }
  }

  const callAsr = async (file, folder, url) => {
    try {
      const data = await SpeechService.callAsr(file, url, tokenValue)
      if (!data || data.text == null) {
        refreshRequestList()
        return
      }

      const { requestId, text } = data
      const fileName = `transcript`
      const textFile = new File([new Blob([text], { type: 'text/plain;charset=utf-8' })], fileName, {
        type: 'text/plain;charset=utf-8',
      })
      const uploadTask = storage.ref(`${FILE_PATH}/${folder}/${fileName}`).put(textFile)
      uploadTask.on(
        'state_changed',
        snapshot => {
          Math.round((snapshot.bytesTransferred / snapshot.totalBytes) * 100)
          // setProgress(progressValue)
        },
        error => {
          refreshRequestList()
          console.log(`Error uploading transcript file: ${error.message}`)
        },
        () => {
          storage
            .ref(`${FILE_PATH}/${folder}`)
            .child(fileName)
            .getDownloadURL()
            .then(async transcriptFileUrl => {
              updateRequest(requestId, transcriptFileUrl)
              console.log(`Transcript file was uploaded with url ${transcriptFileUrl}`)
            })
        }
      )
    } catch (err) {
      refreshRequestList()
      console.log(`Error while calling asr: ${err.message}`)
    }
  }

  const handleUpload = async ({ file, onProgress, onSuccess, onError }) => {
    setInfoModal({
      title: 'Tải tập tin âm thanh',
      message: 'Đang tải',
      icon: { isLoading: true },
    })
    window.$('#uploadAudioFile-modal').modal('show')

    if (!file) {
      setInfoModal({
        title: 'Tải tập tin âm thanh',
        message: 'Tập tin không tồn tại. Vui lòng chọn lại!',
        icon: { isSuccess: false },
        button: {
          content: 'Đóng',
          clickFunc: () => {
            window.$('#uploadAudioFile-modal').modal('hide')
          },
        },
      })
      return
    }

    if (!tokenValue) {
      return
    }

    const request = {
      _id: 'vispeech',
      createdDate: Date.now(),
      duration: 0,
      fileName: file.name,
      projectName,
      status: {
        value: 'PENDING',
        name: STATUS.PENDING.viText,
        class: STATUS.PENDING.cssClass,
      },
      tokenName,
    }
    setNewRequest(request)
    setUploading(true)

    const fileName = `audio-${file.name}`
    const folder = `${Date.now()}`
    const uploadTask = storage.ref(`${FILE_PATH}/${folder}/${fileName}`).put(file)
    uploadTask.on(
      'state_changed',
      snapshot => {
        const progressValue = Math.round((snapshot.bytesTransferred / snapshot.totalBytes) * 100)
        onProgress({ percent: progressValue })
      },
      error => {
        setUploading(false)
        onError(error)
        setInfoModal({
          title: 'Tải tập tin âm thanh',
          message: 'Đã có lỗi xảy ra khi tải tập tin. Vui lòng thử lại sau!',
          icon: { isSuccess: false },
          button: {
            content: 'Đóng',
            clickFunc: () => {
              window.$('#uploadAudioFile-modal').modal('hide')
            },
          },
        })
      },
      () => {
        storage
          .ref(`${FILE_PATH}/${folder}`)
          .child(fileName)
          .getDownloadURL()
          .then(async url => {
            onSuccess()
            setInfoModal({
              title: 'Tải tập tin âm thanh',
              message: 'Tải lên tập tin thành công!',
              icon: { isSuccess: true },
              button: {
                content: 'Đóng',
                clickFunc: () => {
                  window.$('#uploadAudioFile-modal').modal('hide')
                },
              },
            })
            callAsr(file, folder, url)
          })
      }
    )
  }

  const props = {
    name: 'file',
    multiple: false,
    accept: 'audio/wav',
    customRequest: handleUpload,
    onChange(info) {
      const { status } = info.file
      if (status !== 'uploading') {
        console.log(info.file, info.fileList)
      }
      if (status === 'done') {
        console.log(`Tải file "${info.file.name}" thành công.`)
      } else if (status === 'error') {
        console.log(`Tải file "${info.file.name}" thất bại.`)
      }
    },
  }

  const onSelectTokenFormValuesChange = (project, token) => {
    setDraggerDisabled(true)
    if (project && token) {
      setTokenValue(token.value)
      setProjectName(project.name)
      setTokenName(token.name)
      setDraggerDisabled(false)
    }
  }

  return (
    <div className="page-content">
      <div className="container">
        <div className="card content-area">
          <div className="card-innr">
            <div className="card-head">
              <h4 className="card-title">Dùng thử</h4>
            </div>
            <SelectTokenForm uploading={uploading} onSelectTokenFormValuesChange={onSelectTokenFormValuesChange} />
            <Dragger {...props} disabled={draggerDisabled || uploading}>
              <p className="ant-upload-drag-icon">
                <InboxOutlined />
              </p>
              <p className="ant-upload-text">Nhấn hoặc kéo thả tập tin âm thanh vào khu vực này để tải</p>
              <p className="ant-upload-hint">Chỉ nhận tập tin âm thanh có định dạng đuôi .wav</p>
            </Dragger>
            <RequestTable newRequest={newRequest} uploading={uploading} />
          </div>
        </div>
      </div>
      <InfoModal id="uploadAudioFile-modal" infoModal={infoModal} />
    </div>
  )
}

export default TrialPage
