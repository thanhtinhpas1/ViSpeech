/* eslint-disable radix */
/* eslint-disable no-underscore-dangle */
/* eslint-disable jsx-a11y/anchor-is-valid */
/* eslint-disable react/prop-types */
import React from 'react'
import { Row, Col, Divider } from 'antd'
import './StatisticsPage.style.scss'
import StatisticsProject from './components/StatisticsProject/StatisticsProject.container'
import StatisticsToken from './components/StatisticsToken/StatisticsToken.container'
import StatisticsTokenType from './components/StatisticsTokenType/StatisticsTokenType.container'
import TotalStatisticsProject from './components/TotalStatisticsProject/TotalStatisticsProject.container'
import TotalStatisticsToken from './components/TotalStatisticsToken/TotalStatisticsToken.container'
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
    <div className="page-content statistics-page">
      <div className="container">
        <div className="card content-area">
          <div className="card-innr">
            <div className="card-head">
              <h4 className="card-title">Thống kê</h4>
            </div>
            <div className="gaps-1x" />
            <ul className="nav nav-tabs nav-tabs-line" role="tablist">
              <li className="nav-item">
                <a className="nav-link active" data-toggle="tab" href="#statistics-by-id-list">
                  Thống kê chi tiết
                </a>
              </li>
              <li className="nav-item">
                <a className="nav-link" data-toggle="tab" href="#user-total-statistics-list">
                  Thống kê tổng
                </a>
              </li>
            </ul>
            <div className="tab-content">
              <div className="tab-pane fade active show" id="statistics-by-id-list">
                <div className="gaps-1x" />
                <Row gutter={16}>
                  <Col>
                    <div className="card-head">
                      <h4 className="card-title">Thống kê theo dự án</h4>
                    </div>
                    <div className="gaps-1x" />
                    <StatisticsProject chartOptions={options} />
                  </Col>
                </Row>
                <Divider />
                <Row gutter={16}>
                  <Col>
                    <div className="card-head">
                      <h4 className="card-title">Thống kê theo token</h4>
                    </div>
                    <div className="gaps-1x" />
                    <StatisticsToken chartOptions={options} />
                  </Col>
                </Row>
                <Divider />
                <Row gutter={16}>
                  <Col>
                    <div className="card-head">
                      <h4 className="card-title">Thống kê theo loại token</h4>
                    </div>
                    <div className="gaps-1x" />
                    <StatisticsTokenType chartOptions={options} />
                  </Col>
                </Row>
              </div>
              <div className="tab-pane fade" id="user-total-statistics-list">
                <div className="gaps-1x" />
                <Row gutter={16}>
                  <Col>
                    <div className="card-head">
                      <h4 className="card-title">Thống kê theo dự án</h4>
                    </div>
                    <div className="gaps-1x" />
                    <TotalStatisticsProject chartOptions={options} />
                  </Col>
                </Row>
                <Divider />
                <Row gutter={16}>
                  <Col>
                    <div className="card-head">
                      <h4 className="card-title">Thống kê theo token</h4>
                    </div>
                    <div className="gaps-1x" />
                    <TotalStatisticsToken chartOptions={options} />
                  </Col>
                </Row>
                <Divider />
                <Row gutter={16}>
                  <Col>
                    <div className="card-head">
                      <h4 className="card-title">Thống kê theo loại token</h4>
                    </div>
                    <div className="gaps-1x" />
                    <TotalStatisticsTokenType chartOptions={options} />
                  </Col>
                </Row>
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
