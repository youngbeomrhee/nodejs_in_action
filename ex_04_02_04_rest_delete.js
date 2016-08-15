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
            var body = items.map(function (item, i) {
                return i + ' : ' + item;
            }).join('\n');
            res.setHeader('Content-Length', Buffer.byteLength(body));
            res.setHeader('Content-Type', 'text/plain; charset="utf8"');
            res.end(body);
            break;
        case 'DELETE':
            var path = url.parse(req.url).pathname;
            var i = parseInt(path.slice(1), 10);

            if(isNaN(i)) {
                res.statusCode = 400;
                res.end('Invalid item id');
            } else if(!items[i]) {   // 요청한 인덱스가 배열에 존재하는지 확인
                res.statsCode = 404;
                res.end('Item not found');
            } else {
                var deleteItems = items.splice(i, 1);
                res.end('delete ' + deleteItems + ' : OK\n');
            }
            break;
        case 'PUT':
            var path = url.parse(req.url).pathname;
            var i = parseInt(path.slice(1), 10);

            if(isNaN(i)) {
                res.statusCode = 400;
                res.end('Invalid item id');
            } else if(!items[i]) {   // 요청한 인덱스가 배열에 존재하는지 확인
                res.statsCode = 404;
                res.end('Item not found');
            } else {
                var item = '';  // 유입되는 항목에 대한 문자열 버퍼를 준비
                req.setEncoding('utf8');    // 유입되는 data 이벤트에 대해 UTF-8 문자열로 인코딩
                req.on('data', function (chunk) {   // 새로운 데이터 묶음을 읽을 때마다 data 이벤트가 발생
                    item += chunk;
                });
                req.on('end', function () {    // 모든 데이터를 읽으면 end 이벤트가 발생
                    items[i] = item;
                    res.end(i + '번 인자 - ' + item + '으로 변경 : OK\n');
                });
            }
            break;
    }
}).listen(3000);
