/* eslint-disable no-underscore-dangle */

const MonitorUtils = {
  QUEUE: {
    MAIN: 'mainQueue',
    MONITOR: 'monitoringQueue',
    PERSISTENT_SUBSCRIPTIONS: 'persistentSubscriptions',
    STORAGE_READER: 'StorageReaderQueue',
    STORAGE_WRITER: 'StorageWriterQueue',
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
    result[MonitorUtils.QUEUE.STORAGE_READER] = {
      rate:
        monitor.data['es-queue-StorageReaderQueue #1-avgItemsPerSecond'] +
        monitor.data['es-queue-StorageReaderQueue #2-avgItemsPerSecond'] +
        monitor.data['es-queue-StorageReaderQueue #3-avgItemsPerSecond'] +
        monitor.data['es-queue-StorageReaderQueue #4-avgItemsPerSecond'],
      time:
        monitor.data['es-queue-StorageReaderQueue #1-avgProcessingTime'] +
        monitor.data['es-queue-StorageReaderQueue #2-avgProcessingTime'] +
        monitor.data['es-queue-StorageReaderQueue #3-avgProcessingTime'] +
        monitor.data['es-queue-StorageReaderQueue #4-avgProcessingTime'],
      date: monitor.createdDate,
    }
    result[MonitorUtils.QUEUE.STORAGE_WRITER] = {
      rate: monitor.data['es-queue-StorageWriterQueue-avgItemsPerSecond'],
      time: monitor.data['es-queue-StorageWriterQueue-avgProcessingTime'],
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
          date: item[key].date,
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
        date: item[key].date,
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
    if (text === MonitorUtils.QUEUE.STORAGE_READER) {
      return 'Storage reader queue'
    }
    if (text === MonitorUtils.QUEUE.STORAGE_WRITER) {
      return 'Storage writer queue'
    }
    return ''
  },
}

export default MonitorUtils
