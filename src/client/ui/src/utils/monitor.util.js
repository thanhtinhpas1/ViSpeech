import * as moment from 'moment'

const MonitorUtils = {
  QUEUE: {
    MAIN: 'mainQueue',
    MONITOR: 'monitoringQueue',
    PERSISTENT_SUBSCRIPTIONS: 'persistentSubscriptions',
  },
  mapMonitorDataFunc: monitor => {
    const result = {}
    result[MonitorUtils.QUEUE.MAIN] = {
      rate: monitor.data['es-queue-MainQueue-avgItemsPerSecond'],
      time: monitor.data['es-queue-MainQueue-avgProcessingTime'],
      date: monitor.createdDate,
    }
    result[MonitorUtils.QUEUE.MONITOR] = {
      rate: monitor.data['es-queue-MonitoringQueue-avgItemsPerSecond'],
      time: monitor.data['es-queue-MonitoringQueue-avgProcessingTime'],
      date: monitor.createdDate,
    }
    result[MonitorUtils.QUEUE.PERSISTENT_SUBSCRIPTIONS] = {
      rate: monitor.data['es-queue-PersistentSubscriptions-avgItemsPerSecond'],
      time: monitor.data['es-queue-PersistentSubscriptions-avgProcessingTime'],
      date: monitor.createdDate,
    }
    return result
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
  formatTextFunc: text => {
    if (text === MonitorUtils.QUEUE.MAIN) {
      return 'Main queue'
    }
    if (text === MonitorUtils.QUEUE.MONITOR) {
      return 'Monitor queue'
    }
    return 'Persistent subscriptions'
  },
}

export default MonitorUtils
