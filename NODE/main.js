var http = require("http");

http.createServer(function (request, response) {
   response.writeHead(200, {'Content-Type': 'text/plain'});
   response.end('Hello World, i am using node js\n');
}).listen(8080);

// Console will print the message
console.log('Server running at http://192.168.153.227:8080/');console.log("appended")