/* eslint-disable react/jsx-props-no-spreading */
/* eslint-disable prefer-promise-reject-errors */
/* eslint-disable no-underscore-dangle */
import React, { useCallback, useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import AntdTable from 'components/common/AntdTable/AntdTable.component'
import { CUSTOMER_PATH, DEFAULT_PAGINATION, SORT_ORDER, STATUS } from 'utils/constant'
import * as moment from 'moment'

const RequestTable = ({ currentUser, uploading, newRequest, getRequestListByUserIdObj, getRequestListByUserId }) => {
  const [ requestData, setRequestData ] = useState({ data: [], count: 0 })

  const columns = [
    {
      title: 'Tên dự án',
      dataIndex: 'projectName',
      canSearch: true,
      render: projectName => <span className="lead tnx-id">{ projectName }</span>,
      width: 180,
    },
    {
      title: 'Tên API key',
      dataIndex: 'tokenName',
      canSearch: true,
      render: tokenName => <span className="lead tnx-id">{ tokenName }</span>,
      width: 180,
    },
    {
      title: 'Tên file',
      dataIndex: 'fileName',
      canSearch: true,
      render: fileName => <span className="lead tnx-id">{ fileName }</span>,
      width: 180,
    },
    {
      title: 'Kích thước file (phút)',
      dataIndex: 'duration',
      sorter: true,
      render: duration => <span className="lead tnx-id">{ duration }</span>,
      width: 180,
    },
    {
      title: 'Trạng thái',
      dataIndex: 'status',
      headerClassName: 'dt-token',
      className: 'dt-token',
      filters: [
        { text: STATUS.PENDING.viText, value: STATUS.PENDING.name },
        { text: STATUS.IN_PROGRESS.viText, value: STATUS.IN_PROGRESS.name },
        { text: STATUS.SUCCESS.viText, value: STATUS.SUCCESS.name },
        { text: STATUS.FAILURE.viText, value: STATUS.FAILURE.name },
      ],
      filterMultiple: false,
      render: status => (
        <div className="d-flex align-items-center">
          <div className={ `data-state ${ status.class }` }/>
          <span className="sub sub-s2" style={ { paddingTop: 0 } }>
            { status.name }
          </span>
        </div>
      ),
      width: 180,
    },
    {
      title: 'Thời gian tạo',
      dataIndex: 'createdDate',
      headerClassName: 'dt-amount',
      className: 'dt-amount',
      sorter: true,
      render: createdDate => (
        <span className="sub sub-date" style={ { fontSize: '13px' } }>
          { moment(createdDate).format('DD/MM/YYYY HH:mm') }
        </span>
      ),
      width: 240,
      align: 'center',
    },
    {
      title: '',
      dataIndex: '_id',
      render: (_id, record) => {
        const isRequestCompleted = [ STATUS.SUCCESS.name, STATUS.FAILURE.name ].includes(record.status.value)
        return (
          <Link
            to={ isRequestCompleted ? `${ CUSTOMER_PATH }/request-details/${ _id }` : '#!' }
            className={ `btn btn-light-alt btn-xs btn-icon ${ isRequestCompleted ? '' : 'disabled' }` }
          >
            <em className="ti ti-eye"/>
          </Link>
        )
      },
      align: 'right',
      width: 60,
    },
  ]

  useEffect(() => {
    const userId = currentUser._id
    if (userId) {
      getRequestListByUserId(userId, {
        pagination: DEFAULT_PAGINATION.SIZE_5,
        filters: {
          audioFileUrl: [ 'true' ],
        },
        sortField: 'createdDate',
        sortOrder: SORT_ORDER.DESC,
      })
    }
  }, [ currentUser._id, getRequestListByUserId ])

  useEffect(() => {
    if (uploading === false && newRequest.projectName) {
      const newRequestData = { data: [ newRequest, ...requestData.data ], count: requestData.count + 1 }
      setRequestData(newRequestData)
    }
  }, [ newRequest, requestData, uploading ])

  useEffect(() => {
    setRequestData({ data: [], count: 0 })
    if (getRequestListByUserIdObj.isLoading === false && getRequestListByUserIdObj.isSuccess != null) {
      setRequestData(getRequestListByUserIdObj.requestList)
    }
  }, [ getRequestListByUserIdObj ])

  const getList = useCallback(
    // eslint-disable-next-line no-unused-vars
    ({ pagination, sortField, sortOrder, filters }) => {
      const userId = currentUser._id
      if (userId) {
        getRequestListByUserId(userId, {
          pagination,
          sortField,
          sortOrder,
          filters: { ...filters, audioFileUrl: [ 'true' ] },
        })
      }
    },
    [ currentUser._id, getRequestListByUserId ]
  )

  return (
    <div style={ { marginTop: 30 } }>
      <AntdTable
        dataObj={ requestData }
        columns={ columns }
        fetchData={ getList }
        isLoading={ getRequestListByUserIdObj.isLoading }
        pageSize={ DEFAULT_PAGINATION.SIZE_5.pageSize }
        scrollY={ 500 }
      />
    </div>
  )
}

export default RequestTable
