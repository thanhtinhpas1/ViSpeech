/* eslint-disable prefer-promise-reject-errors */
/* eslint-disable no-underscore-dangle */
import React, { useCallback, useEffect } from 'react'
import { Form, Row, Select } from 'antd'
import { DEFAULT_PAGINATION } from 'utils/constant'
import Utils from 'utils'
import LoadingIcon from 'components/common/LoadingIcon/LoadingIcon.component'
import './SelectTokenForm.style.scss'

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
  const [ form ] = Form.useForm()

  useEffect(() => {
    if (currentUser._id && Utils.isEmailVerified(currentUser.roles)) {
      const filters = {
        isValid: [ 'true' ],
      }
      getMyProjects({ userId: currentUser._id, pagination: DEFAULT_PAGINATION.SIZE_100, filters })
    }
  }, [ currentUser._id, currentUser.roles, getMyProjects ])

  const onProjectIdChange = useCallback(
    value => {
      const userId = currentUser && currentUser._id
      if (userId) {
        const filters = {
          isValid: [ 'true' ],
        }
        getProjectTokenList({ userId, projectId: value, pagination: DEFAULT_PAGINATION.SIZE_100, filters })
      }
    },
    [ currentUser, getProjectTokenList ]
  )

  useEffect(() => {
    if (getMyProjectListObj.isLoading === false && getMyProjectListObj.isSuccess === true) {
      if (getMyProjectListObj.myProjectList.data.length > 0) {
        onProjectIdChange(getMyProjectListObj.myProjectList.data[0]._id)
      }
    }
  }, [ getMyProjectListObj, onProjectIdChange ])

  useEffect(() => {
    if (getProjectTokenListObj.isLoading === false && getProjectTokenListObj.isSuccess === true) {
      // reset tokenId value to new initial value
      form.resetFields([ 'tokenValue' ])
    }
  }, [ getProjectTokenListObj, form ])

  useEffect(() => {
    const fieldsValue = form.getFieldsValue([ 'projectId', 'tokenValue' ])
    const { projectId, tokenValue } = fieldsValue
    if (!projectId || !tokenValue) return
    const project = projectId ? getMyProjectListObj.myProjectList.data.find(item => item._id === projectId) : null
    const token = tokenValue
      ? getProjectTokenListObj.projectTokenList.data.find(item => item.value === tokenValue)
      : null
    onSelectTokenFormValuesChange(project, token)
  }, [
    form,
    getMyProjectListObj.myProjectList.data,
    getProjectTokenListObj.projectTokenList.data,
    onSelectTokenFormValuesChange,
  ])

  const onFormValuesChange = (changedValue, allValues) => {
    const { projectId, tokenValue } = allValues
    const project = projectId ? getMyProjectListObj.myProjectList.data.find(item => item._id === projectId) : null
    const token = tokenValue
      ? getProjectTokenListObj.projectTokenList.data.find(item => item.value === tokenValue)
      : null
    onSelectTokenFormValuesChange(project, token)
  }

  return (
    <Row style={ { marginBottom: 20, marginTop: 20 } } className="select-token-form">
      { (getMyProjectListObj.isLoading || getProjectTokenListObj.isLoading) && (
        <div className="select-token-form__loading">
          <LoadingIcon/>
        </div>
      ) }
      { !getMyProjectListObj.isLoading &&
      getMyProjectListObj.isSuccess != null &&
      !getProjectTokenListObj.isLoading &&
      getProjectTokenListObj.isSuccess != null && (
        <Form
          layout="inline"
          form={ form }
          onValuesChange={ onFormValuesChange }
          initialValues={ {
            projectId: getMyProjectListObj.myProjectList.data[0] && getMyProjectListObj.myProjectList.data[0]._id,
            tokenValue:
              getProjectTokenListObj.projectTokenList.data[0] &&
              getProjectTokenListObj.projectTokenList.data[0].value,
          } }
        >
          <Form.Item name="projectId" label="Dự án"
                     rules={ [ { required: true, message: 'Vui lòng chọn một dự án.' } ] }>
            <Select
              style={ { minWidth: 180 } }
              onChange={ onProjectIdChange }
              placeholder={
                (getMyProjectListObj.myProjectList.data || []).length > 0 ? 'Chọn một dự án' : 'Không tìm thấy dự án'
              }
              disabled={ uploading }
            >
              { (getMyProjectListObj.myProjectList.data || []).map(item => {
                return (
                  <Option key={ item._id } value={ item._id }>
                    { item.name }
                  </Option>
                )
              }) }
            </Select>
          </Form.Item>
          <Form.Item
            name="tokenValue"
            label="API key"
            dependencies={ [ 'projectId' ] }
            rules={ [
              { required: true, message: 'Vui lòng chọn một API key.' },
              ({ getFieldValue }) => ({
                async validator() {
                  const projectId = getFieldValue('projectId')
                  if (!projectId) {
                    return Promise.reject('Vui lòng chọn một dự án')
                  }
                  return Promise.resolve()
                },
              }),
            ] }
          >
            <Select
              style={ { minWidth: 180 } }
              placeholder={
                (getProjectTokenListObj.projectTokenList.data || []).length > 0
                  ? 'Chọn một API key'
                  : 'Không tìm thấy API key'
              }
              disabled={ uploading }
            >
              { (getProjectTokenListObj.projectTokenList.data || []).map(item => {
                return (
                  <Option key={ item._id } value={ item.value }>
                    { item.name }
                  </Option>
                )
              }) }
            </Select>
          </Form.Item>
        </Form>
      ) }
    </Row>
  )
}

export default SelectTokenForm
