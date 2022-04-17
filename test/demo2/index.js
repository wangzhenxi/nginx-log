/**
 * 通过读取字符串，解析日志
 */

const { NginxLog } = require('../../src/index.js');

const parser = new NginxLog({
    // 日志格式
    logFormat: `main  '$remote_addr - $remote_user [$time_local] '
    '"$request" $status $body_bytes_sent $request_time $upstream_response_time '
    '"$http_referer" "$http_user_agent" "$http_x_forwarded_for"';`,
});

const content = `
123.45.67.89 - - [11/Mar/2022:01:02:08 +0800] "GET /heartbeat HTTP/1.1" 200 39 0.004 0.004 "-" "healthcheck" "-"
123.45.67.91 - - [11/Mar/2022:01:02:11 +0800] "GET /joshwong HTTP/1.1" 200 4972 0.285 0.285 "https://www.joshwong.cn/" "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/98.0.4758.109 Safari/537.36" "234.56.78.90"
123.45.67.92 - - [11/Mar/2022:01:02:13 +0800] "GET / HTTP/1.1" 404 9 0.002 0.001 "-" "healthcheck" "-"
`;

module.exports = () => {
    const logs = parser.parseLog(content, {
        // 过滤器
        filter: (item) => {
            // 请求过滤
            if (/healthcheck/.test(item['$http_user_agent'])) return false;
            // 时间过滤
            const time = parser.parseTime(item['$time_local']);
            return time > 0;
        },
        formatter: (item) => {
            const requestTime = parser.parseTime(item['$time_local']);
            const responseTime = item['$upstream_response_time'];
            return {
                requestTime,
                responseTime
            };
        }
    });

    return logs;
}

