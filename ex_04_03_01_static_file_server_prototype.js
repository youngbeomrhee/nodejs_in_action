var http = require('http');
var parse = require('url').parse;
var join = require('path').join;
var fs = require('fs');

var root = __dirname;   // node.js에서 제공하는 매직변수. 파일의 root 디렉토리 경로를 가지고 있다.

var server = http.createServer(function (req, res) {
    var url = parse(req.url);
    var path = join(root, url.pathname);
    console.log('path : ' + path);
}).listen(3000);


