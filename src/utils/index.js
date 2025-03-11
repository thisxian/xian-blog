

/**
 * // 获取天数差
 * @param { string | date } date "时间格式为:2000-01-01/new Date()"
 * @returns { number } 距今天数差
 */
export function getDaysDifference(input) {
    if (!(typeof input === 'string' || input instanceof Date)) throw new Error('Invalid input: must be a date string or Date object');

    let date = new Date(input);
    // 将日期截断到当天的午夜（00:00:00）
    const inputStartOfDay = new Date(date);
    inputStartOfDay.setHours(0, 0, 0, 0);
    const now = new Date();
    const nowStartOfDay = new Date(now);
    nowStartOfDay.setHours(0, 0, 0, 0);
    // 计算时间差（毫秒）
    const diffMilliseconds = nowStartOfDay - inputStartOfDay;
    // 转换为天数并四舍五入
    const days = Math.round(diffMilliseconds / (1000 * 60 * 60 * 24));
    return days;
}

