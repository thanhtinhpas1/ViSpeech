/* eslint-disable no-underscore-dangle */
/* eslint-disable react/button-has-type */
/* eslint-disable jsx-a11y/label-has-associated-control */
import React, { useEffect } from 'react'
import TokenStatistics from './components/TokenStatistics/TokenStatistics.container'
import TokenTransaction from './components/TokenTransaction/TokenTransaction.container'
import TokenCalculator from './components/TokenCalculator/TokenCalculator.component'
import TokenSaleGraph from './components/TokenSaleGraph/TokenSaleGraph.component'

const Home = ({
  history,
  currentUser,
  orderListObj,
  getFreeTokenObj,
  getFreeToken,
  getOrderList,
}) => {
  useEffect(() => {
    if (currentUser._id) {
      getFreeToken(currentUser._id)
      getOrderList({ userId: currentUser._id })
    }
  }, [currentUser._id, getFreeToken, getOrderList])

  return (
    <div className="page-content">
      <div className="container">
        <div className="row">
          <div className="col-lg-12">
            <div className="token-statistics card card-token height-auto">
              <TokenStatistics history={history} />
            </div>
          </div>
          <div className="col-lg-12">
            <div className="token-statistics card card-token height-auto">
              <div className="card-innr">
                <div className="card-head has-aside">
                  <h4
                    className="card-title"
                    style={{ fontSize: '16px', color: '#fff', textTransform: 'uppercase' }}
                  >
                    Token miễn phí
                  </h4>
                  <div>Miễn phí 10 phút sử dụng</div>
                </div>
                <div className="card-opt">
                  <span className="lead tnx-id">
                    {getFreeTokenObj.isLoading && getFreeTokenObj.isSuccess == null && (
                      <div>Đang tải...</div>
                    )}
                    {getFreeTokenObj.isLoading === false && getFreeTokenObj.isSuccess === false && (
                      <div>Lấy token miễn phí thất bại</div>
                    )}
                    {getFreeTokenObj.freeToken && (
                      <div className="copy-wrap w-100">
                        <span className="copy-feedback" />
                        <em className="fas fa-key" />
                        <input
                          type="text"
                          className="copy-address"
                          defaultValue={getFreeTokenObj.freeToken.value}
                          disabled
                          style={{ fontSize: '15px' }}
                        />
                        <button
                          className="copy-trigger copy-clipboard"
                          data-clipboard-text={getFreeTokenObj.freeToken.value}
                        >
                          <em className="ti ti-files" />
                        </button>
                      </div>
                    )}
                  </span>
                </div>
              </div>
            </div>
          </div>
          <div className="col-xl-8 col-lg-7">
            <div className="token-transaction card card-full-height">
              <TokenTransaction />
            </div>
          </div>
          <div className="col-xl-4 col-lg-5">
            <div className="token-calculator card card-full-height">
              <TokenCalculator keyQuantity={orderListObj.orderList.length} />
            </div>
          </div>
        </div>
        <div className="row">
          <div className="col-xl-12 col-lg-12">
            <div className="token-sale-graph card card-full-height">
              <TokenSaleGraph />
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Home
