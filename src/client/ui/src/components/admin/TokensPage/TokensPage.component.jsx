/* eslint-disable no-underscore-dangle */
/* eslint-disable no-alert */
/* eslint-disable jsx-a11y/anchor-is-valid */
/* eslint-disable react/button-has-type */
/* eslint-disable jsx-a11y/label-has-associated-control */
import React, { useEffect, useState, useCallback } from 'react'
import * as moment from 'moment'
import AntdTable from 'components/common/AntdTable/AntdTable.component'
import InfoModal from 'components/common/InfoModal/InfoModal.component'
import ConfirmModal from 'components/common/ConfirmModal/ConfirmModal.component'
import SocketService from 'services/socket.service'
import SocketUtils from 'utils/socket.util'
import {
  ADMIN_PATH,
  STATUS,
  TOKEN_TYPE,
  DEFAULT_PAGINATION,
  TIMEOUT_MILLISECONDS,
  DEFAULT_ERR_MESSAGE,
} from 'utils/constant'
import Utils from 'utils'
import TokenService from 'services/token.service'

const { KAFKA_TOPIC, invokeCheckSubject } = SocketUtils
const { TOKEN_DELETED_SUCCESS_EVENT, TOKEN_DELETED_FAILED_EVENT } = KAFKA_TOPIC

const TokensPage = ({
  getTokenListObj,
  deleteTokenObj,
  clearDeleteTokenState,
  getTokenList,
  deleteToken,
  deleteTokenSuccess,
  deleteTokenFailure,
}) => {
  const [infoModal, setInfoModal] = useState({})
  const [confirmModal, setConfirmModal] = useState({})

  useEffect(() => {
    return () => clearDeleteTokenState()
  }, [clearDeleteTokenState])

  useEffect(() => {
    SocketService.socketOnListeningEvent(TOKEN_DELETED_SUCCESS_EVENT)
    SocketService.socketOnListeningEvent(TOKEN_DELETED_FAILED_EVENT)
  }, [])

  const closeInfoModal = useCallback(() => {
    setInfoModal(i => {
      return { ...i, visible: false }
    })
  }, [])

  const closeConfirmModal = useCallback(() => {
    setConfirmModal(i => {
      return { ...i, visible: false }
    })
  }, [])

  useEffect(() => {
    if (deleteTokenObj.isLoading === true) {
      setTimeout(() => {
        if (deleteTokenObj.isLoading === true) {
          deleteTokenFailure({ message: DEFAULT_ERR_MESSAGE })
        }
      }, TIMEOUT_MILLISECONDS)
    }
    if (deleteTokenObj.isLoading === false && deleteTokenObj.isSuccess != null) {
      if (deleteTokenObj.isSuccess === true) {
        setInfoModal({
          visible: true,
          title: 'Xoá API key',
          message: 'Thành công',
          icon: { isSuccess: true },
          button: {
            content: 'Đóng',
            clickFunc: () => {
              closeInfoModal()
              getTokenList({ pagination: DEFAULT_PAGINATION.SIZE_10 })
            },
          },
          onCancel: () => {
            closeInfoModal()
            getTokenList({ pagination: DEFAULT_PAGINATION.SIZE_10 })
          },
        })
      } else {
        setInfoModal({
          visible: true,
          title: 'Xoá API key',
          message: Utils.buildFailedMessage(deleteTokenObj.message, 'Thất bại'),
          icon: { isSuccess: false },
          button: {
            content: 'Đóng',
            clickFunc: () => {
              closeInfoModal()
            },
          },
          onCancel: () => {
            closeInfoModal()
          },
        })
      }
    }
  }, [deleteTokenObj, getTokenList, closeInfoModal, deleteTokenFailure])

  const onDeleteToken = async tokenId => {
    if (!tokenId) return

    setConfirmModal({
      visible: true,
      message: 'Bạn có chắc muốn xoá API key?',
      onCancel: () => closeConfirmModal(),
      onOk: async () => {
        closeConfirmModal()
        setInfoModal({
          visible: true,
          title: 'Xoá API key',
          message: 'Vui lòng chờ giây lát...',
          icon: {
            isLoading: true,
          },
          onCancel: () => closeInfoModal(),
        })

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
      },
    })
  }

  const columns = [
    {
      title: 'Mã API key',
      dataIndex: '_id',
      canSearch: true,
      render: _id => <span>{_id}</span>,
      width: 150,
    },
    {
      title: 'API key',
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
      title: 'Loại API key',
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
        return (
          !isFreeToken && (
            <>
              <a
                href={`${ADMIN_PATH}/transaction-details?tokenId=${_id}`}
                className="btn btn-just-icon btn-secondary btn-simple"
              >
                <i className="far fa-eye" />
              </a>
              <button
                disabled={!isValid}
                className="btn btn-simple btn-danger btn-just-icon"
                onClick={() => onDeleteToken(_id)}
              >
                <i className="fas fa-times" />
              </button>
            </>
          )
        )
      },
      width: 120,
      align: 'right',
    },
  ]

  useEffect(() => {
    getTokenList({ pagination: DEFAULT_PAGINATION.SIZE_10 })
  }, [getTokenList])

  return (
    <div className="row">
      <div className="col-md-12">
        <div className="card">
          <div className="card-header">
            <h4 className="card-title">Danh sách API key</h4>
          </div>
          <div className="card-content">
            <div className="material-datatables">
              <AntdTable
                dataObj={getTokenListObj.tokenList}
                columns={columns}
                fetchData={getTokenList}
                isLoading={getTokenListObj.isLoading}
                pageSize={DEFAULT_PAGINATION.SIZE_10.pageSize}
                scrollY={700}
              />
            </div>
          </div>
        </div>
      </div>
      {infoModal.visible && <InfoModal infoModal={infoModal} />}
      {confirmModal.visible && <ConfirmModal confirmModal={confirmModal} />}
    </div>
  )
}

export default TokensPage
