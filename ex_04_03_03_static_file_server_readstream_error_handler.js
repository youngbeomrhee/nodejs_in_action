var http = require('http');
var parse = require('url').parse;
var join = require('path').join;
var fs = require('fs');

var root = __dirname;   // node.js에서 제공하는 매직변수. 파일의 root 디렉토리 경로를 가지고 있다.

var server = http.createServer(function (req, res) {
    var url = parse(req.url);
    var path = join(root, url.pathname);    // 절대 경로 만들기
    console.log('path : ' + path);
    var stream = fs.createReadStream(path);     // fsReadStream 생성
    // pipe를 사용한 최적화
    stream.pipe(res);       // res.end()는 steam.pipe()에서 내부적으로 호출된다.
    stream.on('error', function (err) {
        res.statusCode = 500;
        res.end('Internal Server Error');
    });
}).listen(3000);


