/* eslint-disable no-underscore-dangle */
/* eslint-disable react/button-has-type */
/* eslint-disable jsx-a11y/control-has-associated-label */
/* eslint-disable jsx-a11y/label-has-associated-control */
import React, { useCallback, useEffect } from 'react'
import { useLocation, Link } from 'react-router-dom'
import AntdTable from '../../../../common/AntdTable/AntdTable.component'
import { CUSTOMER_PATH, TOKEN_TYPE, STATUS, DEFAULT_PAGINATION } from '../../../../../utils/constant'

const TokensTable = ({
  currentUser,
  projectId,
  projectOwnerId,
  getProjectTokenListObj,
  getProjectTokens,
  clearGetProjectTokenState,
}) => {
  const { pathname } = useLocation()

  useEffect(() => {
    return () => clearGetProjectTokenState()
  }, [clearGetProjectTokenState])

  let columns = [
    {
      title: 'Tên API key',
      dataIndex: 'name',
      canSearch: true,
      render: name => <span className="lead tnx-id">{name}</span>,
      width: 150,
    },
    {
      title: 'API key',
      dataIndex: 'value',
      style: { paddingRight: '30px' },
      render: value => (
        <span className="lead tnx-id">
          <div className="copy-wrap w-100">
            <span className="copy-feedback" />
            <em className="fas fa-key" />
            <input type="text" className="copy-address" defaultValue={value} disabled />
            <button className="copy-trigger copy-clipboard" data-clipboard-text={value}>
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
          <span className={`dt-type-md badge badge-outline ${tokenType.cssClass} badge-md`}>{tokenType.viText}</span>
          <span className={`dt-type-sm badge badge-sq badge-outline ${tokenType.cssClass} badge-md`}>
            {tokenType.viText}
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
      title: 'Thời hạn sử dụng',
      dataIndex: 'status',
      headerClassName: 'dt-token',
      className: 'dt-amount',
      filters: [
        { text: STATUS.UNEXPIRED.viText, value: STATUS.UNEXPIRED.name },
        { text: STATUS.EXPIRED.viText, value: STATUS.EXPIRED.name },
      ],
      filterMultiple: false,
      render: status => (
        <div className="d-flex align-items-center">
          <div className={`data-state ${status.cssClass}`} />
          <span className="sub sub-s2" style={{ paddingTop: '0' }}>
            {status.viText}
          </span>
        </div>
      ),
      width: 180,
    },
    {
      title: 'Thời gian còn lại',
      dataIndex: 'minutesLeft',
      headerClassName: 'dt-amount',
      headerStyle: { textAlign: 'center' },
      style: { textAlign: 'center' },
      className: 'dt-amount',
      render: minutesLeft => <span className="lead">{minutesLeft} phút</span>,
      width: 200,
      align: 'center',
    },
    {
      title: '',
      dataIndex: '_id',
      render: _id => {
        const acceptedProject = pathname.includes('accepted-project')
        return (
          <Link
            to={`${CUSTOMER_PATH}/transaction-details?tokenId=${_id}`}
            className={`btn btn-light-alt btn-xs btn-icon ${acceptedProject ? 'disabled' : ''}`}
          >
            <em className="ti ti-eye" />
          </Link>
        )
      },
      width: 60,
      align: 'right',
    },
  ]

  if (pathname.includes('my-project')) {
    columns = columns.filter(col => col.dataIndex !== 'status')
  }

  useEffect(() => {
    if (!projectId || !projectOwnerId) return
    if (pathname.includes('accepted-project')) {
      getProjectTokens({
        userId: projectOwnerId,
        projectId,
        assigneeId: currentUser._id,
        pagination: DEFAULT_PAGINATION.SIZE_5,
      })
    }
    if (pathname.includes('my-project')) {
      getProjectTokens({ userId: currentUser._id, projectId, pagination: DEFAULT_PAGINATION.SIZE_5 })
    }
  }, [currentUser._id, projectId, projectOwnerId, pathname, getProjectTokens])

  const getProjectTokenList = useCallback(
    ({ pagination, sortField, sortOrder, filters }) => {
      if (!projectId || !projectOwnerId) return
      if (pathname.includes('accepted-project')) {
        getProjectTokens({
          userId: projectOwnerId,
          projectId,
          assigneeId: currentUser._id,
          pagination,
          sortField,
          sortOrder,
          filters,
        })
      }
      if (pathname.includes('my-project')) {
        getProjectTokens({ userId: currentUser._id, projectId, pagination, sortField, sortOrder, filters })
      }
    },
    [currentUser._id, projectId, projectOwnerId, pathname, getProjectTokens]
  )

  return (
    <div>
      <AntdTable
        dataObj={getProjectTokenListObj.projectTokenList}
        columns={columns}
        fetchData={getProjectTokenList}
        isLoading={getProjectTokenListObj.isLoading}
        pageSize={DEFAULT_PAGINATION.SIZE_5.pageSize}
        scrollY={500}
      />
    </div>
  )
}

export default TokensTable
