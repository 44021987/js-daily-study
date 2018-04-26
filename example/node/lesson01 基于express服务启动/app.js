var express = require('express');
var app = express();

app.get('/', function (req, res) {
  res.send('你好，世界');
});

var server = app.listen(3000, function () {
  var host = server.address().address;
  var port = server.address().port;
  console.log(`server is listening at port ${port}`)
});