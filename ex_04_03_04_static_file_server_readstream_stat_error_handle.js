var http = require('http');
var parse = require('url').parse;
var join = require('path').join;
var fs = require('fs');

var root = __dirname;   // node.js에서 제공하는 매직변수. 파일의 root 디렉토리 경로를 가지고 있다.

var server = http.createServer(function (req, res) {
    var url = parse(req.url);
    var path = join(root, url.pathname);    // 절대 경로 만들기

    fs.stat(path, function (err, stat) {    // 파일의 존재 여부 확인
        if(err) {
            if('ENOENT' == err.code) {      // 파일이 존재하지 않음
                res.statusCode = 404;
                res.end('Not Found');
            } else {        // 그 외 다른 오류
                res.statusCode = 500;
                res.end('Internal Server Error');
            }
        } else {
            res.setHeader('Content-Length', stat.size);     // stat 객체를 이용해 Content-Length 설정
            var stream = fs.createReadStream(path);
            stream.pipe(res);
            stream.on('error', function (err) {
                res.statusCode = 500;
                res.end('Internal Server Error');
            });
        }
    });
}).listen(3000);


