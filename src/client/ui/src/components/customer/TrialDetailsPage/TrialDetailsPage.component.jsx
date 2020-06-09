/* eslint-disable jsx-a11y/media-has-caption */
/* eslint-disable react/jsx-props-no-spreading */
/* eslint-disable prefer-promise-reject-errors */
/* eslint-disable no-underscore-dangle */
import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import ReactQuill from 'react-quill'
import 'react-quill/dist/quill.snow.css'

const TrialDetailsPage = ({ getRequestInfoObj, getRequestInfo }) => {
  const { id } = useParams()
  const [editorValue, setEditorValue] = useState('')
  const [editorHtml] = useState('')

  useEffect(() => {
    if (id) {
      getRequestInfo(id)
    }
  }, [id, getRequestInfo])

  useEffect(async () => {
    if (getRequestInfoObj.request.transcriptFileUrl) {
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
  }, [getRequestInfoObj.request.transcriptFileUrl])

  const modules = {
    toolbar: [
      [{ header: '1' }, { header: '2' }, { font: [] }],
      [{ size: [] }],
      ['bold', 'italic', 'underline', 'strike', 'blockquote'],
      [{ list: 'ordered' }, { list: 'bullet' }, { indent: '-1' }, { indent: '+1' }],
      ['link', 'image', 'video'],
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
    'blockquote',
    'list',
    'bullet',
    'indent',
    'link',
    'image',
    'video',
  ]

  return (
    <div className="page-content">
      <div className="container">
        <div className="card content-area">
          <div className="card-innr">
            <div className="card-head">
              <h4 className="card-title">Chi tiết</h4>
              <div style={{ marginTop: 20, display: 'flex', justifyContent: 'center' }}>
                <audio src={getRequestInfoObj.request.audioFileUrl} controls style={{ width: 500, outline: 'none' }} />
              </div>
              <ReactQuill
                theme="snow"
                // onChange={this.handleChange}
                value={editorHtml}
                modules={modules}
                formats={formats}
                bounds=".app"
                defaultValue={editorValue}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default TrialDetailsPage
