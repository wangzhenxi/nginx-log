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
123.45.67.91 - - [11/Mar/2022:01:02:11 +0800] "GET /joshwong HTTP/1.1" 200 4972 0.285 0.285 "https://www.joshwong.cn/" "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/98.0.4758.109 Safari/537.36" "234.56.78.90"
`;


module.exports = () => {
    const logs = parser.parseLog(content);

    return logs;
}
