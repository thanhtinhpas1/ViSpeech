/* eslint-disable no-underscore-dangle */
/* eslint-disable react/button-has-type */
/* eslint-disable jsx-a11y/control-has-associated-label */
/* eslint-disable jsx-a11y/label-has-associated-control */
import React, { useEffect } from 'react'
import { CUSTOMER_PATH } from 'utils/constant'

const TokensWalletPage = ({ currentUser, token, isJsLoaded, getTokens }) => {
  useEffect(() => {
    if (currentUser._id && token.isLoading === false && token.isSuccess === null) {
      getTokens(currentUser._id)
    }
    if (token.isLoading === false && token.isSuccess === true && isJsLoaded) {
      window.$('#tokenListDataTable').DataTable({
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
  }, [currentUser._id, token, getTokens, isJsLoaded])
  return (
    <div className="page-content">
      <div className="container">
        <div className="card content-area">
          <div className="card-innr">
            <div className="card-head">
              <h4 className="card-title">Ví key</h4>
            </div>
            {token.isLoading === false && token.isSuccess === true && isJsLoaded && (
              <table className="data-table user-tnx" id="tokenListDataTable">
                <thead>
                  <tr className="data-item data-head">
                    <th className="data-col dt-tnxno">Key</th>
                    <th className="data-col dt-type">Loại</th>
                    <th className="data-col dt-token">Trạng thái</th>
                    <th className="data-col dt-amount" style={{ textAlign: 'center' }}>
                      Thời gian còn lại
                    </th>
                    <th className="data-col" />
                  </tr>
                </thead>
                <tbody>
                  {token.tokenList.map(item => {
                    return (
                      <tr className="data-item" key={item._id}>
                        <td className="data-col dt-tnxno" style={{ paddingRight: '30px' }}>
                          <span className="lead tnx-id">
                            <div className="copy-wrap w-100">
                              <span className="copy-feedback" />
                              <em className="fas fa-key" />
                              <input
                                type="text"
                                className="copy-address"
                                defaultValue={item.value}
                                disabled
                              />
                              <button
                                className="copy-trigger copy-clipboard"
                                data-clipboard-text={item.value}
                              >
                                <em className="ti ti-files" />
                              </button>
                            </div>
                          </span>
                        </td>
                        <td className="data-col dt-tnxno" style={{ paddingRight: '30px' }}>
                          <div className="d-flex align-items-center">{item.tokenType.name}</div>
                        </td>
                        <td className="data-col dt-token">
                          <div className="d-flex align-items-center">
                            <div
                              className={`data-state ${
                                item.isValid ? 'data-state-approved' : 'data-state-pending'
                              }`}
                            />
                            <span className="sub sub-s2" style={{ paddingTop: '0' }}>
                              {item.isValid ? 'Hợp lệ' : 'Có vấn đề'}
                            </span>
                          </div>
                        </td>
                        <td className="data-col dt-amount" style={{ textAlign: 'center' }}>
                          <span className="sub sub-date">{item.minutes} phút</span>
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

export default TokensWalletPage
