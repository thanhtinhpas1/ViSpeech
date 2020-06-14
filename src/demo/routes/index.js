const express = require('express');
const router = express.Router();
const ViSpeech = require('asr-vietspeech');
const fs = require('fs');
const formidable = require('formidable')

// The audio file's encoding, sample rate in hertz, timeout, maxSize, token
const config = {
    token: process.env.API_KEY, // set api key get from asr system
    encoding: 'LINEAR16', // set encoding
    sampleRateHertz: 16000, // set rate Hz
    timeout: 10000, // 10 seconds
    maxSize: 51200 // 50 Mb
};
const asrViSpeech = new ViSpeech(config);

/* GET home page. */
router.get('/', function (req, res, next) {
    res.render('index', {title: 'Asr VietSpeech'});
});

router.post('/asr', (req, res, next) => {
    const form = new formidable.IncomingForm();
    form.parse(req, (err, fields, files) => {
        if (err) {
            console.warn(err.message)
            res.status(500);
        }
        const oldPath = files.voice.path;
        const file = fs.createReadStream(oldPath);
        asrViSpeech.call(file).then(result => {
            console.info('Call ASR success');
            res.send(result);
        }).catch(err => {
            console.warn(err.message)
            res.status(401);
        })
    })
})

module.exports = router;
