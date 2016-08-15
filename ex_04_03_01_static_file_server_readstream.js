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
    stream.on(function (chunk) {       // 응답에 파일데이터를 작성
        res.write(chunk);
    });
    stream.on('end', function () {
        res.end();      // 파일이 완료되면 응답을 종료
    });
}).listen(3000);


