var http = require('http');
var url = require('url');
var items = [];     // 데이터는 메모리에 일반 자바스크립트 배열로 처리됨

var server = http.createServer(function (req, res) {
    switch (req.method) {   // req.method는 요청받은 HTTP 메소드의 종류
        case 'POST':
            var item = '';  // 유입되는 항목에 대한 문자열 버퍼를 준비
            req.setEncoding('utf8');    // 유입되는 data 이벤트에 대해 UTF-8 문자열로 인코딩
            req.on('data', function (chunk) {   // 새로운 데이터 묶음을 읽을 때마다 data 이벤트가 발생
                item += chunk;
            });
            req.on('end', function () {    // 모든 데이터를 읽으면 end 이벤트가 발생
                items.push(item);
                res.end('OK\n');
            });
            break;
        case 'GET':
            items.forEach(function (item, i) {
                res.write(i + ' : ' + item + '\n');
            });
            res.end();
            break;
    }
}).listen(3000);
