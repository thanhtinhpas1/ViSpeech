/* eslint-disable radix */
/* eslint-disable no-underscore-dangle */
/* eslint-disable jsx-a11y/anchor-is-valid */
/* eslint-disable react/prop-types */
import React from 'react'
import { Row, Col, Divider } from 'antd'
import './StatisticsPage.style.scss'
// import StatisticsProject from './components/StatisticsProject/StatisticsProject.container'
// import StatisticsToken from './components/StatisticsToken/StatisticsToken.container'
// import StatisticsTokenType from './components/StatisticsTokenType/StatisticsTokenType.container'
// import TotalStatisticsProject from './components/TotalStatisticsProject/TotalStatisticsProject.container'
import TotalStatisticsUser from './components/TotalStatisticsUser/TotalStatisticsUser.container'
import TotalStatisticsTokenType from './components/TotalStatisticsTokenType/TotalStatisticsTokenType.container'

const StatisticsPage = () => {
  const options = {
    scales: {
      yAxes: [
        {
          ticks: {
            beginAtZero: true,
          },
        },
      ],
      xAxes: [
        {
          ticks: {
            beginAtZero: true,
          },
        },
      ],
    },
    maintainAspectRatio: false,
    responsive: true,
  }

  return (
    <div className="row statistics-page">
      <div className="col-md-12">
        <div className="card" id="profile-main">
          <div className="card-header">
            <h3 className="card-title">
              <span>Thống kê</span>
            </h3>
          </div>
          <div className="card-content">
            <div role="tabpanel">
              <ul className="nav nav-pills">
                <li className="active">
                  <a href="#total-statistics" aria-controls="total-statistics" role="tab" data-toggle="tab">
                    Thống kê tổng
                  </a>
                </li>
                <li>
                  <a href="#statistics-by-id" aria-controls="statistics-by-id" role="tab" data-toggle="tab">
                    Thống kê chi tiết
                  </a>
                </li>
              </ul>
              <div className="tab-content">
                <div role="tabpanel" className="tab-pane active" id="total-statistics">
                  <Row gutter={16}>
                    <Col>
                      <h4 className="card-title">
                        <span>Thống kê theo người dùng</span>
                      </h4>
                      <TotalStatisticsUser chartOptions={options} />
                    </Col>
                  </Row>
                  <Divider />
                  <Row gutter={16}>
                    <Col>
                      <h4 className="card-title">
                        <span>Thống kê theo loại token</span>
                      </h4>
                      <TotalStatisticsTokenType chartOptions={options} />
                    </Col>
                  </Row>
                </div>
                <div role="tabpanel" className="tab-pane" id="statistics-by-id" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

StatisticsPage.propTypes = {}

export default StatisticsPage
