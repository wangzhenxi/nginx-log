const { readFile, readFileContent } = require('./utils/read-file');
const parser = require('./parser');

class NginxLog {
    /**
     * @param {object} options
     * @param {function} options.logFormat 日志格式
     */
    constructor(options) {
        this.options = options
    }

    /**
     * 读取文件
     * @param {string} filepath 文件夹位置
     * @param {function} cb 每次读取执行的回调，入参为文件内容
     */
    readFile(filepath, cb) {
        const files = readFile(filepath);
        for(let i = 0; i < files.length; i ++) {
            const file_path = files[i];
            const content = readFileContent(file_path);
            cb(content);
        }
    }

    /**
     * 解析日志
     * @param {string} content
     * @param {object} options
     * @param {function} options.formatter 格式化
     * @return {array} result
     */
    parseLog(content, options = {}) {
        const {
            formatter,
            filter
        } = options;
        const {
            logFormat
        } = this.options;

        const result = parser.parseLog(content, {
            logFormat,
            formatter,
            filter
        });
        return result;
    }

    /**
     * 解析时间
     * @param {string} content
     */
    parseTime(content) {
        return parser.parseLocalTime(content);
    }
}

module.exports = {
    NginxLog,
};
