var http = require('http');
var options = {
   host: '192.168.1.100',
   port: '8081',
   path: '/sample.htm'  
};

var callback = function(response) {
   var body = '';
   response.on('data', function(data) {
      body += data;
   });
   
   response.on('end', function() {
      console.log(body);
   });
}
var req = http.request(options, callback);
req.end();
