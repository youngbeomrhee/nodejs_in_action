var http = require('http');

var server = http.createServer(function (req, res) {
    // handle request
    var body = 'Hello World';
    res.setHeader('Content-Length', body.length);
    res.setHeader('Content-Type', 'text/plain');
    res.end(body);
}).listen(3000);
