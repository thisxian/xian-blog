const xian = {
    debounce, // 防抖函数
    throttle, // 节流函数
    copyText, // 复制文本
}
export default xian;

/**
 * 防抖函数
 * @param { Function } fn 目标函数
 * @param { number } delay 延迟时间（毫秒）
 * @returns { Function } 包装后的防抖函数
 */
export function debounce(fn, delay = 300) {
    let timer = null;
    return function (...args) {
        if (timer) clearTimeout(timer); // 清除旧定时器
        timer = setTimeout(() => {
            fn.apply(this, args); // 确保this指向正确
            timer = null;
        }, delay);
    };
}


/**
* 节流函数
* @param { Function } fn 目标函数
* @param { number } interval 时间间隔（毫秒）
* @returns { Function } 包装后的节流函数
*/
export function throttle(fn, interval = 1000) {
    let lastTime = 0;
    return function (...args) {
        const now = Date.now();
        if (now - lastTime >= interval) {
            fn.apply(this, args); // 确保this指向正确
            lastTime = now;
        }
    };
}


/**
* 复制函数
* @param { string } text 复制文本
* @returns { undefined }
*/
export async function copyText(text) {
    try {
        // 尝试现代API
        await navigator.clipboard.writeText(text);
        return true;
    } catch (err) {
        // 回退到execCommand
        const textarea = document.createElement('textarea');
        textarea.value = text;
        textarea.style.position = 'fixed';
        textarea.style.opacity = '0';
        document.body.appendChild(textarea);
        textarea.select();
        try {
            const successful = document.execCommand('copy');
            document.body.removeChild(textarea);
            return successful;
        } catch (err) {
            document.body.removeChild(textarea);
            return false;
        }
    }
}