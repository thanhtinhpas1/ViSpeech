/* eslint-disable radix */
/* eslint-disable no-underscore-dangle */
/* eslint-disable jsx-a11y/anchor-is-valid */
/* eslint-disable react/prop-types */
import React from 'react'
import { Divider } from 'antd'
import './StatisticsPage.style.scss'
import StatisticsProject from './components/StatisticsProject/StatisticsProject.container'
import StatisticsToken from './components/StatisticsToken/StatisticsToken.container'
import StatisticsTokenType from './components/StatisticsTokenType/StatisticsTokenType.container'
import StatisticsForAssigners from './components/StatisticsForAssigners/StatisticsForAssigners.container'
import TotalStatisticsProject from './components/TotalStatisticsProject/TotalStatisticsProject.container'
import TotalStatisticsToken from './components/TotalStatisticsToken/TotalStatisticsToken.container'
import TotalStatisticsTokenType from './components/TotalStatisticsTokenType/TotalStatisticsTokenType.container'
import ReportUtils from '../../../utils/report.util'

const StatisticsPage = () => {
  const twoYAxisOptions = {
    responsive: true,
    tooltips: {
      mode: 'label',
    },
    elements: {
      line: {
        fill: false,
      },
    },
    scales: {
      xAxes: [
        {
          display: true,
          gridLines: {
            display: false,
          },
          ticks: {
            beginAtZero: true,
          },
        },
      ],
      yAxes: [
        {
          type: 'linear',
          display: true,
          position: 'left',
          id: 'y-axis-1',
          gridLines: {
            display: true,
          },
          ticks: {
            beginAtZero: true,
          },
        },
        {
          type: 'linear',
          display: true,
          position: 'right',
          id: 'y-axis-2',
          gridLines: {
            display: false,
          },
          ticks: {
            beginAtZero: true,
          },
        },
      ],
    },
    maintainAspectRatio: false,
  }

  const twoXAxisOptions = {
    responsive: true,
    tooltips: {
      mode: 'label',
    },
    elements: {
      line: {
        fill: false,
      },
    },
    scales: {
      yAxes: [
        {
          display: true,
          gridLines: {
            display: false,
          },
          ticks: {
            beginAtZero: true,
          },
        },
      ],
      xAxes: [
        {
          type: 'linear',
          display: true,
          position: 'bottom',
          id: 'x-axis-1',
          gridLines: {
            display: true,
          },
          ticks: {
            beginAtZero: true,
          },
        },
        {
          type: 'linear',
          display: true,
          position: 'top',
          id: 'x-axis-2',
          gridLines: {
            display: true,
          },
          ticks: {
            beginAtZero: true,
          },
        },
      ],
    },
    maintainAspectRatio: false,
  }

  return (
    <div className="page-content customer-statistics-page">
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
              <li className="nav-item">
                <a className="nav-link" data-toggle="tab" href="#statistics-project-management">
                  Thống kê quản lý dự án
                </a>
              </li>
            </ul>
            <div className="tab-content">
              <div className="tab-pane fade active show" id="statistics-by-id-list">
                <div className="gaps-1x" />
                <div className="card-head">
                  <h4 className="card-title">Thống kê theo dự án</h4>
                </div>
                <div className="gaps-1x" />
                <StatisticsProject chartOptions={twoYAxisOptions} />
                <Divider />
                <div className="card-head">
                  <h4 className="card-title">Thống kê theo API key</h4>
                </div>
                <div className="gaps-1x" />
                <StatisticsToken chartOptions={twoYAxisOptions} />
                <Divider />
                <div className="card-head">
                  <h4 className="card-title">Thống kê theo loại API key</h4>
                </div>
                <div className="gaps-1x" />
                <StatisticsTokenType chartOptions={twoYAxisOptions} />
              </div>
              <div className="tab-pane fade" id="user-total-statistics-list">
                <div className="gaps-1x" />
                <div className="card-head">
                  <h4 className="card-title">Thống kê theo dự án</h4>
                </div>
                <div className="gaps-1x" />
                <TotalStatisticsProject chartOptions={twoXAxisOptions} />
                <Divider />
                <div className="card-head">
                  <h4 className="card-title">Thống kê theo API key</h4>
                </div>
                <div className="gaps-1x" />
                <TotalStatisticsToken chartOptions={twoXAxisOptions} />
                <Divider />
                <div className="card-head">
                  <h4 className="card-title">Thống kê theo loại API key</h4>
                </div>
                <div className="gaps-1x" />
                <TotalStatisticsTokenType chartOptions={twoXAxisOptions} />
              </div>
              <div className="tab-pane fade" id="statistics-project-management">
                <div className="gaps-1x" />
                <div className="card-head">
                  <h4 className="card-title">Thống kê lịch sử sử dụng của thành viên</h4>
                </div>
                <div className="gaps-1x" />
                <StatisticsForAssigners
                  chartOptions={twoYAxisOptions}
                  statisticsType={ReportUtils.STATISTICS_TYPE.SHARED_PROJECT}
                />
                <Divider />
                <div className="card-head">
                  <h4 className="card-title">Thống kê lịch sử sử dụng theo API key</h4>
                </div>
                <div className="gaps-1x" />
                <StatisticsForAssigners
                  chartOptions={twoYAxisOptions}
                  statisticsType={ReportUtils.STATISTICS_TYPE.SHARED_TOKEN}
                />
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
