/* eslint-disable jsx-a11y/anchor-is-valid */
/* eslint-disable jsx-a11y/label-has-associated-control */
import React, { useState, useEffect } from 'react'
import PayItem from './components/PayItem/PayItem.component'
import PayReviewModal from './components/PayReviewModal/PayReviewModal.component'

const PayOnlineModal = ({ payOnlineModal }) => {
  const [payList, setPayList] = useState([])
  const [payReview, setPayReview] = useState({})

  useEffect(() => {
    const payListArr = [
      { type: 'pay-coin', imgSrc: 'pay-a.png' },
      { type: 'pay-coinpay', imgSrc: 'pay-b.png' },
      { type: 'pay-paypal', imgSrc: 'pay-c.png' },
    ]
    const payReviewObj = {
      time: '1 tháng',
      token:
        'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJWaVNwZWVjaCIsInVzZXJJbmZvIjp7IklEIjo3LCJVU0VSTkFNRSI6InRrbGluaCJ9LCJpYXQiOjE1NzM4NzM2MjQxMDh9.YsrL08aZbZbZOKiCE6-SlwGjbpQJiOLxctSatzC5F0ur8',
    }
    setPayList(payListArr)
    setPayReview(payReviewObj)
  }, [])

  return (
    <>
      <div className="modal fade" id="pay-online" tabIndex={-1}>
        <div className="modal-dialog modal-dialog-md modal-dialog-centered">
          <div className="modal-content pb-0">
            <div className="popup-body">
              <h4 className="popup-title">Thanh toán mua key</h4>
              <p className="lead" style={{ color: '#495463' }}>
                Mua key và sử dụng trong vòng <strong>{payOnlineModal.time}</strong> với số tiền{' '}
                <strong>{payOnlineModal.price} VNĐ</strong>.
              </p>
              <h5 className="mgt-1-5x font-mid">Chọn phương thức thanh toán</h5>
              <ul className="pay-list guttar-20px">
                {payList.map(payItem => {
                  return <PayItem payItem={payItem} key={payItem.type} />
                })}
              </ul>
              <div className="pdb-2-5x pdt-1-5x">
                <input
                  type="checkbox"
                  className="input-checkbox input-checkbox-md"
                  id="agree-term-3"
                />
                <label htmlFor="agree-term-3">
                  Tôi đồng ý với
                  <strong>điều khoản giao dịch mua bán key</strong> của Softia.
                </label>
              </div>
              <ul className="d-flex flex-wrap align-items-center guttar-30px">
                <li>
                  <a
                    href="#"
                    data-dismiss="modal"
                    data-toggle="modal"
                    data-target="#pay-review"
                    className="btn btn-primary"
                  >
                    Thanh toán <em className="ti ti-arrow-right mgl-2x" />
                  </a>
                </li>
              </ul>
              <div className="gaps-2x" />
              <div className="gaps-1x d-none d-sm-block" />
              <div className="note note-plane note-light mgb-1x">
                <em className="fas fa-info-circle" />
                <p className="text-light">
                  Sau khi giao dịch thành công, trang web sẽ hiển thị key cho bạn.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
      <PayReviewModal payReviewModal={payReview} />
    </>
  )
}

export default PayOnlineModal
