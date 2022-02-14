const express = require('express');
const app = express();

app.get('/health', function (req, res) {
  res.send('OK');
})

app.post('/save', function (req, res) {
  
});

app.get('/save', function (req, res) {
  res.send('save');
});

app.listen(3000, () => {
  console.log('App listening on port 3000');
});