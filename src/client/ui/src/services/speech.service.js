import { DEFAULT_ERR_MESSAGE } from 'utils/constant'
import { apiUrl } from './api-url'

export default class SpeechService {
  static callAsr = (file, fileUrl, token) => {
    const formData = new FormData()
    formData.append('voice', file)

    const api = `${apiUrl}/speech`

    let status = 400
    return fetch(api, {
      method: 'POST',
      body: JSON.stringify({ audioFileUrl: fileUrl }),
      headers: {
        ...formData.getHeaders(),
        Authorization: `Bearer ${token}`,
      },
    })
      .then(response => {
        status = response.status
        return response.text()
      })
      .then(result => {
        const resultObj = result ? JSON.parse(result) : {}
        if (status !== 201) {
          throw new Error(resultObj.message || DEFAULT_ERR_MESSAGE)
        }
        return resultObj
      })
      .catch(err => {
        console.debug(err.message)
        throw new Error(DEFAULT_ERR_MESSAGE)
      })
  }
}
