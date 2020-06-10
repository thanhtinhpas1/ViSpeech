/* eslint-disable react/jsx-props-no-spreading */
/* eslint-disable prefer-promise-reject-errors */
/* eslint-disable no-underscore-dangle */
import React, { useState, useEffect } from 'react'
import { Upload, message } from 'antd'
import { InboxOutlined } from '@ant-design/icons'
import storage from 'firebaseStorage'
import { FILE_PATH, DEFAULT_PAGINATION, SORT_ORDER, STATUS } from 'utils/constant'
import SpeechService from 'services/speech.service'
import SocketService from 'services/socket.service'
import RequestService from 'services/request.service'
import SocketUtils from 'utils/socket.util'
import SelectTokenForm from './components/SelectTokenForm/SelectTokenForm.container'
import RequestTable from './components/RequestTable/RequestTable.container'

const { Dragger } = Upload

const { KAFKA_TOPIC, invokeCheckSubject } = SocketUtils
const { REQUEST_UPDATED_SUCCESS_EVENT, REQUEST_UPDATED_FAILED_EVENT } = KAFKA_TOPIC

const TrialPage = ({
  currentUser,
  // updateRequestInfoObj,
  getRequestListByUserId,
  updateRequestInfo,
  updateRequestInfoSuccess,
  updateRequestInfoFailure,
}) => {
  const [draggerDisabled, setDraggerDisabled] = useState(true)
  const [tokenValue, setTokenValue] = useState(null)
  const [progress, setProgress] = useState(0)
  const [uploading, setUploading] = useState(0)
  const [projectName, setProjectName] = useState('')
  const [tokenName, setTokenName] = useState('')
  const [newRequest, setNewRequest] = useState({})

  useEffect(() => {
    SocketService.socketOnListeningEvent(REQUEST_UPDATED_SUCCESS_EVENT)
    SocketService.socketOnListeningEvent(REQUEST_UPDATED_FAILED_EVENT)
  }, [])

  const updateRequest = async (requestId, transcriptFileUrl) => {
    if (!requestId) return

    updateRequestInfo(requestId, transcriptFileUrl)
    const request = { ...newRequest }
    try {
      await RequestService.updateRequest(requestId, transcriptFileUrl)
      invokeCheckSubject.RequestUpdated.subscribe(data => {
        if (data.error != null) {
          request.status = {
            value: 'FAILURE',
            name: STATUS.FAILURE.viText,
            class: STATUS.FAILURE.cssClass,
          }
          setNewRequest(request)
          updateRequestInfoFailure(data.errorObj)
          setUploading(false)
        } else {
          request.status = {
            value: 'SUCCESS',
            name: STATUS.SUCCESS.viText,
            class: STATUS.SUCCESS.cssClass,
          }
          setNewRequest(request)
          setUploading(false)
          updateRequestInfoSuccess(transcriptFileUrl)
          getRequestListByUserId(currentUser._id, {
            pagination: DEFAULT_PAGINATION,
            sortField: 'createdDate',
            sortOrder: SORT_ORDER.DESC,
          })
        }
      })
    } catch (err) {
      request.status = {
        value: 'FAILURE',
        name: STATUS.FAILURE.viText,
        class: STATUS.FAILURE.cssClass,
      }
      setUploading(false)
      updateRequestInfoFailure({ message: err.message })
    }
  }

  const callAsr = async (file, folder, url) => {
    try {
      const data = await SpeechService.callAsr(file, url, tokenValue)
      if (!data || !data.text) {
        setUploading(false)
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
          const progressValue = Math.round((snapshot.bytesTransferred / snapshot.totalBytes) * 100)
          setProgress(progressValue)
        },
        error => {
          setUploading(false)
          console.log(`Error uploading text file: ${error.message}`)
        },
        () => {
          storage
            .ref(`${FILE_PATH}/${folder}`)
            .child(fileName)
            .getDownloadURL()
            .then(async transcriptFileUrl => {
              updateRequest(requestId, transcriptFileUrl)
              console.log(`Transcript file uploaded with url ${transcriptFileUrl}`)
            })
        }
      )
    } catch (err) {
      console.log(`Error uploading text file: ${err.message}`)
    }
  }

  const handleUpload = async ({ file, onProgress, onSuccess, onError }) => {
    setUploading(true)
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

    if (!file) {
      onError('File không tồn tại')
      return
    }

    if (!tokenValue) {
      onError('Vui lòng chọn token!')
      return
    }

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
        onError(error)
      },
      () => {
        storage
          .ref(`${FILE_PATH}/${folder}`)
          .child(fileName)
          .getDownloadURL()
          .then(async url => {
            onSuccess()
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
        message.success(`Tải file "${info.file.name}" thành công.`)
      } else if (status === 'error') {
        setUploading(false)
        message.error(`Tải file "${info.file.name}" thất bại.`)
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
              <p className="ant-upload-text">Nhấn hoặc kéo thả tập tin vào khu vực này để tải</p>
              <p className="ant-upload-hint">Chỉ nhận tập tin âm thanh có định dạng đuôi .wav</p>
            </Dragger>
            <RequestTable newRequest={newRequest} />
          </div>
        </div>
      </div>
    </div>
  )
}

export default TrialPage
