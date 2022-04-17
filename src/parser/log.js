function getRxp(format) {
    // 移除换行 并 匹配日志规则
    const matched = format.replace(/\s*\n\s*/g, '').match(/^([^']+\s+)(.+);$/)
    const ruleText = matched[2];
    // 移除日志规则多余的单引号
    const rules = ruleText.match(/'([^'])+'/g).map(item => item.replace(/^'/, '').replace(/'$/, ''));
    const rule = rules.join('');

    // 匹配字段
    const attrs = rule.match(/\$\w+/g);
    // 根据字段和日志规则 转为正则表达式
    const rxpText = rule.replace(/\$\w+/g, '\(\.+\)').replace(/\[/, '\\[').replace(/\]/, '\\]');
    const rxp = new RegExp(rxpText);

    return { rxp, attrs };
}

function parseLog(content, {logFormat, formatter, filter}) {
    // 去空
    const logs = content.split(/\n/).filter(row => !!row);
    const { rxp, attrs } = getRxp(logFormat);
    const rows = [];
    logs.forEach((row, index) => {
        if (!row) {
            return
        }
        try {
            const formatted = rxp.exec(row).slice(1);
            const rowObj = {
                raw: row
            };
            attrs.forEach((attr, index) => {
                const value = formatted[index];
                rowObj[attr] = value;
            });

            // 过滤
            if (filter) {
                const flag = filter(rowObj)
                if (!flag) return;
            }

            // 格式化
            if (formatter) {
                rows.push(formatter(rowObj))
            } else {
                rows.push(rowObj)
            }
        } catch (error) {
            console.log('error:');
            console.log(row, index)
            throw error;
        }
    })

    return rows;
}

module.exports = {
    parseLog
}
