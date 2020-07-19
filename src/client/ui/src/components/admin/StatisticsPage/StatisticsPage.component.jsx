/* eslint-disable radix */
/* eslint-disable no-underscore-dangle */
/* eslint-disable jsx-a11y/anchor-is-valid */
/* eslint-disable react/prop-types */
import React from 'react'
import { Divider } from 'antd'
import './StatisticsPage.style.scss'
import StatisticsTokenType from './components/StatisticsTokenType/StatisticsTokenType.container'
import StatisticsUser from './components/StatisticsUser/StatisticsUser.container'
import TotalStatisticsUser from './components/TotalStatisticsUser/TotalStatisticsUser.container'
import TotalStatisticsTokenType from './components/TotalStatisticsTokenType/TotalStatisticsTokenType.container'

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
                  <div className="gaps-1x"/>
                  <h4 className="card-title">
                    <span>Thống kê theo người dùng</span>
                  </h4>
                  <div className="gaps-1x"/>
                  <TotalStatisticsUser chartOptions={ twoXAxisOptions }/>
                  <Divider/>
                  <h4 className="card-title">
                    <span>Thống kê theo loại API key</span>
                  </h4>
                  <div className="gaps-1x"/>
                  <TotalStatisticsTokenType chartOptions={ twoXAxisOptions }/>
                </div>
                <div role="tabpanel" className="tab-pane" id="statistics-by-id">
                  <div className="gaps-1x"/>
                  <h4 className="card-title">
                    <span>Thống kê theo người dùng</span>
                  </h4>
                  <div className="gaps-1x"/>
                  <StatisticsUser chartOptions={ twoYAxisOptions }/>
                  <Divider/>
                  <h4 className="card-title">
                    <span>Thống kê theo loại API key</span>
                  </h4>
                  <div className="gaps-1x"/>
                  <StatisticsTokenType chartOptions={ twoYAxisOptions }/>
                </div>
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
