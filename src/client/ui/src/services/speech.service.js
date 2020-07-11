import axios from 'axios'

export default class SpeechService {
  static callAsr = (file, fileUrl, token) => {
    const formData = new FormData()
    formData.append('voice', file)
    formData.append('audioFileUrl', fileUrl)
    const api = `http://asr.vietspeech.com:7070/v1/speech`

    return axios.post(api, formData, {
      headers: {
        Authorization: `Bearer ${ token }`,
        ...formData.headers
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
