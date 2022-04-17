

// [
//     {
//       raw: '123.45.67.91 - - [11/Mar/2022:01:02:11 +0800] "GET /joshwong HTTP/1.1" 200 4972 0.285 0.285 "https://www.joshwong.cn/" "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/98.0.4758.109 Safari/537.36" "234.56.78.90"',
//       '$remote_addr': '123.45.67.91',
//       '$remote_user': '-',
//       '$time_local': '11/Mar/2022:01:02:11 +0800',
//       '$request': 'GET /joshwong HTTP/1.1',
//       '$status': '200',
//       '$body_bytes_sent': '4972',
//       '$request_time': '0.285',
//       '$upstream_response_time': '0.285',
//       '$http_referer': 'https://www.joshwong.cn/',
//       '$http_user_agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/98.0.4758.109 Safari/537.36',
//       '$http_x_forwarded_for': '234.56.78.90'
//     }
//   ]

test('nginx日志格式化', () => {
    const demo = require('./demo1');
    const res = demo();
    expect(res.length).toEqual(1);
    const [item] = res;
    expect(item).toEqual(
        expect.objectContaining({
            raw: expect.any(String),
            '$remote_addr': expect.any(String),
            '$remote_user': expect.any(String),
            '$time_local': expect.any(String),
            '$request': expect.any(String),
            '$status': expect.any(String),
            '$body_bytes_sent': expect.any(String),
            '$request_time': expect.any(String),
            '$upstream_response_time': expect.any(String),
            '$http_referer': expect.any(String),
            '$http_user_agent': expect.any(String),
            '$http_x_forwarded_for': expect.any(String),
        })
    );
});

test('nginx日志过滤、时间解析、格式转换', () => {
    const demo = require('./demo2');
    const res = demo();
    expect(res.length).toEqual(1);
    const [item] = res;
    expect(item).toEqual(
        expect.objectContaining({
            requestTime: expect.any(Number),
            responseTime: expect.any(String),
        })
    );
});

test('nginx日志目录读取', () => {
    const demo = require('./demo3');
    const res = demo();
    expect(res.length).toEqual(2);
    res.forEach(item => {
        expect(item).toEqual(
            expect.objectContaining({
                requestTime: expect.any(Number),
                responseTime: expect.any(String),
            })
        );
    })
});

