var http = require('http');
var port = 8080;

var server = http.createServer(function(req, res) {
  res.writeHead(200);
  var rightNow = getRightNow();
  var ip = req.headers['x-forwarded-for'] || req.connection.remoteAddress;
  res.end(rightNow + '\n' + ip);
});
server.listen(port);
console.log("server listening on " + port);

function getRightNow() {
  var currentDate = new Date();
  var day = currentDate.getDate();
  var month = currentDate.getMonth() + 1;
  var year = currentDate.getFullYear();
  var hour = currentDate.getHours();
  var minute = currentDate.getMinutes();
  return day + '/' + month + '/' + year + ' ' + hour + ':' + minute;
}
