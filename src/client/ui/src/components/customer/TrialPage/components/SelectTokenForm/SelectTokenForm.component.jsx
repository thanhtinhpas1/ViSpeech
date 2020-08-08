/* eslint-disable prefer-promise-reject-errors */
/* eslint-disable no-underscore-dangle */
import React, { useEffect, useCallback } from 'react'
import { Form, Select, Row } from 'antd'
import { DEFAULT_PAGINATION, STATUS } from '../../../../../utils/constant'
import Utils from '../../../../../utils'
import LoadingIcon from '../../../../common/LoadingIcon/LoadingIcon.component'
import './SelectTokenForm.style.scss'

const { Option } = Select

const SelectTokenForm = ({
  currentUser,
  uploading,
  getMyProjectListObj,
  getAcceptedProjectListObj,
  getProjectTokenListObj,
  getFreeTokenObj,
  getMyProjects,
  getAcceptedProjectList,
  getProjectTokenList,
  getFreeToken,
  onSelectTokenFormValuesChange,
  clearGetProjectTokenState,
}) => {
  const [form] = Form.useForm()

  useEffect(() => {
    return () => clearGetProjectTokenState()
  }, [clearGetProjectTokenState])

  useEffect(() => {
    if (currentUser._id) {
      getFreeToken(currentUser._id)
    }
  }, [currentUser._id, getFreeToken])

  useEffect(() => {
    if (currentUser._id) {
      const filters = {
        isValid: ['true'],
        status: [STATUS.ACCEPTED.name],
      }
      if (Utils.isEmailVerified(currentUser.roles)) {
        getMyProjects({ userId: currentUser._id, pagination: DEFAULT_PAGINATION.SIZE_100, filters })
      }
      getAcceptedProjectList({ userId: currentUser._id, pagination: DEFAULT_PAGINATION.SIZE_100, filters })
    }
  }, [currentUser._id, currentUser.roles, getMyProjects, getAcceptedProjectList])

  const onProjectIdChange = useCallback(
    (projectId, projectOwnerId, myProjectList, acceptedProjectList) => {
      const filters = {
        isValid: ['true'],
      }
      if (projectOwnerId) {
        getProjectTokenList({ userId: projectOwnerId, projectId, pagination: DEFAULT_PAGINATION.SIZE_100, filters })
      } else {
        const filterConditions = { userId: null, projectId, pagination: DEFAULT_PAGINATION.SIZE_100, filters }
        let project = myProjectList.find(item => item._id === projectId)
        if (project) {
          filterConditions.userId = project.userId
          getProjectTokenList(filterConditions)
        } else {
          project = acceptedProjectList.find(item => item._id === projectId)
          if (project) {
            filterConditions.assigneeId = currentUser._id
            filterConditions.userId = project.userId
            getProjectTokenList(filterConditions)
          }
        }
      }
    },
    [currentUser._id, getProjectTokenList]
  )

  const onChangeTokenValue = tokenValue => {
    if (getFreeTokenObj.freeToken && getFreeTokenObj.freeToken.value === tokenValue) {
      form.setFields([{ name: 'projectId', value: null }])
    }
  }

  // useEffect(() => {
  //   if (
  //     getMyProjectListObj.isLoading === false &&
  //     getMyProjectListObj.isSuccess === true &&
  //     getAcceptedProjectListObj.isLoading === false &&
  //     getAcceptedProjectListObj.isSuccess === true
  //   ) {
  //     if (getMyProjectListObj.myProjectList.data.length > 0) {
  //       const { _id, userId } = getMyProjectListObj.myProjectList.data[0]
  //       onProjectIdChange(_id, userId)
  //     } else if (getAcceptedProjectListObj.acceptedProjectList.data.length > 0) {
  //       const { _id, userId } = getAcceptedProjectListObj.acceptedProjectList.data[0]
  //       onProjectIdChange(_id, userId)
  //     }
  //   }
  // }, [getMyProjectListObj, getAcceptedProjectListObj, onProjectIdChange])

  useEffect(() => {
    if (getFreeTokenObj.isLoading === false && getFreeTokenObj.isSuccess === true) {
      if (getFreeTokenObj.freeToken.value) {
        form.setFields([{ name: 'tokenValue', value: getFreeTokenObj.freeToken.value }])
      }
    }
  }, [getFreeTokenObj, form])

  useEffect(() => {
    if (getProjectTokenListObj.isLoading === false && getProjectTokenListObj.isSuccess === true) {
      // reset tokenId value to new initial value
      // form.resetFields(['tokenValue'])
      if (getProjectTokenListObj.projectTokenList.data.length > 0) {
        form.setFields([{ name: 'tokenValue', value: getProjectTokenListObj.projectTokenList.data[0].value }])
      }
    }
  }, [getProjectTokenListObj, form])

  useEffect(() => {
    const fieldsValue = form.getFieldsValue(['projectId', 'tokenValue'])
    const { projectId, tokenValue } = fieldsValue
    // if (!projectId || !tokenValue) return
    let project = projectId ? getMyProjectListObj.myProjectList.data.find(item => item._id === projectId) : null
    if (project == null) {
      project = projectId
        ? getAcceptedProjectListObj.acceptedProjectList.data.find(item => item._id === projectId)
        : null
    }
    let token = tokenValue ? getProjectTokenListObj.projectTokenList.data.find(item => item.value === tokenValue) : null
    if (token == null) {
      token =
        getFreeTokenObj.freeToken && getFreeTokenObj.freeToken.value === tokenValue ? getFreeTokenObj.freeToken : null
    }
    onSelectTokenFormValuesChange(project, token)
  }, [
    form,
    getMyProjectListObj.myProjectList.data,
    getAcceptedProjectListObj.acceptedProjectList.data,
    getFreeTokenObj.freeToken,
    getProjectTokenListObj.projectTokenList.data,
    onSelectTokenFormValuesChange,
  ])

  const onFormValuesChange = (changedValue, allValues) => {
    const { projectId, tokenValue } = allValues
    let project = projectId ? getMyProjectListObj.myProjectList.data.find(item => item._id === projectId) : null
    if (project == null) {
      project = projectId
        ? getAcceptedProjectListObj.acceptedProjectList.data.find(item => item._id === projectId)
        : null
    }
    let token = tokenValue ? getProjectTokenListObj.projectTokenList.data.find(item => item.value === tokenValue) : null
    if (token == null) {
      token =
        getFreeTokenObj.freeToken && getFreeTokenObj.freeToken.value === tokenValue ? getFreeTokenObj.freeToken : null
    }
    onSelectTokenFormValuesChange(project, token)
  }

  return (
    <Row style={{ marginBottom: 20, marginTop: 20 }} className="select-token-form">
      {(getFreeTokenObj.isLoading ||
        getMyProjectListObj.isLoading ||
        getAcceptedProjectListObj.isLoading ||
        getProjectTokenListObj.isLoading) && (
        <div className="select-token-form__loading">
          <LoadingIcon />
        </div>
      )}
      {!getFreeTokenObj.isLoading &&
        getFreeTokenObj.isSuccess != null &&
        // !getMyProjectListObj.isLoading &&
        // getMyProjectListObj.isSuccess != null &&
        !getAcceptedProjectListObj.isLoading &&
        getAcceptedProjectListObj.isSuccess != null && (
          // !getProjectTokenListObj.isLoading &&
          // getProjectTokenListObj.isSuccess != null && (
          <Form
            layout="inline"
            form={form}
            onValuesChange={onFormValuesChange}
            // initialValues={
            //   getFreeTokenObj.freeToken
            //     ? {
            //         tokenValue: getFreeTokenObj.freeToken.value,
            //       }
            //     : {
            //         projectId:
            //           (getMyProjectListObj.myProjectList.data[0] && getMyProjectListObj.myProjectList.data[0]._id) ||
            //           (getAcceptedProjectListObj.acceptedProjectList.data[0] &&
            //             getAcceptedProjectListObj.acceptedProjectList.data[0]._id),
            //         tokenValue:
            //           getProjectTokenListObj.projectTokenList.data[0] &&
            //           getProjectTokenListObj.projectTokenList.data[0].value,
            //       }
            // }
          >
            <Form.Item name="projectId" label="Dự án" rules={[{ required: true, message: 'Vui lòng chọn một dự án.' }]}>
              <Select
                style={{ minWidth: 180 }}
                onChange={value =>
                  onProjectIdChange(
                    value,
                    null,
                    getMyProjectListObj.myProjectList.data,
                    getAcceptedProjectListObj.acceptedProjectList.data
                  )
                }
                placeholder={
                  (getMyProjectListObj.myProjectList.data || []).length > 0 ||
                  (getAcceptedProjectListObj.acceptedProjectList.data || []).length > 0
                    ? 'Chọn một dự án'
                    : 'Không tìm thấy dự án'
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
                {(getAcceptedProjectListObj.acceptedProjectList.data || []).map(item => {
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
              label="API key"
              dependencies={['projectId']}
              rules={[
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
              ]}
            >
              <Select
                style={{ minWidth: 180 }}
                onChange={onChangeTokenValue}
                placeholder={
                  (getProjectTokenListObj.projectTokenList.data || []).length > 0 || getFreeTokenObj.freeToken != null
                    ? 'Chọn một API key'
                    : 'Không tìm thấy API key'
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
                {getFreeTokenObj.freeToken != null && (
                  <Option key={getFreeTokenObj.freeToken._id} value={getFreeTokenObj.freeToken.value}>
                    {getFreeTokenObj.freeToken.name}
                  </Option>
                )}
              </Select>
            </Form.Item>
          </Form>
        )}
    </Row>
  )
}

export default SelectTokenForm
