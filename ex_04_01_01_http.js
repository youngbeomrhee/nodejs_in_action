var http = require('http');

var server = http.createServer(function (req, res) {
    // handle request
    res.end('Hello World');
}).listen(3000);
