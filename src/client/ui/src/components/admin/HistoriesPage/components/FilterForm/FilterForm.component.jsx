/* eslint-disable prefer-promise-reject-errors */
/* eslint-disable no-underscore-dangle */
import React, { useEffect } from 'react'
import { Form, Select, Button, DatePicker } from 'antd'
import ReportUtils from '../../../../../utils/report.util'
import { DEFAULT_PAGINATION, TOKEN_TYPE, STATUS } from '../../../../../utils/constant'

const { Option } = Select
const { RangePicker } = DatePicker

const FilterForm = ({
  getUsernameListObj,
  getProjectNameListObj,
  getUsernameList,
  getProjectNameList,
  setAdvancedFilters,
  filterData,
}) => {
  const [form] = Form.useForm()

  useEffect(() => {
    getUsernameList({
      pagination: DEFAULT_PAGINATION.SIZE_100,
      filters: {
        isActive: ['true'],
      },
    })
    getProjectNameList({
      pagination: DEFAULT_PAGINATION.SIZE_100,
      filters: {
        isValid: ['true'],
      },
    })
  }, [getUsernameList, getProjectNameList])

  const onFinish = values => {
    const { users, projects, tokenTypes, statuses, rangePicker } = values
    if (!users && !projects && !tokenTypes && !statuses && !rangePicker) return

    const advancedFilters = {}
    if (users?.length > 0) advancedFilters.userIds = users
    if (projects?.length > 0) advancedFilters.projectIds = projects
    if (tokenTypes?.length > 0) advancedFilters.tokenTypes = tokenTypes
    if (statuses?.length > 0) advancedFilters.statuses = statuses
    if (rangePicker?.length > 0) {
      advancedFilters.dates = {
        from: rangePicker[0].valueOf(),
        to: rangePicker[1].valueOf(),
      }
    }
    setAdvancedFilters(advancedFilters)
    filterData(advancedFilters)
  }

  return (
    <div style={{ marginBottom: 20 }}>
      <Form form={form} layout="inline" onFinish={onFinish} className="row">
        <div className="col-xs-12 col-sm-6 col-md-4 col-lg-3 mt-2">
          <Form.Item name="users" style={{ marginRight: '0' }}>
            <Select
              mode="multiple"
              style={{ width: '100%' }}
              placeholder={
                (getUsernameListObj.usernameList.data || []).length > 0 ? 'Chọn tài khoản' : 'Không tìm thấy tài khoản'
              }
            >
              {(getUsernameListObj.usernameList.data || []).map(user => {
                return (
                  <Option key={user._id} value={user._id}>
                    {user.username}
                  </Option>
                )
              })}
            </Select>
          </Form.Item>
        </div>
        <div className="col-xs-12 col-sm-6 col-md-4 col-lg-3 mt-2">
          <Form.Item name="projects" style={{ marginRight: '0' }}>
            <Select
              mode="multiple"
              style={{ width: '100%' }}
              placeholder={
                (getProjectNameListObj.projectNameList.data || []).length > 0 ? 'Chọn dự án' : 'Không tìm thấy dự án'
              }
            >
              {(getProjectNameListObj.projectNameList.data || []).map(project => {
                return (
                  <Option key={project._id} value={project._id}>
                    {project.name}
                  </Option>
                )
              })}
            </Select>
          </Form.Item>
        </div>
        <div className="col-xs-12 col-sm-6 col-md-4 col-lg-3 mt-2">
          <Form.Item name="tokenTypes" style={{ marginRight: '0' }}>
            <Select mode="multiple" style={{ width: '100%' }} placeholder="Chọn loại API key">
              {[TOKEN_TYPE.FREE, TOKEN_TYPE['50-MINUTES'], TOKEN_TYPE['200-MINUTES'], TOKEN_TYPE['500-MINUTES']].map(
                type => {
                  return (
                    <Option key={type.name} value={type.name}>
                      {type.viText}
                    </Option>
                  )
                }
              )}
            </Select>
          </Form.Item>
        </div>
        <div className="col-xs-12 col-sm-6 col-md-4 col-lg-3 mt-2">
          <Form.Item name="statuses" style={{ marginRight: '0' }}>
            <Select mode="multiple" style={{ width: '100%' }} placeholder="Chọn trạng thái">
              {[STATUS.PENDING, STATUS.IN_PROGRESS, STATUS.SUCCESS, STATUS.FAILURE].map(status => {
                return (
                  <Option key={status.name} value={status.name}>
                    {status.viText}
                  </Option>
                )
              })}
            </Select>
          </Form.Item>
        </div>
        <div className="col-xs-12 col-sm-6 col-md-8 col-lg-6 mt-2">
          <Form.Item name="rangePicker" style={{ marginRight: '0' }}>
            <RangePicker
              style={{ width: '100%' }}
              picker={ReportUtils.TIME_TYPE.DATE}
              format="DD/MM/YYYY"
              placeholder={['Ngày bắt đầu', 'Ngày kết thúc']}
            />
          </Form.Item>
        </div>
        <div className="col-xs-12 col-sm-6 col-md-4 col-lg-3 mt-2">
          <Form.Item style={{ marginRight: '0' }}>
            <Button type="primary" htmlType="submit" style={{ width: '100%' }}>
              Lọc kết quả
            </Button>
          </Form.Item>
        </div>
      </Form>
    </div>
  )
}

export default FilterForm
