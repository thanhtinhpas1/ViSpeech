/* eslint-disable prefer-promise-reject-errors */
/* eslint-disable no-underscore-dangle */
import React, { useCallback, useEffect, useState } from 'react'
import { Form, Row, Select } from 'antd'
import { DEFAULT_PAGINATION, TOKEN_TYPE } from 'utils/constant'
import Utils from 'utils'
import LoadingIcon from 'components/common/LoadingIcon/LoadingIcon.component'
import './SelectTokenForm.style.scss'

const { Option } = Select

const SelectTokenForm = ({
                           currentUser,
                           getMyProjectListObj,
                           getProjectTokenListObj,
                           createOrderToUpgradeObj,
                           getMyProjects,
                           getProjectTokenList,
                           onSelectTokenFormValuesChange,
                           setCurrentTokenTypeMinutes,
                         }) => {
  const EMPTY = 'Trống'
  const [ form ] = Form.useForm()
  const [ currentTokenType, setCurrentTokenType ] = useState(EMPTY)

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
        setCurrentTokenType(EMPTY)
        setCurrentTokenTypeMinutes(0)
      }
    },
    [ currentUser, getProjectTokenList, setCurrentTokenTypeMinutes ]
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
      form.resetFields([ 'tokenId' ])
    }
  }, [ getProjectTokenListObj, form ])

  useEffect(() => {
    if (createOrderToUpgradeObj.isLoading === false && createOrderToUpgradeObj.isSuccess === true) {
      const userId = currentUser && currentUser._id
      const fieldsValue = form.getFieldsValue([ 'projectId' ])
      if (userId) {
        const filters = {
          isValid: [ 'true' ],
        }
        getProjectTokenList({
          userId,
          projectId: fieldsValue.projectId,
          pagination: DEFAULT_PAGINATION.SIZE_100,
          filters,
        })
      }
    }
  }, [ currentUser, form, createOrderToUpgradeObj, getProjectTokenList ])

  useEffect(() => {
    const fieldsValue = form.getFieldsValue([ 'projectId', 'tokenId' ])
    const { projectId, tokenId } = fieldsValue
    onSelectTokenFormValuesChange(projectId, tokenId)
    if (!projectId || !tokenId) return

    const token = getProjectTokenListObj.projectTokenList.data.find(item => item._id === tokenId)
    if (!token) return

    const tokenTypes = Object.keys(TOKEN_TYPE)
    const findIndexFunc = tokenType => TOKEN_TYPE[tokenType].minutes === token.minutes
    const index = tokenTypes[tokenTypes.findIndex(findIndexFunc)]
    setCurrentTokenType(TOKEN_TYPE[index].viText)
    setCurrentTokenTypeMinutes(TOKEN_TYPE[index].minutes)
  }, [ form, getProjectTokenListObj.projectTokenList.data, onSelectTokenFormValuesChange, setCurrentTokenTypeMinutes ])

  const onFormValuesChange = (changedValue, allValues) => {
    const { projectId, tokenId } = allValues
    onSelectTokenFormValuesChange(projectId, tokenId)
    if (!projectId || !tokenId) return

    const token = getProjectTokenListObj.projectTokenList.data.find(item => item._id === tokenId)
    if (!token) return

    const tokenTypes = Object.keys(TOKEN_TYPE)
    const findIndexFunc = tokenType => TOKEN_TYPE[tokenType].minutes === token.minutes
    const index = tokenTypes[tokenTypes.findIndex(findIndexFunc)]
    setCurrentTokenType(TOKEN_TYPE[index].viText)
    setCurrentTokenTypeMinutes(TOKEN_TYPE[index].minutes)
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
            tokenId:
              getProjectTokenListObj.projectTokenList.data[0] && getProjectTokenListObj.projectTokenList.data[0]._id,
          } }
        >
          <div>
            <h5 className="font-mid">Dự án</h5>
            <Form.Item name="projectId" rules={ [ { required: true, message: 'Vui lòng chọn một dự án.' } ] }>
              <Select
                style={ { minWidth: 200 } }
                placeholder={
                  (getMyProjectListObj.myProjectList.data || []).length > 0
                    ? 'Chọn một dự án'
                    : 'Không tìm thấy dự án'
                }
                onChange={ onProjectIdChange }
              >
                { (getMyProjectListObj.myProjectList.data || []).map(project => {
                  return (
                    <Option value={ project._id } key={ project._id }>
                      { project.name }
                    </Option>
                  )
                }) }
              </Select>
            </Form.Item>
          </div>
          <div>
            <h5 className="font-mid">Tên API key</h5>
            <Form.Item
              name="tokenId"
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
                style={ { minWidth: 200 } }
                placeholder={
                  (getProjectTokenListObj.projectTokenList.data || []).length > 0
                    ? 'Chọn một API key'
                    : 'Không tìm thấy API key'
                }
              >
                { (getProjectTokenListObj.projectTokenList.data || []).map(item => {
                  return (
                    <Option key={ item._id } value={ item._id }>
                      { item.name }
                    </Option>
                  )
                }) }
              </Select>
            </Form.Item>
          </div>
          <div>
            <h5 className="font-mid">Gói API key hiện tại</h5>
            <div style={ { minWidth: 180 } }>{ currentTokenType }</div>
          </div>
        </Form>
      ) }
    </Row>
  )
}

export default SelectTokenForm
