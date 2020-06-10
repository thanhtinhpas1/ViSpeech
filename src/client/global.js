
module.exports = {
    proxy: {
        host: `${process.env.API_URL}` || 'http://asr.vietspeech.com', // TODO: internal network
        port: 7070,
        basePath: '/v1'
    },
}