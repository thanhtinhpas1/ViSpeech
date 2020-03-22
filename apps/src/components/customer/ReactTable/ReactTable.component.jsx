/* eslint-disable no-shadow */
/* eslint-disable react/jsx-props-no-spreading */
import React, { useEffect } from 'react'
import { useTable, usePagination } from 'react-table'

const ReactTable = ({ columns, data, fetchData, loading, pageCount: controlledPageCount }) => {
  // Use the state and functions returned from useTable to build your UI
  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    prepareRow,
    page, // Instead of using 'rows', we'll use page,
    // which has only the rows for the active page

    // The rest of these things are super handy, too ;)
    canPreviousPage,
    canNextPage,
    pageOptions,
    pageCount,
    gotoPage,
    nextPage,
    previousPage,
    // setPageSize,
    state: { pageIndex, pageSize },
  } = useTable(
    {
      columns,
      data,
      initialState: { pageIndex: 0, pageSize: 5 }, // Pass our hoisted table state
      manualPagination: true, // Tell the usePagination
      // hook that we'll handle our own data fetching
      // This means we'll also have to provide our own
      // pageCount.
      pageCount: controlledPageCount,
    },
    usePagination
  )

  useEffect(() => {
    fetchData({ pageIndex, pageSize })
  }, [fetchData, pageIndex, pageSize])

  return (
    <>
      <div className="dataTables_wrapper">
        <table {...getTableProps()} className="data-table user-tnx">
          <thead>
            {headerGroups.map(headerGroup => (
              <tr {...headerGroup.getHeaderGroupProps()} className="data-item data-head">
                {headerGroup.headers.map(column => (
                  <th
                    {...column.getHeaderProps()}
                    style={column.headerStyle || {}}
                    className={column.headerClassName || {}}
                  >
                    {column.render('Header')}
                  </th>
                ))}
              </tr>
            ))}
          </thead>
          <tbody {...getTableBodyProps()}>
            {page.map(row => {
              prepareRow(row)
              return (
                <tr {...row.getRowProps()} className="data-item">
                  {row.cells.map(cell => {
                    return (
                      <td
                        {...cell.getCellProps()}
                        style={cell.column.style || {}}
                        className={cell.column.className || {}}
                      >
                        {cell.render('Cell')}
                      </td>
                    )
                  })}
                </tr>
              )
            })}
            <tr className="data-item">
              {loading ? (
                // Use our custom loading state to show a loading indicator
                <td
                  colSpan="10000"
                  className="data-col"
                  style={{ borderBottom: 'none', color: '#23406c' }}
                >
                  Đang tải...
                </td>
              ) : (
                <td
                  colSpan="10000"
                  className="data-col"
                  style={{ borderBottom: 'none', color: '#23406c' }}
                >
                  Hiển thị {page.length} trên ~{controlledPageCount * pageSize} kết quả
                </td>
              )}
            </tr>
          </tbody>
        </table>
        {/* 
        Pagination can be built however you'd like. 
        This is just a very basic UI implementation:
      */}
        <div className="row align-items-center">
          <div className="text-left" style={{ whiteSpace: 'nowrap' }}>
            <div className="pagination dataTables_paginate">
              <ul className="pagination">
                <li className="paginate-button-page-item previous">
                  <a
                    href="#!"
                    className="page-link"
                    onClick={() => gotoPage(0)}
                    disabled={!canPreviousPage}
                  >
                    Trang đầu
                  </a>
                </li>
                <li className="paginate-button-page-item previous">
                  <a
                    href="#!"
                    className="page-link"
                    onClick={() => previousPage()}
                    disabled={!canPreviousPage}
                  >
                    Trang trước
                  </a>
                </li>
                <li className="paginate-button-page-item next">
                  <a
                    href="#!"
                    className="page-link"
                    onClick={() => nextPage()}
                    disabled={!canNextPage}
                  >
                    Trang kế
                  </a>
                </li>
                <li className="paginate-button-page-item next">
                  <a
                    href="#!"
                    className="page-link"
                    onClick={() => gotoPage(pageCount - 1)}
                    disabled={!canNextPage}
                  >
                    Trang cuối
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </div>
        <div className="row align-items-center justify-content-end" style={{ color: '#23406c' }}>
          <div>
            Trang{' '}
            <strong>
              {pageIndex + 1} / {pageOptions.length}
            </strong>{' '}
          </div>
          <div>
            | Nhập số trang{' '}
            <input
              className="input-bordered"
              type="number"
              defaultValue={pageIndex + 1}
              onChange={e => {
                const page = e.target.value ? Number(e.target.value) - 1 : 0
                gotoPage(page)
              }}
              style={{ width: '100px' }}
            />
          </div>{' '}
          {/* <select
            value={pageSize}
            onChange={e => {
              setPageSize(Number(e.target.value))
            }}
          >
            {[5, 10, 20, 30, 40, 50].map(pageSize => (
              <option key={pageSize} value={pageSize}>
                Hiển thị trang {pageSize}
              </option>
            ))}
          </select> */}
        </div>
      </div>
    </>
  )
}

export default ReactTable
