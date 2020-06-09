/* eslint-disable prefer-promise-reject-errors */
/* eslint-disable no-underscore-dangle */
import React, { useEffect } from 'react'
import { Form, Select, Row } from 'antd'
import { DEFAULT_PAGINATION } from 'utils/constant'
import Utils from 'utils'

const { Option } = Select

const SelectTokenForm = ({
  currentUser,
  uploading,
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
    const project = projectId ? getMyProjectListObj.myProjectList.data.find(item => item._id === projectId) : null
    const token = tokenValue
      ? getProjectTokenListObj.projectTokenList.data.find(item => item.value === tokenValue)
      : null
    onSelectTokenFormValuesChange(project, token)
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
    <Row style={{ marginBottom: 20, marginTop: 20 }}>
      <Form layout="inline" form={form} onValuesChange={onFormValuesChange}>
        <Form.Item name="projectId" label="Dự án" rules={[{ required: true, message: 'Vui lòng chọn một dự án.' }]}>
          <Select
            style={{ minWidth: 180 }}
            onChange={onProjectIdChange}
            placeholder={
              (getMyProjectListObj.myProjectList.data || []).length > 0 ? 'Chọn một dự án' : 'Không tìm thấy dự án'
            }
            disabled={uploading}
          >
            {(getMyProjectListObj.myProjectList.data || []).map(item => {
              return (
                <Option key={item._id} value={item._id}>
                  {item.name}
                </Option>
              )
            })}
          </Select>
        </Form.Item>
        <Form.Item
          name="tokenValue"
          label="Token"
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
          <Select
            style={{ minWidth: 180 }}
            placeholder={
              (getProjectTokenListObj.projectTokenList.data || []).length > 0
                ? 'Chọn một token'
                : 'Không tìm thấy token'
            }
            disabled={uploading}
          >
            {(getProjectTokenListObj.projectTokenList.data || []).map(item => {
              return (
                <Option key={item._id} value={item.value}>
                  {item.name}
                </Option>
              )
            })}
          </Select>
        </Form.Item>
      </Form>
    </Row>
  )
}

export default SelectTokenForm
