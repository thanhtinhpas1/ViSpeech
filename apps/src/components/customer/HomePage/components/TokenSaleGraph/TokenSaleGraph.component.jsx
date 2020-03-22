/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useEffect, useState } from 'react'

const TokenSaleGraph = () => {
  const [dropdownList, setDropdownList] = useState([])

  useEffect(() => {
    const dropdownListArr = ['30 ngày', '1 năm']
    setDropdownList(dropdownListArr)

    const chart = document.getElementById('tknSale').getContext('2d')
    new window.Chart(chart, {
      type: 'line',
      data: {
        labels: ['01/10', '02/10', '03/10', '04/10', '05/10', '06/10', '07/10'],
        datasets: [
          {
            label: '',
            lineTension: 0.4,
            backgroundColor: 'transparent',
            borderColor: '#2c80ff',
            pointBorderColor: '#2c80ff',
            pointBackgroundColor: '#fff',
            pointBorderWidth: 2,
            pointHoverBackgroundColor: '#fff',
            pointHoverBorderColor: '#2c80ff',
            pointHoverBorderWidth: 2,
            pointRadius: 6,
            pointHitRadius: 6,
            data: [110, 80, 125, 55, 95, 75, 90],
          },
        ],
      },
      options: {
        legend: { display: !1 },
        maintainAspectRatio: !1,
        tooltips: {
          callbacks: {
            title(e, t) {
              return `Ngày: ${t.labels[e[0].index]}`
            },
            label(e, t) {
              return `${t.datasets[0].data[e.index]} Tokens`
            },
          },
          backgroundColor: '#eff6ff',
          titleFontSize: 13,
          titleFontColor: '#6783b8',
          titleMarginBottom: 10,
          bodyFontColor: '#9eaecf',
          bodyFontSize: 14,
          bodySpacing: 20,
          yPadding: 15,
          xPadding: 15,
          footerMarginTop: 5,
          displayColors: !1,
        },
        scales: {
          yAxes: [
            {
              ticks: { beginAtZero: !0, fontSize: 12, fontColor: '#9eaecf', maxTicksLimit: 5 },
              gridLines: {
                color: '#e5ecf8',
                tickMarkLength: 20,
                zeroLineColor: '#e5ecf8',
              },
            },
          ],
          xAxes: [
            {
              ticks: { fontSize: 12, fontColor: '#9eaecf', source: 'auto' },
              gridLines: {
                color: 'transparent',
                tickMarkLength: 20,
                zeroLineColor: '#e5ecf8',
              },
            },
          ],
        },
      }, 
    })
  }, [])

  return (
    <div className="card-innr">
      <div className="card-head has-aside">
        <h4 className="card-title">Biểu đồ truy cập dịch vụ</h4>
        <div className="card-opt">
          <a href="#" className="link ucap link-light toggle-tigger toggle-caret">
            7 ngày
          </a>
          <div className="toggle-class dropdown-content">
            <ul className="dropdown-list">
              {dropdownList.map(item => {
                return (
                  <li key={item}>
                    <a href="#">{item}</a>
                  </li>
                )
              })}
            </ul>
          </div>
        </div>
      </div>
      <div className="chart-tokensale">
        <canvas id="tknSale" />
      </div>
    </div>
  )
}

export default TokenSaleGraph
