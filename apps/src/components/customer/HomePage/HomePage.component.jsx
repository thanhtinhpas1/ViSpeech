/* eslint-disable react/button-has-type */
/* eslint-disable jsx-a11y/label-has-associated-control */
import React from 'react'
import TokenStatistics from './components/TokenStatistics/TokenStatistics.container'
import TokenTransaction from './components/TokenTransaction/TokenTransaction.container'
import TokenCalculator from './components/TokenCalculator/TokenCalculator.component'
import TokenSaleGraph from './components/TokenSaleGraph/TokenSaleGraph.component'

const Home = ({ history }) => {
  return (
    <div className="page-content">
      <div className="container">
        <div className="row">
          <div className="col-lg-12">
            <div className="token-statistics card card-token height-auto">
              <TokenStatistics history={history} />
            </div>
          </div>
          <div className="col-xl-8 col-lg-7">
            <div className="token-transaction card card-full-height">
              <TokenTransaction />
            </div>
          </div>
          <div className="col-xl-4 col-lg-5">
            <div className="token-calculator card card-full-height">
              <TokenCalculator keyQuantity="15" />
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
