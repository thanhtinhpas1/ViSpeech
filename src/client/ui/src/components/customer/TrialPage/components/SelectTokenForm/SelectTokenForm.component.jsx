/* eslint-disable prefer-promise-reject-errors */
/* eslint-disable no-underscore-dangle */
import React, { useEffect } from 'react'
import { Form, Select, Row } from 'antd'
import { DEFAULT_PAGINATION } from 'utils/constant'
import Utils from 'utils'

const { Option } = Select

const SelectTokenForm = ({
  currentUser,
  getMyProjectListObj,
  getProjectTokenListObj,
  getMyProjects,
  getProjectTokenList,
  onSelectTokenFormValuesChange,
}) => {
  const [form] = Form.useForm()

  useEffect(() => {
    if (currentUser._id && Utils.isEmailVerified(currentUser.roles)) {
      const filters = {
        isValid: ['true'],
      }
      getMyProjects({ userId: currentUser._id, pagination: DEFAULT_PAGINATION, filters })
    }
  }, [currentUser._id, currentUser.roles, getMyProjects])

  const onFormValuesChange = (changedValue, allValues) => {
    const { projectId, tokenValue } = allValues
    onSelectTokenFormValuesChange(projectId, tokenValue)
  }

  const onProjectIdChange = value => {
    if (currentUser._id) {
      const filters = {
        isValid: ['true'],
      }
      getProjectTokenList({ userId: currentUser._id, projectId: value, pagination: DEFAULT_PAGINATION, filters })
    }
  }

  return (
    <Row>
      <Form layout="inline" form={form} onValuesChange={onFormValuesChange}>
        <Form.Item name="projectId" rules={[{ required: true, message: 'Vui lòng chọn một dự án.' }]}>
          {(getMyProjectListObj.myProjectList.data || []).length > 0 && getMyProjectListObj.myProjectList.data[0]._id && (
            <Select style={{ minWidth: 180 }} onChange={onProjectIdChange} placeholder="Chọn một dự án">
              <Option value={getMyProjectListObj.myProjectList.data[0]._id._id}>
                {getMyProjectListObj.myProjectList.data[0].name}
              </Option>
              {getMyProjectListObj.myProjectList.data
                .filter((item, index) => index !== 0)
                .map(item => {
                  return (
                    <Option key={item._id} value={item._id}>
                      {item.name}
                    </Option>
                  )
                })}
            </Select>
          )}
          {getMyProjectListObj.myProjectList.data.length === 0 && (
            <Select style={{ minWidth: 180 }} placeholder="Không tìm thấy dự án" />
          )}
        </Form.Item>
        <Form.Item
          name="tokenValue"
          dependencies={['projectId']}
          rules={[
            { required: true, message: 'Vui lòng chọn một token.' },
            ({ getFieldValue }) => ({
              async validator() {
                const projectId = getFieldValue('projectId')
                if (!projectId) {
                  return Promise.reject('Vui lòng chọn một dự án')
                }
                return Promise.resolve()
              },
            }),
          ]}
        >
          {(getProjectTokenListObj.projectTokenList.data || []).length > 0 &&
            getProjectTokenListObj.projectTokenList.data[0]._id && (
              <Select style={{ minWidth: 180 }} placeholder="Chọn một token">
                <Option value={getProjectTokenListObj.projectTokenList.data[0]._id._id}>
                  {getProjectTokenListObj.projectTokenList.data[0].name}
                </Option>
                {getProjectTokenListObj.projectTokenList.data
                  .filter((item, index) => index !== 0)
                  .map(item => {
                    return (
                      <Option key={item._id} value={item.value}>
                        {item.name}
                      </Option>
                    )
                  })}
              </Select>
            )}
          {getProjectTokenListObj.projectTokenList.data.length === 0 && (
            <Select style={{ minWidth: 180 }} placeholder="Không tìm thấy token" />
          )}
        </Form.Item>
      </Form>
    </Row>
  )
}

export default SelectTokenForm
