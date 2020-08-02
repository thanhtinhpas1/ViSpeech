import axios from 'axios'

export default class SpeechService {
  static callAsr = (file, fileUrl, token, assigneeId) => {
    const formData = new FormData()
    formData.append('voice', file)
    formData.append('audioFileUrl', fileUrl)
    if (assigneeId) {
      formData.append('assigneeId', assigneeId)
    }
    const api = `https://asr.vietspeech.com/speech`

    return axios
      .post(api, formData, {
        headers: {
          Authorization: `Bearer ${token}`,
          ...formData.headers,
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
