var http = require('http');
var send = require('send');
var url = require('url');

var app = http.createServer(function(req, res){
  send(req, url.parse(req.url).pathname)
  .root(__dirname)
  .pipe(res);
});
app.listen(8337, '127.0.0.1');
console.log('Listening on http://127.0.0.1:8337/');