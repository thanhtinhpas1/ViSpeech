import * as moment from 'moment'

const MonitorUtils = {
  mapMonitorDataFunc: monitor => {
    return {
      mainQueue: {
        rate: monitor.data['es-queue-MainQueue-avgItemsPerSecond'],
        time: monitor.data['es-queue-MainQueue-avgProcessingTime'],
        date: monitor.createdDate,
      },
      monitoringQueue: {
        rate: monitor.data['es-queue-MonitoringQueue-avgItemsPerSecond'],
        time: monitor.data['es-queue-MonitoringQueue-avgProcessingTime'],
        date: monitor.createdDate,
      },
      persistentSubscriptions: {
        rate: monitor.data['es-queue-PersistentSubscriptions-avgItemsPerSecond'],
        time: monitor.data['es-queue-PersistentSubscriptions-avgProcessingTime'],
        date: monitor.createdDate,
      },
    }
  },
  convertArrToChartData: data => {
    const result = []
    data.forEach(item => {
      const keys = Object.keys(item)
      keys.forEach(key => {
        result.push({
          time: item[key].time || 0,
          rate: item[key].rate || 0,
          date: moment(item[key].date).format('DD-MM-YYYY HH:mm:ss'),
          type: key,
        })
      })
    })
    return result
  },
  convertToChartData: item => {
    const result = []
    const keys = Object.keys(item)
    keys.forEach(key => {
      result.push({
        time: item[key].time || 0,
        rate: item[key].rate || 0,
        date: moment(item[key].date).format('DD-MM-YYYY HH:mm:ss'),
        type: key,
      })
    })
    return result
  },
}

export default MonitorUtils
