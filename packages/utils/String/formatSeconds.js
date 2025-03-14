import dayjs from 'dayjs';
import duration from 'dayjs/plugin/duration';

// 扩展插件
dayjs.extend(duration);

/**
 * 将秒数格式化为时间字符串
 * @param {number} seconds 要格式化的秒数
 * @param {string} [format='HH:mm:ss'] 时间格式，默认为 'HH:mm:ss'
 * @returns {string} 格式化后的时间字符串
 */
export default function formatSeconds(seconds, format = 'HH:mm:ss') {
    const duration = dayjs.duration(seconds, 'seconds');
    return duration.format(format, { trim: false });
  }