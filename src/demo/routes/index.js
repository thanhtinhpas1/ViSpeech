var express = require('express');
var router = express.Router();
var formidable = require('formidable');

const newPath = "../public/audios/"
const fs = require('fs')
const http = require('http')
const https = require('https')

// const options = {
//   host: 'http://127.0.0.1',
//   port: 5000,
//   path: '/',
//   method: 'POST',
//   headers: {
//     'Content-Type': 'multipart/form-data',
//     'Accept-Encoding': 'gzip, deflate',
//     'Connection': 'keep-alive',
//     'cache-control': 'no-cache'
//   }
// };

// // GET FILE UPLOAD RECORD OF CLIENT
// router.post('file', (req, res) => {
//   var form = new formidable.IncomingForm();
//   form.parse(req, function (err, fields, files) {
//     var oldpath = files.filetoupload.path
//     var date = new Date().getMilliseconds()
//     var fullPath = newPath + date + '/' + files.filetoupload.name;
//     fs.rename(oldpath, fullPath).then(value => {
//       options.formData = fs.createReadStream(fullPath)
//       http.request(options, (res) => {
//         if (res) {
//           console.log(res)
//           res.json(res.text)
//         }
//       })
//     }).catch(err => {

//     })
//   });
// })

/* GET home page. */
router.get('/', function (req, res, next) {
    res.render('index', {title: 'Express'});
});

module.exports = router;
