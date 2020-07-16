/* eslint-disable no-shadow */
/* eslint-disable react/jsx-props-no-spreading */
import React, { useState, useEffect, useRef } from 'react'
import { LineChart } from 'bizcharts'
import SocketService from 'services/socket.service'
import SocketUtils from 'utils/socket.util'
import { DEFAULT_PAGINATION, SORT_ORDER } from 'utils/constant'
import MonitorUtils from 'utils/monitor.util'

const { KAFKA_TOPIC, invokeCheckSubject } = SocketUtils
const { MONITOR_BEAT_SUCCESS_EVENT, MONITOR_BEAR_FAILED_EVENT } = KAFKA_TOPIC

const MonitorBeatChart = ({ getMonitorListObj, getMonitorList }) => {
  const [data, setData] = useState([])
  const isMounted = useRef(true)

  useEffect(() => {
    SocketService.socketOnListeningEvent(MONITOR_BEAT_SUCCESS_EVENT)
    SocketService.socketOnListeningEvent(MONITOR_BEAR_FAILED_EVENT)
  }, [])

  useEffect(() => {
    getMonitorList({ pagination: DEFAULT_PAGINATION.SIZE_10, sortField: 'createdDate', sortOrder: SORT_ORDER.DESC })
  }, [getMonitorList])

  useEffect(() => {
    if (getMonitorListObj.isLoading === false && getMonitorListObj.isSuccess === true) {
      const chartData = MonitorUtils.convertArrToChartData(getMonitorListObj.monitorList.data)
      setData(chartData)
    }
  }, [getMonitorListObj])

  useEffect(() => {
    invokeCheckSubject.MonitorBeat.subscribe(event => {
      if (isMounted.current && event.error == null) {
        const mappedData = MonitorUtils.mapMonitorDataFunc(event.data)
        const convertedData = MonitorUtils.convertToChartData(mappedData)
        setData(p => {
          const data = p.slice(3)
          return [...data, ...convertedData]
        })
      }
    })
    return () => {
      isMounted.current = false
    }
  }, [])

  return (
    <div className="row">
      <div className="col-md-12">
        <div className="card">
          <div className="card-header">
            <h4 className="card-title">Biểu đồ</h4>
          </div>
          <div className="card-content">
            <LineChart
              responsive
              forceFit
              label={{ visible: true, type: 'line' }}
              legend={{ position: 'top-center' }}
              tooltip={{
                shared: true,
                showCrosshairs: true,
                crosshairs: { type: 'x' },
                formatter: (xField, yField, seriesField) => {
                  if (seriesField === 'mainQueue') {
                    return { name: 'Main queue', value: `${yField} items/s` }
                  }
                  if (seriesField === 'monitoringQueue') {
                    return { name: 'Monitor queue', value: `${yField} items/s` }
                  }
                  return { name: 'Persistent subscriptions', value: `${yField} items/s` }
                },
              }}
              data={data}
              title={{
                visible: false,
              }}
              description={{
                visible: false,
              }}
              smooth
              point={{
                shape: 'hollow-circle',
                visible: true,
                style: () => {},
              }}
              xField="date"
              yField="rate"
              seriesField="type"
              xAxis={{
                label: { autoHide: true, autoRotate: false },
              }}
              yAxis={{
                label: { autoHide: false, formatter: v => `${v} items/s` },
                line: {
                  visible: true,
                },
              }}
            />
          </div>
        </div>
      </div>
    </div>
  )
}
export default MonitorBeatChart
