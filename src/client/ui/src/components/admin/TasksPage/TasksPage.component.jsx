/* eslint-disable no-underscore-dangle */
/* eslint-disable no-alert */
/* eslint-disable jsx-a11y/anchor-is-valid */
/* eslint-disable react/button-has-type */
/* eslint-disable jsx-a11y/label-has-associated-control */
import React, { useEffect } from 'react'
import * as moment from 'moment'
import AntdTable from 'components/common/AntdTable/AntdTable.component'
import { STATUS } from 'utils/constant'

const TasksPage = ({ taskListObj, getTaskList }) => {
  const columns = [
    {
      title: 'Tên',
      dataIndex: 'name',
      canSearch: true,
      render: name => <span>{name}</span>,
      width: 180,
    },
    {
      title: 'Thời gian kế tiếp',
      dataIndex: 'nextRun',
      sorter: true,
      render: nextRun => moment(nextRun).format('DD/MM/YYYY HH:mm:ss'),
      width: 200,
      align: 'center',
    },
    {
      title: 'Thời gian trước đó',
      dataIndex: 'previousRun',
      sorter: true,
      render: nextRun => moment(nextRun).format('DD/MM/YYYY HH:mm:ss'),
      width: 220,
      align: 'center',
    },
    {
      title: 'Trạng thái',
      dataIndex: 'previousRunStatus',
      filters: [
        { text: STATUS.SUCCESS.viText, value: STATUS.SUCCESS.name },
        { text: STATUS.FAILURE.viText, value: STATUS.FAILURE.name },
      ],
      filterMultiple: false,
      render: previousRunStatus => (
        <span className={`badge ${previousRunStatus.status && previousRunStatus.class} ucap`}>
          {previousRunStatus.name}
        </span>
      ),
      width: 180,
      align: 'center',
    },
    {
      title: 'Lỗi',
      dataIndex: 'errorLog',
      render: errorLog => <span>{errorLog}</span>,
      width: 200,
      ellipsis: true,
    },
  ]

  useEffect(() => {
    const pagination = {
      pageSize: 10,
      current: 1,
    }
    getTaskList({ pagination })
  }, [getTaskList])

  return (
    <div className="row">
      <div className="col-md-12">
        <div className="card">
          <div className="card-header">
            <h4 className="card-title">Danh sách thực thi</h4>
          </div>
          <div className="card-content">
            <div className="material-datatables">
              <AntdTable
                dataObj={taskListObj.taskList}
                columns={columns}
                fetchData={getTaskList}
                isLoading={taskListObj.isLoading}
                pageSize={10}
                scrollY={700}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default TasksPage
