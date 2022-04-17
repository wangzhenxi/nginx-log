const fs = require('fs');
const path = require('path');

function readFile(source_path) {
    const files = fs.readdirSync(source_path);
    const ret = [];
    files.forEach(item => {
        const target = path.join(source_path, item);
        const stat = fs.statSync(target);
        if (stat.isDirectory()) {
            const arr = readFile(target);
            if (arr.length) {
                ret.push(...arr)
            }
        } else {
            if (/\.log/.test(item)) {
                ret.push(target)
            }
        }
    });
    return ret;
}

function readFileContent(file_path) {
    const content = fs.readFileSync(file_path, 'utf-8');

    return content;
}

module.exports = {
    readFile,
    readFileContent
};
