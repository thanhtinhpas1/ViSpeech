/* eslint-disable no-underscore-dangle */
/* eslint-disable react/button-has-type */
/* eslint-disable jsx-a11y/control-has-associated-label */
/* eslint-disable jsx-a11y/label-has-associated-control */
import React, { useCallback, useEffect } from 'react'
import AntdTable from '../../../../common/AntdTable/AntdTable.component'
import { TOKEN_TYPE, STATUS, DEFAULT_PAGINATION, ADMIN_PATH } from '../../../../../utils/constant'

const TokensTable = ({
  projectId,
  projectOwnerId,
  getProjectTokenListObj,
  getProjectTokens,
  clearGetProjectTokenState,
}) => {
  useEffect(() => {
    return () => clearGetProjectTokenState()
  }, [clearGetProjectTokenState])

  const columns = [
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
      title: '',
      dataIndex: '_id',
      render: _id => (
        <a
          href={`${ADMIN_PATH}/transaction-details?tokenId=${_id}`}
          className="btn btn-just-icon btn-secondary btn-simple"
        >
          <i className="far fa-eye" />
        </a>
      ),
      width: 60,
      align: 'right',
    },
  ]

  useEffect(() => {
    if (!projectId || !projectOwnerId) return
    getProjectTokens({ userId: projectOwnerId, projectId, pagination: DEFAULT_PAGINATION.SIZE_5 })
  }, [projectId, projectOwnerId, getProjectTokens])

  const getProjectTokenList = useCallback(
    ({ pagination, sortField, sortOrder, filters }) => {
      if (projectOwnerId) {
        getProjectTokens({
          userId: projectOwnerId,
          projectId,
          pagination,
          sortField,
          sortOrder,
          filters,
        })
      }
    },
    [projectId, projectOwnerId, getProjectTokens]
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
