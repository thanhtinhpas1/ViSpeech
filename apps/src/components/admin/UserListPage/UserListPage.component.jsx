/* eslint-disable no-underscore-dangle */
/* eslint-disable no-alert */
/* eslint-disable jsx-a11y/anchor-is-valid */
/* eslint-disable react/button-has-type */
/* eslint-disable jsx-a11y/label-has-associated-control */
import React, { useEffect } from 'react'
import { Link } from 'react-router-dom'
import { ADMIN_PATH } from 'utils/constant'
import * as moment from 'moment'
import ReactTable from 'components/admin/ReactTable/ReactTable.component'

const UserListPage = ({ currentUser, userListObj, deleteUserObj, getUserList, deleteUser }) => {
  useEffect(() => {
    if (deleteUserObj.isLoading === false && deleteUserObj.isSuccess === true) {
      getUserList()
    }
    //  else if (userListObj.isLoading === false && userListObj.isSuccess === null) {
    //   getUserList()
    // }
    // if (userListObj.isLoading === false && userListObj.isSuccess === true && isJsLoaded) {
    //   window.$('#userListDataTable').DataTable({
    //     pagingType: 'full_numbers',
    //     lengthMenu: [
    //       [10, 25, 50, -1],
    //       [10, 25, 50, 'All'],
    //     ],
    //     responsive: true,
    //     language: {
    //       search: '',
    //       // searchPlaceholder: 'Type in to Search',
    //       info: 'Hiển thị _START_ đến _END_ trên _TOTAL_ dòng',
    //       infoEmpty: 'Không có dữ liệu',
    //       infoFiltered: '(filtered from _MAX_ total entries)',
    //       paginate: {
    //         first: 'Trang đầu',
    //         last: 'Trang cuối',
    //         next: 'Tiếp theo',
    //         previous: 'Quay lại',
    //       },
    //     },
    //   })

    //   const table = window.$('#userListDataTable').DataTable()

    //   // Like record
    //   table.on('click', '.like', function a() {
    //     alert('You clicked on Like button')
    //   })

    //   window.$('.card .material-datatables label').addClass('form-group')
    // }
  }, [deleteUserObj, getUserList])

  const columns = [
    {
      Header: 'Họ tên',
      accessor: 'fullName',
      Cell: props => {
        const { cell } = props
        return <span>{cell.value}</span>
      },
    },
    {
      Header: 'Tên đăng nhập',
      accessor: 'username',
      Cell: props => {
        const { cell } = props
        return <span>{cell.value}</span>
      },
    },
    {
      Header: 'Email',
      accessor: 'email',
      Cell: props => {
        const { cell } = props
        return <span>{cell.value}</span>
      },
    },
    {
      Header: 'Vai trò',
      accessor: 'rolesInText',
      Cell: props => {
        const { cell } = props
        return <span>{cell.value}</span>
      },
    },
    {
      Header: 'Tạo ngày',
      accessor: 'createdDate',
      Cell: props => moment(props.cell.value).format('DD/MM/YYYY HH:mm'),
    },
    {
      Header: '',
      accessor: '_id',
      id: 'action',
      headerClassName: 'text-right',
      className: 'text-right',
      Cell: props => {
        const { cell } = props
        return (
          <>
            <Link
              to={`${ADMIN_PATH}/user-info/${cell.value}`}
              className="btn btn-simple btn-warning btn-icon edit"
            >
              <i className="material-icons">dvr</i>
            </Link>
            <a
              href="#"
              className="btn btn-simple btn-danger btn-icon remove"
              onClick={() => deleteUser(cell.value)}
            >
              <i className="material-icons">close</i>
            </a>
          </>
        )
      },
    },
  ]

  return (
    <div className="row">
      <div className="col-md-12">
        <div className="card">
          <div className="card-content">
            <h4 className="card-title" style={{ display: 'flex', justifyContent: 'space-between' }}>
              <span>Danh sách khách hàng</span>
              <a
                href={`${ADMIN_PATH}/create-user`}
                className="btn btn-just-icon btn-simple btn-behance m-0"
                rel="tooltip"
                title="Thêm mới"
              >
                <i className="zmdi zmdi-plus-circle-o" />
              </a>
            </h4>
            <div className="toolbar" />
            <div className="material-datatables">
              {/* {userListObj.isLoading === false && userListObj.isSuccess === true && isJsLoaded && (
                <table
                  id="userListDataTable"
                  className="table table-striped table-no-bordered table-hover"
                  cellSpacing={0}
                  width="100%"
                  style={{ width: '100%' }}
                >
                  <thead>
                    <tr>
                      <th>Họ tên</th>
                      <th>Tên đăng nhập</th>
                      <th>Email</th>
                      <th>Vai trò</th>
                      <th>Tạo ngày</th>
                      <th className="disabled-sorting text-right">Thao tác</th>
                    </tr>
                  </thead>
                  <tfoot>
                    <tr>
                      <th>Họ tên</th>
                      <th>Tên đăng nhập</th>
                      <th>Email</th>
                      <th>Vai trò</th>
                      <th>Tạo ngày</th>
                      <th className="text-right">Actions</th>
                    </tr>
                  </tfoot>
                  <tbody>
                    {userListObj.userList.map(user => {
                      return (
                        <tr key={user._id}>
                          <td>
                            {user.lastName} {user.firstName}
                          </td>
                          <td>{user.username}</td>
                          <td>{user.email}</td>
                          <td>{Utils.getRolesInText(user.roles)}</td>
                          <td>{moment(user.createdDate).format('DD/MM/YYYY HH:MM')}</td>
                          <td className="text-right">
                            <a href="#" className="btn btn-simple btn-info btn-icon like">
                              <i className="material-icons">favorite</i>
                            </a>
                            <Link
                              to={`/admin/user-info/${user._id}`}
                              className="btn btn-simple btn-warning btn-icon edit"
                            >
                              <i className="material-icons">dvr</i>
                            </Link>
                            <a
                              href="#"
                              className="btn btn-simple btn-danger btn-icon remove"
                              onClick={e => onDeleteUser(e, user._id)}
                            >
                              <i className="material-icons">close</i>
                            </a>
                          </td>
                        </tr>
                      )
                    })}
                  </tbody>
                </table>
              )} */}
              {currentUser._id && (
                <ReactTable
                  columns={columns}
                  data={userListObj.userList}
                  fetchData={getUserList}
                  loading={userListObj.isLoading}
                  pageCount={Math.ceil(userListObj.userList.length / 5)}
                  defaultPageSize={5}
                  pageSize={5}
                />
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default UserListPage
