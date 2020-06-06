/* eslint-disable react/jsx-props-no-spreading */
/* eslint-disable prefer-promise-reject-errors */
/* eslint-disable no-underscore-dangle */
import React, { useState, useEffect } from 'react'
import { Upload, message } from 'antd'
import { InboxOutlined } from '@ant-design/icons'
import storage from 'firebaseStorage'
import { FILE_PATH, DEFAULT_PAGINATION } from 'utils/constant'
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
  updateRequestInfoObj,
  getRequestListByUserId,
  updateRequestInfo,
  updateRequestInfoSuccess,
  updateRequestInfoFailure,
}) => {
  const [draggerDisabled, setDraggerDisabled] = useState(true)
  const [tokenValue, setTokenValue] = useState(null)

  useEffect(() => {
    SocketService.socketOnListeningEvent(REQUEST_UPDATED_SUCCESS_EVENT)
    SocketService.socketOnListeningEvent(REQUEST_UPDATED_FAILED_EVENT)
  }, [])

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
          getRequestListByUserId(currentUser._id, { pagination: DEFAULT_PAGINATION })
        }
      })
    } catch (err) {
      updateRequestInfoFailure({ message: err.message })
    }
  }

  const callAsr = async (file, folder, url) => {
    try {
      const data = await SpeechService.callAsr(file, url, tokenValue)
      if (!data || !data.text) {
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
          const progress = Math.round((snapshot.bytesTransferred / snapshot.totalBytes) * 100)
          // onProgress({ percent: progress })
        },
        error => {
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
        const progress = Math.round((snapshot.bytesTransferred / snapshot.totalBytes) * 100)
        onProgress({ percent: progress })
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
        message.error(`Tải file "${info.file.name}" thất bại.`)
      }
    },
  }

  const onSelectTokenFormValuesChange = (projectId, token) => {
    setDraggerDisabled(true)
    if (projectId && token) {
      setTokenValue(token)
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
            <SelectTokenForm onSelectTokenFormValuesChange={onSelectTokenFormValuesChange} />
            <Dragger {...props} disabled={draggerDisabled}>
              <p className="ant-upload-drag-icon">
                <InboxOutlined />
              </p>
              <p className="ant-upload-text">Nhấn hoặc kéo thả tập tin vào khu vực này để tải</p>
              <p className="ant-upload-hint">Chỉ nhận tập tin âm thanh có định dạng đuôi .wav</p>
            </Dragger>
            <RequestTable />
          </div>
        </div>
      </div>
    </div>
  )
}

export default TrialPage
