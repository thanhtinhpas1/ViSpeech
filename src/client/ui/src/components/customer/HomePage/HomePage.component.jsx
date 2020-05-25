/* eslint-disable no-underscore-dangle */

import React, { useEffect } from 'react'
import LoadingIcon from 'components/common/LoadingIcon/LoadingIcon.component'
import TokenStatistics from './components/TokenStatistics/TokenStatistics.container'
import TokenTransaction from './components/TokenTransaction/TokenTransaction.container'
import TokenCalculator from './components/TokenCalculator/TokenCalculator.component'
import TokenSaleGraph from './components/TokenSaleGraph/TokenSaleGraph.component'

const Home = ({ currentUser, getUserOrderListObj, getFreeTokenObj, getFreeToken, getUserOrderList }) => {
  useEffect(() => {
    if (currentUser._id) {
      getFreeToken(currentUser._id)
      getUserOrderList({ userId: currentUser._id })
    }
  }, [currentUser._id, getFreeToken, getUserOrderList])

  return (
    <div className="page-content">
      <div className="container">
        <div className="row">
          <div className="col-lg-12">
            <div className="token-statistics card card-token height-auto">
              <TokenStatistics />
            </div>
          </div>
          <div className="col-lg-12">
            <div className="token-statistics card card-token height-auto">
              <div className="card-innr">
                <div className="card-head has-aside">
                  <h4 className="card-title" style={{ fontSize: '16px', color: '#fff', textTransform: 'uppercase' }}>
                    Token miễn phí
                  </h4>
                  <div>Miễn phí 10 phút sử dụng</div>
                </div>
                <div className="card-opt">
                  <span className="lead tnx-id">
                    {getFreeTokenObj.isLoading && getFreeTokenObj.isSuccess == null && <LoadingIcon />}
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
                          type="button"
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
              <TokenTransaction userOrderListObj={getUserOrderListObj} />
            </div>
          </div>
          <div className="col-xl-4 col-lg-5">
            <div className="token-calculator card card-full-height">
              <TokenCalculator keyQuantity={getUserOrderListObj.userOrderList.data.length} />
            </div>
          </div>
        </div>
        <div className="row">
          <div className="col-xl-12 col-lg-12">
            <div className="token-sale-graph card card-full-height">
              <TokenSaleGraph userOrderListObj={getUserOrderListObj} />
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Home
