
module.exports = {
    proxy: {
        host: `${process.env.ASR_URL}` || 'http://asr.vietspeech.com', // TODO: internal network
        port: 7070,
        basePath: '/v1'
    },
}