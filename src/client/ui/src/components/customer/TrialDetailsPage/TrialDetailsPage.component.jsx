/* eslint-disable jsx-a11y/media-has-caption */
/* eslint-disable react/jsx-props-no-spreading */
/* eslint-disable prefer-promise-reject-errors */
/* eslint-disable no-underscore-dangle */
import React, { useEffect, useState } from 'react'
import { Button, Row } from 'antd'
import { useParams } from 'react-router-dom'
import ReactQuill from 'react-quill'
import { saveAs } from 'file-saver'
import './TrialDetailsPage.style.css'
import RequestService from 'services/request.service'
import LoadingIcon from 'components/common/LoadingIcon/LoadingIcon.component'

const juice = require('juice')

const TrialDetailsPage = ({ getRequestInfoObj, getRequestInfo }) => {
  const { id } = useParams()
  const [editorValue, setEditorValue] = useState('')
  const [editorHtml, setEditorHml] = useState('')

  useEffect(() => {
    if (id) {
      getRequestInfo(id)
    }
  }, [id, getRequestInfo])

  useEffect(() => {
    async function getTranscriptData() {
      const data = await fetch(getRequestInfoObj.request.transcriptFileUrl)
        .then(response => {
          return response.text()
        })
        .then(result => {
          return result
        })
        .catch(err => {
          console.debug(err.message)
        })
      setEditorValue(data)
    }
    if (getRequestInfoObj.request.transcriptFileUrl) {
      getTranscriptData()
    }
  }, [getRequestInfoObj.request.transcriptFileUrl])

  const modules = {
    toolbar: [
      [{ header: '1' }, { header: '2' }, { font: [] }],
      [{ size: [] }],
      ['bold', 'italic', 'underline', 'strike'],
      [{ list: 'ordered' }, { list: 'bullet' }],
      [{ color: [] }, { background: [] }],
      [{ align: [] }],
      ['link', 'image'],
      ['clean'],
    ],
    clipboard: {
      // toggle to add extra line breaks when pasting HTML:
      matchVisual: false,
    },
  }

  const formats = [
    'header',
    'font',
    'size',
    'bold',
    'italic',
    'underline',
    'strike',
    'list',
    'bullet',
    'color',
    'background',
    'align',
    'link',
    'image',
  ]

  const onChangeReactQuill = html => {
    setEditorHml(html)
  }

  const getIndex = new Promise((resolve, reject) => {
    fetch('./TrialDetailsPage.style.css', {
      method: 'GET',
    })
      .then(data =>
        data.text().then(css => {
          resolve(css)
        })
      )
      .catch(error => reject(error))
  })

  const saveAsDocx = () => {
    getIndex
      .then(async css => {
        let html = `${'<!DOCTYPE html><html><head lang="en"><style></style>' +
          '<meta charset="UTF-8"><title>Report</title></head><body>'}${editorHtml}</body></html>`
        html = juice.inlineContent(html, css)
        const result = await RequestService.downloadTranscript(html, id)
        saveAs(result, 'vispeech-transcript.docx')
      })
      .catch(error => {
        console.log(error)
      })
  }

  return (
    <div className="page-content">
      <div className="container">
        <div className="card content-area">
          <div className="card-innr">
            <div className="card-head">
              <h4 className="card-title">Chi tiết</h4>
              <Row style={{ marginTop: 20, marginBottom: 40, display: 'flex', justifyContent: 'center' }}>
                {getRequestInfoObj.isLoading === true && getRequestInfoObj.isSuccess == null && (
                  <LoadingIcon size={30} />
                )}
                {getRequestInfoObj.isLoading === false && getRequestInfoObj.isSuccess != null && (
                  <audio
                    src={getRequestInfoObj.request.audioFileUrl}
                    controls
                    style={{ width: 500, outline: 'none' }}
                  />
                )}
              </Row>
              <Row style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                {editorValue === '' && <LoadingIcon size={30} />}
                {editorValue !== '' && (
                  <>
                    <ReactQuill
                      style={{ width: '100%' }}
                      theme="snow"
                      onChange={onChangeReactQuill}
                      modules={modules}
                      formats={formats}
                      bounds=".app"
                      defaultValue={editorValue}
                    />
                    <Button type="primary" style={{ marginTop: 20 }} onClick={saveAsDocx}>
                      Tải xuống
                    </Button>
                  </>
                )}
              </Row>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default TrialDetailsPage
