/* eslint-disable jsx-a11y/control-has-associated-label */
/* eslint-disable jsx-a11y/label-has-associated-control */
import React, { useEffect } from 'react'
import { CUSTOMER_PATH } from 'utils/constant'

const TransactionsPage = ({ isJsLoaded }) => {
  const tableDataArr = [
    {
      id: 'TNX1001',
      state: { name: 'Có vấn đề', class: 'data-state-pending' },
      date: '2018-08-24 10:20 PM',
      type: { name: 'Mua', class: 'badge-success' },
      key: 'Trống',
    },
    {
      id: 'TNX1002',
      state: { name: 'Đang xử lý', class: 'data-state-progress' },
      date: '2018-08-24 10:20 PM',
      type: { name: 'Tặng', class: 'badge-warning' },
      key: 'Trống',
    },
    {
      id: 'TNX1003',
      state: { name: 'Thành công', class: 'data-state-approved' },
      date: '2018-08-24 10:20 PM',
      type: { name: 'Miễn phí', class: 'badge-warning' },
      key: 'eyJh...0ur8',
    },
    {
      id: 'TNX1004',
      state: { name: 'Có vấn đề', class: 'data-state-pending' },
      date: '2018-08-24 10:20 PM',
      type: { name: 'Mua', class: 'badge-success' },
      key: 'Trống',
    },
    {
      id: 'TNX1005',
      state: { name: 'Đang xử lý', class: 'data-state-progress' },
      date: '2018-08-24 10:20 PM',
      type: { name: 'Tặng', class: 'badge-warning' },
      key: 'Trống',
    },
    {
      id: 'TNX1006',
      state: { name: 'Thành công', class: 'data-state-approved' },
      date: '2018-08-24 10:20 PM',
      type: { name: 'Miễn phí', class: 'badge-warning' },
      key: 'eyJh...0ur8',
    },
    {
      id: 'TNX1007',
      state: { name: 'Có vấn đề', class: 'data-state-pending' },
      date: '2018-08-24 10:20 PM',
      type: { name: 'Mua', class: 'badge-success' },
      key: 'Trống',
    },
    {
      id: 'TNX1008',
      state: { name: 'Đang xử lý', class: 'data-state-progress' },
      date: '2018-08-24 10:20 PM',
      type: { name: 'Tặng', class: 'badge-warning' },
      key: 'Trống',
    },
  ]

  useEffect(() => {
    // if (currentUser._id && token.isLoading === false && token.isSuccess === null) {
    //   getTokens(currentUser._id)
    // }
    if (isJsLoaded) {
      window.$('#transactionListDataTable').DataTable({
        ordering: !1,
        autoWidth: !1,
        dom: '<t><"row align-items-center"<"col-sm-6 text-left"p><"col-sm-6 text-sm-right"i>>',
        pageLength: 5,
        // bPaginate: e('.data-table tbody tr').length > 5,
        // iDisplayLength: 5,
        language: {
          search: '',
          // searchPlaceholder: 'Type in to Search',
          info: 'Hiển thị _START_ đến _END_ trên _TOTAL_ dòng',
          infoEmpty: 'Không có dữ liệu',
          infoFiltered: '(filtered from _MAX_ total entries)',
          paginate: {
            first: 'Trang đầu',
            last: 'Trang cuối',
            next: 'Tiếp theo',
            previous: 'Quay lại',
          },
        },
      })
    }
  }, [isJsLoaded])

  return (
    <div className="page-content">
      <div className="container">
        <div className="card content-area">
          <div className="card-innr">
            <div className="card-head">
              <h4 className="card-title">Lịch sử giao dịch</h4>
            </div>
            {isJsLoaded && (
              <table className="data-table user-tnx" id="transactionListDataTable">
                <thead>
                  <tr className="data-item data-head">
                    <th className="data-col dt-tnxno">Mã</th>
                    <th className="data-col dt-token">Trạng thái</th>
                    <th className="data-col dt-amount">Thời gian</th>
                    <th className="data-col dt-usd-account">Key</th>
                    <th className="data-col dt-type">
                      <div className="dt-type-text">Loại</div>
                    </th>
                    <th className="data-col" />
                  </tr>
                </thead>
                <tbody>
                  {tableDataArr.map(dataItem => {
                    return (
                      <tr className="data-item" key={dataItem.id}>
                        <td className="data-col dt-tnxno">
                          <span className="lead tnx-id">{dataItem.id}</span>
                        </td>
                        <td className="data-col dt-token">
                          <div className="d-flex align-items-center">
                            <div className={`data-state ${dataItem.state.class}`} />
                            <span className="sub sub-s2">{dataItem.state.name}</span>
                          </div>
                        </td>
                        <td className="data-col dt-amount">
                          <span className="sub sub-date">{dataItem.date}</span>
                        </td>
                        <td className="data-col dt-account">
                          <span
                            className={`${
                              dataItem.key !== 'Trống' ? 'lead' : 'sub sub-s2'
                            } user-info`}
                          >
                            {dataItem.key}
                          </span>
                        </td>
                        <td className="data-col dt-type">
                          <span
                            className={`dt-type-md badge badge-outline ${dataItem.type.class} badge-md`}
                          >
                            {dataItem.type.name}
                          </span>
                          <span
                            className={`dt-type-sm badge badge-sq badge-outline ${dataItem.type.class} badge-md`}
                          >
                            {dataItem.type.name}
                          </span>
                        </td>
                        <td className="data-col text-right">
                          <a
                            href={`${CUSTOMER_PATH}/transaction-details`}
                            className="btn btn-light-alt btn-xs btn-icon"
                          >
                            <em className="ti ti-eye" />
                          </a>
                        </td>
                      </tr>
                    )
                  })}
                </tbody>
              </table>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

export default TransactionsPage
