import React, { useState } from 'react'
import { Button } from 'antd'
import { CaretRightOutlined, PauseOutlined } from '@ant-design/icons'
import { ReactMic } from 'react-mic'
import './ReactMicRecorder.style.scss'

const ReactMicRecorder = ({ setAudioFile, disabled }) => {
  const [record, setRecord] = useState(false)

  const startRecording = () => {
    setRecord(true)
  }

  const stopRecording = () => {
    setRecord(false)
  }

  const onData = recordedBlob => {
    // console.log('chunk of real-time data is: ', recordedBlob)
  }

  const onStop = recordedBlob => {
    // console.log('recordedBlob is: ', recordedBlob)
    const audioFile = new File([new Blob([recordedBlob.blob], { type: 'audio/wav' })], 'vietspeech-recording.wav', {
      type: 'audio/wav',
      lastModified: Date.now(),
    })
    setAudioFile(audioFile)
  }

  return (
    <div className="react-mic">
      <ReactMic
        record={record}
        className="react-mic__sound-wave"
        onStop={onStop}
        onData={onData}
        strokeColor="#40a9ff"
        backgroundColor="#fafafa"
        mimeType="audio/wav"
      />
      <div className="react-mic__buttons">
        <Button type="primary" disabled={record || disabled} onClick={startRecording} icon={<CaretRightOutlined />}>
          Ghi âm
        </Button>
        <Button type="primary" disabled={!record || disabled} onClick={stopRecording} icon={<PauseOutlined />}>
          Dừng ghi âm
        </Button>
      </div>
    </div>
  )
}

export default ReactMicRecorder
