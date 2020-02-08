/* eslint-disable no-script-url */
/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useState, useEffect } from 'react'
import PayOption from './components/PayOption/PayOption.component'
import PayOnlineModal from './components/PayOnlineModal/PayOnlineModal.component'

const TokenStatistics = () => {
  const [payOptions, setPayOptions] = useState([])

  useEffect(() => {
    const payOptionsArr = [
      {
        type: 'free',
        price: 'miễn phí',
        time: '10 tháng',
        defaultChecked: true,
      },
      {
        type: 'three-month',
        price: '100.000đ',
        time: '1 tháng',
        saleOff: { price: '50.000đ', time: '1 tháng' },
      },
      { type: 'payeth', price: '500.000đ', time: '6 tháng' },
      { type: 'one-year', price: '800.000đ', time: '1 năm' },
    ]
    setPayOptions(payOptionsArr)
  }, [])

  return (
    <>
      <div className="card-innr">
        <div className="token-balance token-balance-with-icon">
          <div className="token-balance-icon">
            <img src={`${process.env.PUBLIC_URL}/images/customer/logo-light-sm.png`} alt="logo" />
          </div>
          <div className="token-balance-text">
            <h3 className="card-sub-title" style={{ fontSize: '16px', color: '#fff' }}>
              Các gói key
            </h3>
          </div>
        </div>
        <div className="token-balance token-balance-s2">
          <div className="token-currency-choose" style={{ color: '#495463' }}>
            <div className="row guttar-15px" style={{ display: 'flex' }}>
              {payOptions.map(payOption => {
                return (
                  <div className="col-3" key={payOption.type}>
                    <PayOption payOption={payOption} />
                  </div>
                )
              })}
            </div>
          </div>
        </div>
        <div style={{ float: 'right' }}>
          <a
            href="#"
            className="btn btn-warning"
            data-toggle="modal"
            data-target="#pay-online"
            style={{ display: 'flex', justifyContent: 'center' }}
          >
            <em className="pay-icon fas fa-dollar-sign" />
            Mua ngay
          </a>
        </div>
      </div>
      <PayOnlineModal payOnlineModal={{ price: '100.000', time: '1 tháng' }} />
    </>
  )
}

export default TokenStatistics
