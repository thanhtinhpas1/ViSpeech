import React, { useState, useEffect } from 'react'
import { Button } from 'antd'
import { CaretRightOutlined, PauseOutlined } from '@ant-design/icons'
import { ReactMic } from 'react-mic'
import './ReactMicRecorder.style.scss'

const MediaStreamRecorder = require('msr')

const ReactMicRecorder = ({ setAudioFile, disabled }) => {
  const [record, setRecord] = useState(false)
  const [mediaRecorder, setMediaRecorder] = useState(null)

  const onMediaSuccess = stream => {
    const mediaStreamRecorder = new MediaStreamRecorder(stream)
    mediaStreamRecorder.mimeType = 'audio/wav' // check this line for audio/wav
    mediaStreamRecorder.ondataavailable = blob => {
      console.log('recordedBlob is: ', blob)
      if (record === false) {
        const audioFile = new File([blob], 'vietspeech-recording.wav', {
          type: 'audio/wav',
          lastModified: Date.now(),
        })
        setAudioFile(audioFile)
        setMediaRecorder(null)
      }
    }
    setMediaRecorder(mediaStreamRecorder)
  }

  useEffect(() => {
    if (mediaRecorder) {
      mediaRecorder.start(20000)
    }
  }, [mediaRecorder])

  const onMediaError = e => {
    console.error('Media Recorder error: ', e)
  }

  const startRecording = () => {
    setRecord(true)
    const mediaConstraints = {
      audio: true,
    }
    navigator.getUserMedia(mediaConstraints, onMediaSuccess, onMediaError)
  }

  const stopRecording = () => {
    setRecord(false)
    if (mediaRecorder) {
      mediaRecorder.stop()
    }
  }

  const onData = recordedBlob => {
    // console.log('chunk of real-time data is: ', recordedBlob)
  }

  const onStop = recordedBlob => {
    // console.log('recordedBlob is: ', recordedBlob)
    // const audioFile = new File(
    //   [new Blob([recordedBlob.blob], { type: 'audio/wav;codecs=opus' })],
    //   'vietspeech-recording.wav',
    //   {
    //     type: 'audio/wav;codecs=opus',
    //     lastModified: Date.now(),
    //   }
    // )
  }

  return (
    <div className="react-mic row guttar-15px">
      <div className="col-12 col-lg-10 mt-2">
        <ReactMic
          record={record}
          className="react-mic__sound-wave"
          onStop={onStop}
          onData={onData}
          strokeColor="#40a9ff"
          backgroundColor="#fafafa"
          mimeType="audio/wav"
          channelCount={1}
        />
      </div>
      <div className="react-mic__buttons col-12 col-lg-2 mt-2">
        <Button type="primary" disabled={record || disabled} onClick={startRecording} icon={<CaretRightOutlined />}>
          Ghi âm
        </Button>
        <Button type="primary" disabled={!record} onClick={stopRecording} icon={<PauseOutlined />}>
          Dừng ghi âm
        </Button>
      </div>
    </div>
  )
}

export default ReactMicRecorder
