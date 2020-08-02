/* eslint-disable no-underscore-dangle */
/* eslint-disable no-alert */
/* eslint-disable jsx-a11y/anchor-is-valid */
/* eslint-disable react/button-has-type */
/* eslint-disable jsx-a11y/label-has-associated-control */
import React, { useEffect, useState, useCallback } from 'react'
import * as moment from 'moment'
import AntdTable from '../../../components/common/AntdTable/AntdTable.component'
import { DEFAULT_PAGINATION, STATUS, TOKEN_TYPE } from '../../../utils/constant'
import FilterForm from './components/FilterForm/FilterForm.container'

const HistoriesPage = ({ requestListObj, getRequestList }) => {
  const [advancedFilters, setAdvancedFilters] = useState(null)
  const [advancedFilterClick, setAdvancedFilterClick] = useState(false)

  const columns = [
    // {
    //   title: 'Mã API Key',
    //   dataIndex: 'tokenId',
    //   canSearch: true,
    //   render: tokenId => <span>{tokenId}</span>,
    //   width: 150,
    // },
    {
      title: 'Tên API key',
      dataIndex: 'tokenName',
      headerClassName: 'dt-amount',
      className: 'dt-amount',
      canSearch: true,
      render: tokenName => <span className="lead tnx-id">{tokenName}</span>,
      width: 180,
    },
    {
      title: () => <div className="dt-type-text">Loại API key</div>,
      dataIndex: 'tokenType',
      headerClassName: 'dt-type',
      className: 'dt-type',
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
      title: 'Người dùng',
      dataIndex: 'username',
      headerClassName: 'dt-amount',
      className: 'dt-amount',
      canSearch: true,
      render: username => <span className="lead tnx-id">{username}</span>,
      width: 160,
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
          <div className={`data-state ${status.class}`} />
          <span className="sub sub-s2" style={{ paddingTop: 0 }}>
            {status.name}
          </span>
        </div>
      ),
      width: 160,
    },
    {
      title: 'Tên file',
      dataIndex: 'fileName',
      canSearch: true,
      render: fileName => <span>{fileName}</span>,
      width: 180,
    },
    {
      title: 'Định dạng',
      dataIndex: 'mimeType',
      canSearch: true,
      render: mimeType => <span>{mimeType}</span>,
      width: 160,
    },
    {
      title: 'Thời gian sử dụng (phút)',
      dataIndex: 'duration',
      sorter: true,
      render: duration => <span>{duration}</span>,
      width: 220,
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
      width: 240,
      align: 'center',
    },
  ]

  useEffect(() => {
    getRequestList({ pagination: DEFAULT_PAGINATION.SIZE_10 })
  }, [getRequestList])

  const getList = useCallback(
    // eslint-disable-next-line no-unused-vars
    ({ pagination, sortField, sortOrder, filters }) => {
      getRequestList({ pagination, sortField, sortOrder, filters, advancedFilters })
    },
    [getRequestList, advancedFilters]
  )

  const filterData = filters => {
    setAdvancedFilterClick(true)
    getRequestList({ pagination: DEFAULT_PAGINATION.SIZE_10, advancedFilters: filters })
    setAdvancedFilterClick(false)
  }

  return (
    <div className="row">
      <div className="col-md-12">
        <div className="card">
          <div className="card-header">
            <h4 className="card-title">Lịch sử sử dụng dịch vụ</h4>
          </div>
          <div className="card-content">
            <div className="material-datatables">
              <FilterForm setAdvancedFilters={setAdvancedFilters} filterData={filterData} />
              {!advancedFilterClick && (
                <AntdTable
                  dataObj={requestListObj.requestList}
                  columns={columns}
                  fetchData={getList}
                  isLoading={requestListObj.isLoading}
                  pageSize={DEFAULT_PAGINATION.SIZE_10.pageSize}
                  scrollY={700}
                />
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default HistoriesPage
