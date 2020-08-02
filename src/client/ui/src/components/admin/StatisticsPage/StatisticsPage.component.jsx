/* eslint-disable radix */
/* eslint-disable no-underscore-dangle */
/* eslint-disable jsx-a11y/anchor-is-valid */
/* eslint-disable react/prop-types */
import React from 'react'
import { Divider, Tabs } from 'antd'
import './StatisticsPage.style.scss'
import StatisticsTokenType from './components/StatisticsTokenType/StatisticsTokenType.container'
import StatisticsUser from './components/StatisticsUser/StatisticsUser.container'
import TotalStatisticsUser from './components/TotalStatisticsUser/TotalStatisticsUser.container'
import TotalStatisticsTokenType from './components/TotalStatisticsTokenType/TotalStatisticsTokenType.container'

const { TabPane } = Tabs

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
    <div className="row admin-statistics-page">
      <div className="col-md-12">
        <div className="card" id="profile-main">
          <div className="card-header">
            <h3 className="card-title">
              <span>Thống kê</span>
            </h3>
          </div>
          <div className="card-content">
            <div role="tabpanel">
              <Tabs size="large">
                <TabPane tab="Thống kê tổng" key="1">
                  <div className="gaps-1x" />
                  <h4 className="card-title">
                    <span>Thống kê theo người dùng</span>
                  </h4>
                  <div className="gaps-1x" />
                  <TotalStatisticsUser chartOptions={twoXAxisOptions} />
                  <Divider />
                  <h4 className="card-title">
                    <span>Thống kê theo loại API key</span>
                  </h4>
                  <div className="gaps-1x" />
                  <TotalStatisticsTokenType chartOptions={twoXAxisOptions} />
                </TabPane>
                <TabPane tab="Thống kê chi tiết" key="2">
                  <div className="gaps-1x" />
                  <h4 className="card-title">
                    <span>Thống kê theo người dùng</span>
                  </h4>
                  <div className="gaps-1x" />
                  <StatisticsUser chartOptions={twoYAxisOptions} />
                  <Divider />
                  <h4 className="card-title">
                    <span>Thống kê theo loại API key</span>
                  </h4>
                  <div className="gaps-1x" />
                  <StatisticsTokenType chartOptions={twoYAxisOptions} />
                </TabPane>
              </Tabs>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

StatisticsPage.propTypes = {}

export default StatisticsPage
