/**
 * 通过读取文件，解析日志
 */

const path = require('path');
const { NginxLog } = require('../../src/index.js');

const parser = new NginxLog({
    // 日志格式
    logFormat: `main  '$remote_addr - $remote_user [$time_local] '
    '"$request" $status $body_bytes_sent $request_time $upstream_response_time '
    '"$http_referer" "$http_user_agent" "$http_x_forwarded_for"';`,
});

module.exports = () => {
    let logs = [];
    parser.readFile(
        path.join(__dirname, './source'),
        (content) => {
            const _logs = parser.parseLog(content, {
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
            logs = logs.concat(_logs);
        }
    )

    return logs;
}
