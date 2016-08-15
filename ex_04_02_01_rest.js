var http = require('http');

var server = http.createServer(function (req, res) {
    req.setEncoding('utf8');    // 데이터 묶음은 이제 Buffer 대신 utf8 문자열로 변경됨
    req.on('data', function (chunk) {   // 새로운 데이터 묶음을 읽을 때마다 data 이벤트가 발생
        console.log('parsed', chunk);   // 기본적으로 데이터 묶음은 Buffer객체(바이트 배열)
    });
    req.on('end', function () {    // 모든 데이터를 읽으면 end 이벤트가 발생
        console.log('done parsing');
        res.end();
    });
}).listen(3000);
