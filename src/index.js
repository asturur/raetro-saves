const express = require('express');
const fileUpload = require('express-fileupload');

const app = express();
const { writeFile, readFileList } = require('./storage');

app.get('/health', function (req, res) {
  res.send('OK');
})

app.post('/save', fileUpload(), function (req, res) {
  writeFile(req, res).then((data) => {
    // inserire chiamate al DB.
    res.status(200).json(data);
  });
});

app.get('/saves', function (req, res) {
  readFileList(req, res).then((data) => {
    res.status(200).json(data);
  });
});

app.get('/save', function (req, res) {
  res.send('save');
});

app.listen(3000, () => {
  console.log('App listening on port 3000');
});