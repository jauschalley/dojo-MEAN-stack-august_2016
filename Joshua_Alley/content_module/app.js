
var http = require('http');
var fs = require('fs');
var path = require('path');
var static_contents =require('./static');

server = http.createServer(function(request, response){
  static_contents(request, response);
});
server.listen(6789);
console.log("Running in localhost at port 6789");
