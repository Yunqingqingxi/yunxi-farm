import { ElMessage, ElMessageBox } from 'element-plus';

/**
 * 成功消息提示
 * @param {string} msg 消息内容
 * @param {number} duration 显示时间(毫秒)
 */
export function success(msg, duration = 2000) {
  ElMessage({
    message: msg,
    type: 'success',
    duration,
  });
}

/**
 * 错误消息提示
 * @param {string} msg 消息内容
 * @param {number} duration 显示时间(毫秒)
 */
export function error(msg, duration = 2000) {
  ElMessage({
    message: msg,
    type: 'error',
    duration,
  });
}

/**
 * 警告消息提示
 * @param {string} msg 消息内容
 * @param {number} duration 显示时间(毫秒)
 */
export function warning(msg, duration = 2000) {
  ElMessage({
    message: msg,
    type: 'warning',
    duration,
  });
}

/**
 * 确认对话框
 * @param {string} title 标题
 * @param {string} content 内容
 * @param {object} options 配置选项
 * @returns {Promise}
 */
export function confirm(title, content, options = {}) {
  return ElMessageBox.confirm(content, title, {
    confirmButtonText: '确定',
    cancelButtonText: '取消',
    type: 'warning',
    ...options,
  });
}

export default {
  success,
  error,
  warning,
  confirm,
};
