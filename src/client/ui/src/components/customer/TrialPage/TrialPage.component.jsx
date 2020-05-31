/* eslint-disable react/jsx-props-no-spreading */
/* eslint-disable no-undef */
/* eslint-disable no-underscore-dangle */
/* eslint-disable no-alert */
/* eslint-disable jsx-a11y/control-has-associated-label */
/* eslint-disable jsx-a11y/label-has-associated-control */
import React, { useState } from 'react'
import { Upload, message } from 'antd'
import { InboxOutlined } from '@ant-design/icons'
import storage from 'firebaseStorage'
import { AUDIO_FILE_PATH } from 'utils/constant'

const { Dragger } = Upload

const TrialPage = ({}) => {
  const [fileUrl, setFileUrl] = useState('')
  //   const [isSpeechRecognizing, setSpeechRecognizing] = useState(false)

  const handleUpload = ({ file, onProgress, onSuccess, onError }) => {
    if (!file) {
      return
    }

    const uploadTask = storage.ref(`${AUDIO_FILE_PATH}/${file.name}`).put(file)
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
          .child(file.name)
          .getDownloadURL()
          .then(url => {
            onSuccess()
            setFileUrl(url)
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
        message.success(`${info.file.name} file uploaded successfully.`)
      } else if (status === 'error') {
        message.error(`${info.file.name} file upload failed.`)
      }
    },
  }

  return (
    <div className="page-content">
      <div className="container">
        <div className="card content-area">
          <div className="card-innr">
            <div className="card-head">
              <h4 className="card-title">Dùng thử</h4>
            </div>
            <Dragger {...props}>
              <p className="ant-upload-drag-icon">
                <InboxOutlined />
              </p>
              <p className="ant-upload-text">Nhấn hoặc kéo thả tập tin vào khu vực này để tải</p>
              <p className="ant-upload-hint">Chỉ nhận tập tin âm thanh có định dạng đuôi .wav</p>
            </Dragger>
          </div>
        </div>
      </div>
    </div>
  )
}

export default TrialPage
