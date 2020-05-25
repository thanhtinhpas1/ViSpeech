import * as io from 'socket.io-client'
import SocketUtils from 'utils/socket.util'
import { socketUrl } from './api-url'

const { invokeCheckSubject, getSubjectName } = SocketUtils

export default class SocketService {
  static socket = io.connect(socketUrl)

  constructor() {
    SocketService.socket.on('CONNECTED', msg => {
      console.log(msg)
    })
    SocketService.socket.on('DISCONNECTED', msg => {
      console.warn(msg)
    })
  }

  static socketEmitEvent = event => {
    SocketService.socket.emit(event)
  }

  // Consume on Check Attendance updated
  static socketOnListeningEvent = event => {
    const subjectName = getSubjectName(event)
    SocketService.socket.on(event, message => {
      const value = String.fromCharCode.apply(null, new Uint8Array(message))
      invokeCheckSubject[subjectName].next(JSON.parse(value))
    })
  }
}

// eslint-disable-next-line no-unused-vars
const SocketServiceInstance = new SocketService()
