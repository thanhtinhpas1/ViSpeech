import axios from 'axios'
// import { DEFAULT_ERR_MESSAGE } from 'utils/constant'
import {apiUrl} from './api-url'

export default class SpeechService {
  static callAsr = (file, fileUrl, token) => {
    const formData = new FormData()
    formData.append('voice', file)
    formData.append('audioFileUrl', fileUrl)
    const api = `${apiUrl}/speech`

    return axios({
      method: 'post',
      url: api,
      data: formData,
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'multipart/form-data;',
      },
    })
      .then(response => {
        return response.data || null
      })
      .catch(error => {
        console.log(error.message)
        throw new Error(error.message)
      })
  }
}
