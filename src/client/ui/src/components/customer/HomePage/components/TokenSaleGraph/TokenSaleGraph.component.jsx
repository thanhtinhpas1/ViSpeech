/* eslint-disable jsx-a11y/anchor-is-valid */
/* eslint-disable no-script-url */
/* eslint-disable jsx-a11y/anchor-is-valid */
/* eslint-disable no-underscore-dangle */
/* eslint-disable react/button-has-type */
/* eslint-disable jsx-a11y/label-has-associated-control */
import React, { useEffect } from 'react'
import moment from 'moment'

const TokenSaleGraph = ({ userOrderListObj }) => {
  useEffect(() => {
    const labels = userOrderListObj.userOrderList.data.map(order => moment(order.createdDate).format('YYYY-MM-DD'))
    const data = userOrderListObj.userOrderList.data.map(order => {
      const tokenType = order.tokenType ? order.tokenType : null
      return tokenType ? tokenType.price : 0
    })
    const chart = document.getElementById('tknSale').getContext('2d')
    // eslint-disable-next-line no-new
    new window.Chart(chart, {
      type: 'line',
      data: {
        labels,
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
            data,
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
              return `Giá ${t.datasets[0].data[e.index]}$`
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
  }, [userOrderListObj])

  return (
    <div className="card-innr">
      <div className="card-head has-aside">
        <h4 className="card-title">Biểu đồ giao dịch</h4>
      </div>
      <div className="chart-tokensale">
        <canvas id="tknSale" />
      </div>
    </div>
  )
}

export default TokenSaleGraph
