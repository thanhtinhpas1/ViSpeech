/* eslint-disable no-underscore-dangle */
/* eslint-disable no-script-url */
/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useEffect, useState } from 'react'
import { useHistory } from 'react-router-dom'
import Utils from 'utils'
import InfoModal from 'components/customer/InfoModal/InfoModal.component'
import { CUSTOMER_PATH, TOKEN_TYPE } from 'utils/constant'
import TokenType from './components/TokenType/TokenType.component'
import PayOnlineModal from './components/PayOnlineModal/PayOnlineModal.container'

const TokenStatistics = ({ currentUser, getTokenTypeListObj, getMyProjectListObj, getTokenTypes, getMyProjects }) => {
  const [payOnlineModal, setPayOnlineModal] = useState({})
  const [infoModal, setInfoModal] = useState({})
  const history = useHistory()

  useEffect(() => {
    getTokenTypes()
  }, [getTokenTypes])

  useEffect(() => {
    if (currentUser._id) {
      const pagination = {
        current: 1,
        pageSize: 100,
      }
      const filters = {
        isValid: ['true'],
      }
      getMyProjects({ userId: currentUser._id, pagination, filters })
    }
  }, [currentUser._id, getMyProjects])

  const openPayOnlineModal = () => {
    if (!Utils.isEmailVerified(currentUser.roles)) {
      const infoObj = {
        title: 'Không thể thực hiện tác vụ',
        message:
          'Tài khoản của bạn chưa được kích hoạt. Vui lòng thực hiện xác thực email tại trang cá nhân để kích hoạt tài khoản.',
        icon: {
          isSuccess: false,
        },
        button: {
          content: 'Đến trang cá nhân',
          clickFunc: () => {
            window.$('#info-modal').modal('hide')
            history.push(`${CUSTOMER_PATH}/profile`)
          },
        },
      }
      setInfoModal(infoObj)
      window.$('#info-modal').modal('show')
      return
    }

    if (getMyProjectListObj.myProjectList.length === 0) {
      const infoObj = {
        title: 'Không thể thực hiện tác vụ',
        message: 'Bạn chưa có project nào. Tạo project để thực hiện tác vụ này.',
        icon: {
          isSuccess: false,
        },
        button: {
          content: 'Tạo project',
          clickFunc: () => {
            window.$('#info-modal').modal('hide')
            history.push(`${CUSTOMER_PATH}/create-project`)
          },
        },
      }
      setInfoModal(infoObj)
      window.$('#info-modal').modal('show')
      return
    }

    const selectedTypeId = window.$('.token-currency-choose .pay-option input[name="tokenType"]:checked').attr('id')
    const index = getTokenTypeListObj.tokenTypeList.findIndex(x => x._id === selectedTypeId)
    let selectedType = getTokenTypeListObj.tokenTypeList[index]
    selectedType = Utils.removePropertiesFromObject(selectedType, ['defaultChecked', 'createdDate', 'updatedDate'])
    const payOnlineObj = {
      user: currentUser,
      tokenType: selectedType,
    }
    setPayOnlineModal(payOnlineObj)
    window.$('#pay-online').modal('show')
  }

  return (
    <>
      <div className="card-innr">
        <div className="token-balance token-balance-with-icon">
          <div className="token-balance-icon">
            <img src={`${process.env.PUBLIC_URL}/images/customer/logo-light-sm.png`} alt="logo" />
          </div>
          <div className="token-balance-text">
            <h3 className="card-sub-title" style={{ fontSize: '16px', color: '#fff' }}>
              Các gói token
            </h3>
          </div>
        </div>
        <div className="token-balance token-balance-s2">
          <div className="token-currency-choose" style={{ color: '#495463' }}>
            <div className="row guttar-15px" style={{ display: 'flex' }}>
              {getTokenTypeListObj.tokenTypeList &&
                Utils.sortAndFilter(
                  getTokenTypeListObj.tokenTypeList,
                  (a, b) => a.price - b.price,
                  item => item.name !== TOKEN_TYPE.FREE.name
                ).map(tokenType => {
                  return (
                    <div className="col-3" key={tokenType._id}>
                      <TokenType tokenType={tokenType} />
                    </div>
                  )
                })}
            </div>
          </div>
        </div>
        <div style={{ float: 'right' }}>
          <a
            href="#!"
            className="btn btn-warning"
            onClick={openPayOnlineModal}
            style={{ display: 'flex', justifyContent: 'center' }}
          >
            <em className="pay-icon fas fa-dollar-sign" />
            Mua ngay
          </a>
        </div>
      </div>
      <PayOnlineModal payOnlineModal={payOnlineModal} myProjectList={getMyProjectListObj.myProjectList} />
      <InfoModal infoModal={infoModal} />
    </>
  )
}

export default TokenStatistics
