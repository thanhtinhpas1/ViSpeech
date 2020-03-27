/* eslint-disable no-underscore-dangle */
/* eslint-disable no-script-url */
/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useEffect, useState } from 'react'
import Utils from 'utils'
import InfoModal from 'components/customer/InfoModal/InfoModal.component'
import TokenType from './components/TokenType/TokenType.component'
import PayOnlineModal from './components/PayOnlineModal/PayOnlineModal.component'

const TokenStatistics = ({ currentUser, token, getTokenTypes, sendVerifyEmail }) => {
  const [payOnlineModal, setPayOnlineModal] = useState({})
  const [infoModal, setInfoModal] = useState({})

  useEffect(() => {
    getTokenTypes()
    // const payOptionsArr = [
    //   {
    //     type: 'free',
    //     price: 'miễn phí',
    //     time: '10 tháng',
    //     defaultChecked: true,
    //   },
    //   {
    //     type: 'three-month',
    //     price: '100.000đ',
    //     time: '1 tháng',
    //     saleOff: { price: '50.000đ', time: '1 tháng' },
    //   },
    //   { type: 'payeth', price: '500.000đ', time: '6 tháng' },
    //   { type: 'one-year', price: '800.000đ', time: '1 năm' },
    // ]
    // setPayOptions(payOptionsArr)
  }, [getTokenTypes])

  const openPayOnlineModal = () => {
    if (!Utils.isEmailVerified(currentUser.roles)) {
      const infoObj = {
        title: 'Tài khoản chưa được kích hoạt',
        message: 'Vui lòng xác thực email để kích hoạt tài khoản.',
        icon: {
          isSuccess: false,
        },
        button: {
          content: 'Xác thực email',
          clickFunc: () => sendVerifyEmail(currentUser._id),
        },
      }
      setInfoModal(infoObj)
      window.$('#info-modal').modal('show')
      return
    }
    const selectedTypeId = window
      .$('.token-currency-choose .pay-option input[name="tokenType"]:checked')
      .attr('id')
    const index = token.tokenTypeList.findIndex(x => x._id === selectedTypeId)
    let selectedType = token.tokenTypeList[index]
    selectedType = Utils.removePropertiesFromObject(selectedType, ['defaultChecked', 'saleOff'])
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
              {token.tokenTypeList &&
                Utils.sortArr(token.tokenTypeList, (a, b) => a.price - b.price).map(tokenType => {
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
      <PayOnlineModal payOnlineModal={payOnlineModal} />
      <InfoModal infoModal={infoModal} />
    </>
  )
}

export default TokenStatistics
