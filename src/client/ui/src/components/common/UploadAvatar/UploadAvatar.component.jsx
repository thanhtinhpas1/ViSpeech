/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
/* eslint-disable react/jsx-props-no-spreading */
import React, { Component } from 'react'
import Dropzone from 'react-dropzone'
// import { Button, message } from 'antd'
import { IMG_AVATAR_REF, DEFAULT_AVATAR_URL } from '../../../utils/constant'
import storage from '../../../firebase.config'
import './UploadAvatar.style.scss'

class UploadAvatar extends Component {
  constructor(props) {
    super(props)
    this.state = {
      uploadFile: null,
      isUploadLoading: false,
    }
  }

  componentDidMount() {
    const { updateAvatarClear } = this.props
    updateAvatarClear()
  }

  onDrop = acceptedFiles => {
    console.log('acceptedFiles: ', acceptedFiles)
    this.setState({ uploadFile: acceptedFiles[0] })
  }

  handleUpload = e => {
    e.preventDefault()
    const {
      onUpdateAvatar,
      currentUser: { token },
    } = this.props
    const { uploadFile } = this.state
    console.log('on upload')
    if (!uploadFile) {
      // message.warning('Vui lòng chọn hình.')
      return
    }
    this.setState({ isUploadLoading: true }, () => {
      const uploadTask = storage.ref(`${IMG_AVATAR_REF}/${uploadFile.name}`).put(uploadFile)
      uploadTask.on(
        'state_changed',
        null,
        error => {
          // Error function ...
          console.log(error)
          // message.error('Không thể upload hình')
        },
        () => {
          // complete function ...
          storage
            .ref(IMG_AVATAR_REF)
            .child(uploadFile.name)
            .getDownloadURL()
            .then(url => {
              console.log('upload avatar: ', url)
              console.log('upload token: ', token)
              onUpdateAvatar({ avatar: url, token })
              this.setState({ isUploadLoading: false })
            })
        }
      )
    })
  }

  getMessage = content => {
    const {
      updateAvatar: { isSuccess },
      updateAvatar,
      updateAvatarClear,
    } = this.props
    if (isSuccess) {
      // message.success(content || 'Thành công')
      updateAvatarClear()
      this.setState({ uploadFile: null })
    } else {
      // message.error(updateAvatar.message)
    }
  }

  render() {
    const { uploadFile, isUploadLoading } = this.state
    const {
      currentUser,
      updateAvatar: { isLoading, isSuccess },
    } = this.props
    // console.log("currnet user: ", currentUser);
    return (
      <div className="upload-avatar-wrap">
        <div className="message">
          {!isLoading && isSuccess === false ? this.getMessage() : null}
          {!isLoading && isSuccess === true ? this.getMessage('Đổi ảnh đại diện thành công') : null}
        </div>
        <div className="current-avatar">
          <img src={(currentUser && currentUser.avatar) || DEFAULT_AVATAR_URL} alt="" />
        </div>
        <div className="upload-avatar">
          <div className="upload-avatar__input text-center mt-5">
            <Dropzone onDrop={this.onDrop} accept="image/png, image/jpg, image/jpeg">
              {({ getRootProps, getInputProps }) => (
                <div {...getRootProps()}>
                  <span> Click vào đây để upload ảnh đại diện mới.</span>
                  <input {...getInputProps()} />
                  <div>{uploadFile && `${uploadFile.name.substring(0, 30)}...`}</div>
                </div>
              )}
            </Dropzone>
          </div>
          {/* <Button
            className="custom-button"
            type="primary"
            onClick={e => this.handleUpload(e)}
            loading={isLoading || isUploadLoading}
          >
            Lưu
          </Button> */}
        </div>
      </div>
    )
  }
}

export default UploadAvatar
