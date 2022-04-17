
const dayjs = require('dayjs');

/**
 * 解析nginx的time_local为时间戳
 */
function parseLocalTime(time_local) {
    const [
        day,
        month,
        year,
        hour,
        minute,
        second,
        offsetHour
    ] = time_local.match(/^(\d+)\/(\w+)\/(\d+)\:(\d+)\:(\d+)\:(\d+) \+(\d){2}\d{2}$/).slice(1);

    const timeText = `${year}-${month}-${day} ${hour}:${minute}:${second}`;
    const timeObj = dayjs(timeText);
    timeObj.add(offsetHour, 'hour');
    return timeObj.unix();
}

module.exports = {
    parseLocalTime
};