/* eslint-disable react/jsx-props-no-spreading */
/* eslint-disable prefer-promise-reject-errors */
/* eslint-disable no-underscore-dangle */
import React, { useState } from 'react'
import { Upload, message } from 'antd'
import { InboxOutlined } from '@ant-design/icons'
import storage from 'firebaseStorage'
import { AUDIO_FILE_PATH } from 'utils/constant'
import SpeechService from 'services/speech.service'
import SelectTokenForm from './components/SelectTokenForm/SelectTokenForm.container'
import RequestTable from './components/RequestTable/RequestTable.container'

const { Dragger } = Upload

const TrialPage = () => {
  const [draggerDisabled, setDraggerDisabled] = useState(true)
  const [tokenValue, setTokenValue] = useState(null)

  const callAsr = async (file, url) => {
    try {
      const text = await SpeechService.callAsr(file, url, tokenValue)
      message.info(text)
    } catch (err) {
      console.log(err)
    }
  }

  const handleUpload = ({ file, onProgress, onSuccess, onError }) => {
    if (!file) {
      onError('File không tồn tại')
      return
    }

    if (!tokenValue) {
      onError('Vui lòng chọn token!')
      return
    }

    const fileName = `${Date.now()}-${file.name}`
    const uploadTask = storage.ref(`${AUDIO_FILE_PATH}/${fileName}`).put(file)
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
          .ref(AUDIO_FILE_PATH)
          .child(`${fileName}`)
          .getDownloadURL()
          .then(async url => {
            onSuccess()
            callAsr(file, url)
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
