/* eslint-disable jsx-a11y/media-has-caption */
/* eslint-disable react/jsx-props-no-spreading */
/* eslint-disable prefer-promise-reject-errors */
/* eslint-disable no-underscore-dangle */
import React, { useEffect, useState } from 'react'
import { Button, Row } from 'antd'
import { useHistory, useParams } from 'react-router-dom'
import ReactQuill from 'react-quill'
import { saveAs } from 'file-saver'
import './TrialDetailsPage.style.css'
import * as moment from 'moment'
import RequestService from 'services/request.service'
import LoadingIcon from 'components/common/LoadingIcon/LoadingIcon.component'
import { CUSTOMER_PATH } from 'utils/constant'

const juice = require('juice')

const TrialDetailsPage = ({ getRequestInfoObj, getRequestInfo, clearRequestInfo }) => {
  const { id } = useParams()
  const history = useHistory()
  const [editorValue, setEditorValue] = useState(null)
  const [editorHtml, setEditorHml] = useState('')

  useEffect(() => {
    clearRequestInfo()
    if (id) {
      getRequestInfo(id)
    }
  }, [id, getRequestInfo, clearRequestInfo])

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
    if (getRequestInfoObj.isLoading === false && getRequestInfoObj.isSuccess != null) {
      if (getRequestInfoObj.request.transcriptFileUrl) {
        getTranscriptData()
      } else {
        setEditorValue('')
      }
    }
  }, [getRequestInfoObj])

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
        saveAs(result, 'vietspeech-transcript.docx')
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
            <div className="card-head d-flex justify-content-between align-items-center">
              <h4 className="card-title mb-0">Chi tiết yêu cầu dùng thử</h4>
              <button
                type="button"
                onClick={() => history.push(`${CUSTOMER_PATH}/trial`)}
                className="btn btn-sm btn-auto btn-primary d-sm-block d-none"
              >
                <em className="fas fa-arrow-left mr-3" />
                Trở lại
              </button>
              <button
                type="button"
                onClick={() => history.push(`${CUSTOMER_PATH}/trial`)}
                className="btn btn-icon btn-sm btn-primary d-sm-none"
              >
                <em className="fas fa-arrow-left" />
              </button>
            </div>
            <Row style={{ marginTop: 20, marginBottom: 40 }}>
              <div className="data-details d-md-flex" style={{ width: '100%' }}>
                <div className="fake-class">
                  <span className="data-details-title">Tên dự án</span>
                  <span className="data-details-info">
                    <strong>{getRequestInfoObj.request.projectName}</strong>
                  </span>
                </div>
                <div className="fake-class">
                  <span className="data-details-title">Tên API key</span>
                  <span className="data-details-info">
                    <strong>{getRequestInfoObj.request.tokenName}</strong>
                  </span>
                </div>
                <div className="fake-class">
                  <span className="data-details-title">Tên file</span>
                  <span className="data-details-info">{getRequestInfoObj.request.fileName}</span>
                </div>
                <div className="fake-class">
                  <span className="data-details-title">Kích thước file (phút)</span>
                  <span className="data-details-info">{getRequestInfoObj.request.duration}</span>
                </div>
                <div className="fake-class">
                  <span className="data-details-title">Trạng thái</span>
                  <span className="data-details-info">
                    {getRequestInfoObj.request.status && getRequestInfoObj.request.status.name}
                  </span>
                </div>
                <div className="fake-class">
                  <span className="data-details-title">Thời gian tạo</span>
                  <span className="data-details-info">
                    {moment(getRequestInfoObj.request.updatedDate).format('DD/MM/YYYY hh:mm:ss')}
                  </span>
                </div>
              </div>
            </Row>
            <Row style={{ marginTop: 20, marginBottom: 40, display: 'flex', justifyContent: 'center' }}>
              {getRequestInfoObj.isLoading === true && getRequestInfoObj.isSuccess == null && <LoadingIcon size={30} />}
              {getRequestInfoObj.isLoading === false && getRequestInfoObj.isSuccess != null && (
                <audio src={getRequestInfoObj.request.audioFileUrl} controls style={{ width: 500, outline: 'none' }} />
              )}
            </Row>
            <Row style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
              {editorValue == null && <LoadingIcon size={30} />}
              {getRequestInfoObj.isLoading === false && getRequestInfoObj.isSuccess != null && editorValue != null && (
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
                  <Button
                    type="primary"
                    style={{ marginTop: 20 }}
                    disabled={[null, ''].includes(editorValue)}
                    onClick={saveAsDocx}
                  >
                    Tải xuống
                  </Button>
                </>
              )}
            </Row>
          </div>
        </div>
      </div>
    </div>
  )
}

export default TrialDetailsPage
