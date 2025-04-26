/**
 * 字符串工具类
 */
export default {
  /**
   * 截取字符串
   * @param {string} str - 原始字符串
   * @param {number} length - 截取长度
   * @param {string} [suffix='...'] - 后缀
   * @returns {string} 截取后的字符串
   */
  truncate(str, length, suffix = '...') {
    if (typeof str !== 'string') return ''
    if (str.length <= length) return str
    return str.substring(0, length) + suffix
  },

  /**
   * 格式化字符串 (类似Python的format)
   * @param {string} str - 包含占位符的字符串
   * @param {...any} args - 替换参数
   * @returns {string} 格式化后的字符串
   */
  format(str, ...args) {
    return str.replace(/{(\d+)}/g, (match, number) => 
      typeof args[number] !== 'undefined' ? args[number] : match
    )
  },

  /**
   * 检查字符串是否为空
   * @param {string} str - 待检查字符串
   * @returns {boolean} 是否为空
   */
  isEmpty(str) {
    return !str || str.trim().length === 0
  },

  /**
   * 检查字符串是否为邮箱格式
   * @param {string} str - 待检查字符串
   * @returns {boolean} 是否为邮箱
   */
  isEmail(str) {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    return regex.test(str)
  },

  /**
   * 检查字符串是否为手机号格式(中国)
   * @param {string} str - 待检查字符串
   * @returns {boolean} 是否为手机号
   */
  isPhone(str) {
    const regex = /^1[3-9]\d{9}$/
    return regex.test(str)
  },

  /**
   * 生成随机字符串
   * @param {number} length - 字符串长度
   * @returns {string} 随机字符串
   */
  random(length = 16) {
    const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789'
    let result = ''
    for (let i = 0; i < length; i++) {
      result += chars.charAt(Math.floor(Math.random() * chars.length))
    }
    return result
  },

  /**
   * 首字母大写
   * @param {string} str - 原始字符串
   * @returns {string} 转换后的字符串
   */
  capitalize(str) {
    if (this.isEmpty(str)) return str
    return str.charAt(0).toUpperCase() + str.slice(1)
  },

  /**
   * 转换为驼峰命名
   * @param {string} str - 原始字符串
   * @returns {string} 驼峰命名字符串
   */
  camelCase(str) {
    return str.replace(/[-_\s]+(.)?/g, (match, char) => 
      char ? char.toUpperCase() : ''
    )
  }
}
