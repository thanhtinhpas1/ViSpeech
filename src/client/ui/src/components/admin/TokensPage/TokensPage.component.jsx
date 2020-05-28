/* eslint-disable no-underscore-dangle */
/* eslint-disable no-alert */
/* eslint-disable jsx-a11y/anchor-is-valid */
/* eslint-disable react/button-has-type */
/* eslint-disable jsx-a11y/label-has-associated-control */
import React, { useEffect, useState } from 'react'
import * as moment from 'moment'
import AntdTable from 'components/common/AntdTable/AntdTable.component'
import InfoModal from 'components/admin/InfoModal/InfoModal.component'
import SocketService from 'services/socket.service'
import SocketUtils from 'utils/socket.util'
import { ADMIN_PATH, STATUS, TOKEN_TYPE } from 'utils/constant'
import Utils from 'utils'
import TokenService from 'services/token.service'

const { KAFKA_TOPIC, invokeCheckSubject } = SocketUtils
const { TOKEN_DELETED_SUCCESS_EVENT, TOKEN_DELETED_FAILED_EVENT } = KAFKA_TOPIC

const TokensPage = ({
  getTokenListObj,
  deleteTokenObj,
  getTokenList,
  deleteToken,
  deleteTokenSuccess,
  deleteTokenFailure,
}) => {
  const [infoModal, setInfoModal] = useState({})

  useEffect(() => {
    SocketService.socketOnListeningEvent(TOKEN_DELETED_SUCCESS_EVENT)
    SocketService.socketOnListeningEvent(TOKEN_DELETED_FAILED_EVENT)
  }, [])

  useEffect(() => {
    if (deleteTokenObj.isLoading === false && deleteTokenObj.isSuccess != null) {
      if (deleteTokenObj.isSuccess === true) {
        setInfoModal({
          title: 'Xoá token',
          message: 'Thành công',
          icon: { isSuccess: true },
          button: {
            content: 'Đóng',
            clickFunc: () => {
              window.$('#info-modal').modal('hide')
              getTokenList({ pagination: { current: 1, pageSize: 10 } })
            },
          },
        })
      } else {
        setInfoModal({
          title: 'Xoá token',
          message: Utils.buildFailedMessage(deleteTokenObj.message, 'Thất bại'),
          icon: { isSuccess: false },
          button: {
            content: 'Đóng',
            clickFunc: () => {
              window.$('#info-modal').modal('hide')
            },
          },
        })
      }
    }
  }, [deleteTokenObj, getTokenList])

  const onDeleteToken = async tokenId => {
    if (!tokenId) return

    setInfoModal({
      title: 'Xoá token',
      message: 'Vui lòng chờ giây lát...',
      icon: {
        isLoading: true,
      },
    })
    window.$('#info-modal').modal('show')

    deleteToken(tokenId)
    try {
      await TokenService.deleteToken(tokenId)
      invokeCheckSubject.TokenDeleted.subscribe(data => {
        if (data.error != null) {
          deleteTokenFailure(data.errorObj)
        } else {
          deleteTokenSuccess()
        }
      })
    } catch (err) {
      deleteTokenFailure({ message: err.message })
    }
  }

  const columns = [
    {
      title: 'Mã token',
      dataIndex: '_id',
      canSearch: true,
      render: _id => <span>{_id}</span>,
      width: 150,
    },
    {
      title: 'Token',
      dataIndex: 'value',
      headerClassName: 'dt-type',
      className: 'dt-type',
      style: { paddingRight: '30px' },
      render: value => (
        <span className="lead tnx-id">
          <div className="copy-wrap w-100">
            <span className="copy-feedback" />
            <em className="fas fa-key" />
            <input type="text" className="copy-address" defaultValue={value} disabled />
            <button type="button" className="copy-trigger copy-clipboard" data-clipboard-text={value}>
              <em className="ti ti-files" />
            </button>
          </div>
        </span>
      ),
      width: 250,
    },
    {
      title: 'Loại token',
      dataIndex: 'tokenType',
      headerClassName: 'dt-type',
      className: 'dt-type',
      style: { paddingRight: '30px' },
      filters: [
        { text: TOKEN_TYPE.FREE.viText, value: TOKEN_TYPE.FREE.name },
        { text: TOKEN_TYPE['50-MINUTES'].viText, value: TOKEN_TYPE['50-MINUTES'].name },
        { text: TOKEN_TYPE['200-MINUTES'].viText, value: TOKEN_TYPE['200-MINUTES'].name },
        { text: TOKEN_TYPE['500-MINUTES'].viText, value: TOKEN_TYPE['500-MINUTES'].name },
      ],
      filterMultiple: false,
      render: tokenType => (
        <>
          <span className={`dt-type-md badge badge-outline ${tokenType.class} badge-md`}>{tokenType.name}</span>
          <span className={`dt-type-sm badge badge-sq badge-outline ${tokenType.class} badge-md`}>
            {tokenType.name}
          </span>
        </>
      ),
      width: 150,
      align: 'center',
    },
    {
      title: 'Trạng thái',
      dataIndex: 'isValid',
      headerClassName: 'dt-token',
      className: 'dt-amount',
      filters: [
        { text: STATUS.VALID.viText, value: STATUS.VALID.name },
        { text: STATUS.INVALID.viText, value: STATUS.INVALID.name },
      ],
      filterMultiple: false,
      render: isValid => (
        <div className="d-flex align-items-center">
          <div className={`data-state ${isValid.cssClass}`} />
          <span className="sub sub-s2" style={{ paddingTop: '0' }}>
            {isValid.viText}
          </span>
        </div>
      ),
      width: 180,
    },
    {
      title: 'Tạo bởi',
      dataIndex: 'ownerName',
      headerClassName: 'dt-amount',
      className: 'dt-amount',
      canSearch: true,
      render: ownerName => <span className="lead tnx-id">{ownerName}</span>,
      width: 180,
    },
    {
      title: 'Dự án',
      dataIndex: 'projectName',
      headerClassName: 'dt-amount',
      className: 'dt-amount',
      canSearch: true,
      render: projectName => <span className="lead tnx-id">{projectName}</span>,
      width: 180,
    },
    {
      title: 'Thời gian còn lại',
      dataIndex: 'minutesLeft',
      headerClassName: 'dt-amount',
      headerStyle: { textAlign: 'center' },
      className: 'dt-amount',
      render: minutesLeft => <span className="lead">{minutesLeft} phút</span>,
      width: 200,
      align: 'center',
    },
    {
      title: 'Thời gian tạo',
      dataIndex: 'createdDate',
      headerClassName: 'dt-amount',
      className: 'dt-amount',
      sorter: true,
      render: createdDate => (
        <span className="sub sub-date" style={{ fontSize: '13px' }}>
          {moment(createdDate).format('DD/MM/YYYY HH:mm')}
        </span>
      ),
      width: 180,
      align: 'center',
    },
    {
      title: '',
      dataIndex: '_id',
      render: (_id, record) => {
        const isFreeToken = record.tokenType.name === TOKEN_TYPE.FREE.viText
        const isValid = record.isValid.name === STATUS.VALID.name
        return !isFreeToken ? (
          <>
            <a
              href={`${ADMIN_PATH}/transaction-details?tokenId=${_id}`}
              className="btn btn-just-icon btn-secondary btn-simple"
            >
              <i className="zmdi zmdi-eye" />
            </a>
            {isValid ? (
              <a href="#" className="btn btn-simple btn-danger btn-just-icon" onClick={() => onDeleteToken(_id)}>
                <i className="zmdi zmdi-close-circle-o" />
              </a>
            ) : null}
          </>
        ) : null
      },
      width: 120,
      align: 'right',
    },
  ]

  useEffect(() => {
    const pagination = {
      pageSize: 10,
      current: 1,
    }
    getTokenList({ pagination })
  }, [getTokenList])

  return (
    <div className="row">
      <div className="col-md-12">
        <div className="card">
          <div className="card-header">
            <h4 className="card-title">Danh sách token</h4>
          </div>
          <div className="card-content">
            <div className="material-datatables">
              <AntdTable
                dataObj={getTokenListObj.tokenList}
                columns={columns}
                fetchData={getTokenList}
                isLoading={getTokenListObj.isLoading}
                pageSize={10}
                scrollY={700}
              />
            </div>
          </div>
        </div>
      </div>
      <InfoModal infoModal={infoModal} />
    </div>
  )
}

export default TokensPage
